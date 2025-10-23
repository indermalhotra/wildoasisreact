import styled from "styled-components";
import React, { use } from "react";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({cabinToEdit = {}}) {
  console.log(cabinToEdit,"cabin to edit");

  const {id:editId, ...editValue} = cabinToEdit;
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValue,
  });

  const { errors } = formState;

  console.log(errors);

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin created successfully");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate:editCabin, isLoading: isEditing } = useMutation({

    // mutation fn always accept one argument if there is multiple arguments then we can pass object
    mutationFn: ({newCabin, id}) => createEditCabin(newCabin,id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin edited successfully");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  let isWorking = isCreating || isEditing;

  // temprary functio to auto fill data
  function autoFillForm() {
    const demoData = {
      name: "New Cabin",
      maxCapacity: "4",
      regularPrice: "5000",
      discount: "50",
      description: "asdf",
      image: {},
    };
    reset(demoData);
  }

  function onSubmit(data) {
    
    if(editId) editCabin(data, data.id);

    else createCabin(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>

        <Input
          type="text"
          id="name"
          {...register("name", { required: "Name can not be blank" })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>

        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            min: { value: 1, message: "Minimum capacity is 1 person" },
            max: { value: 5, message: "Maximum capacity is 5 persons" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Price can not be empty",
            min: {
              value: 100,
              message: "Price can not be less then 100",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>

        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount cannot be more than regular price",
          })}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image", {
          required: editId ? false : "Image is required",
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {!editId && <Button variation="secondary" type="reset">Cancel</Button>}
        <Button>{editId ? "Edit Cabin" : "Create Cabin"}</Button>
        {!editId && <Button onClick={()=>autoFillForm()}>Auto fill</Button>}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
