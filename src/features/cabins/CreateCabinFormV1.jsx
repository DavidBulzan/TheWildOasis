// import styled from "styled-components";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm } from "react-hook-form";
// import { createCabin } from "../../services/apiCabins";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// function CreateCabinForm() {
//   const queryClient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   console.log(errors);

//   const { mutate, isLoading } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New cabin succesfully created!");
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   function onSubmit(data) {
//     mutate({ ...data, image: data.image[0] });
//   }

//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input
//           type="text"
//           id="name"
//           disabled={isLoading}
//           {...register("name", { required: "This field is required" })}
//         />
//         {errors?.name?.message && <Error>{errors.name.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isLoading}
//           {...register("maxCapacity", { required: "This field is required" })}
//         />
//         {errors?.maxCapacity?.message && (
//           <Error>{errors.maxCapacity.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isLoading}
//           {...register("regularPrice", { required: "This field is required" })}
//         />
//         {errors?.regularPrice?.message && (
//           <Error>{errors.regularPrice.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isLoading}
//           defaultValue={0}
//           {...register("discount", {
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//         {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           id="description"
//           defaultValue=""
//           disabled={isLoading}
//           {...register("description", { required: "This field is required" })}
//         />
//         {errors?.description?.message && (
//           <Error>{errors.description.message}</Error>
//         )}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This field id required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isLoading}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
