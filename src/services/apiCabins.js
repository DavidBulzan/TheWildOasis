import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

async function getCabins({ page }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });

  //PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return { data, count };
}

export default getCabins;

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create cabin
  let query = supabase.from("cabins");

  //A) Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) Edit cabin
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select();
  if (error) {
    throw new Error("Cabins could not be created");
  }

  //2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete a cabin if error uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

// export async function upadteCabin(){
//   const { data, error } = await supabase
//   .from('cabins')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()
// }
