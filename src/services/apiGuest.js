import supabase from "./supabase";

export async function getGuests() {
  const { data: guests, error } = await supabase.from("guest").select();

  console.log("Guests data:", guests);

  if (error) {
    console.error(error);
    throw new Error("Guests could not get loaded");
  }
  return guests;
}

export async function createGuest(guest) {
  const { data, error } = await supabase.from("guest").insert([guest]).select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  return data;
}
