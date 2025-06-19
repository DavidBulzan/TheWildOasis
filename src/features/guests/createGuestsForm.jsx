import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import PropTypes from "prop-types";
import Select from "react-select";
import { customSelectStyles } from "../../styles/customSelectStyles";
import { Controller } from "react-hook-form";

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

const ErrorMessage = styled.span`
  color: var(--color-red-700);
  font-size: 1.4rem;
`;

function CreateGuestsForm({ onCreate, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const nationality = watch("nationality");

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      setApiError(null);

      const endpoint = [
        "https://restcountries.com/v3.1/all?fields=name,cca2,flags",
      ];

      try {
        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        let countryList;

        countryList = data
          .map((c) => ({
            code: c.cca2,
            name: c.name?.common || c.name,
            flag: c.flags?.png || c.flags?.svg,
          }))
          .filter((c) => c.code && c.name)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryList);
        setLoading(false);
        console.log(`Successfully loaded ${countryList.length} countries`);
        return;
      } catch (error) {
        console.error(`Failed to fetch from ${endpoint}:`, error);
      }
      setLoading(false);
    }
    fetchCountries();
  }, []);

  if (loading) return <Spinner />;

  const onSubmit = (data) => {
    const country = countries.find((c) => c.code === data.nationality);
    const guest = {
      ...data,
      countryFlag: country?.flag || "",
      countryName: country?.name || "",
    };
    onCreate(guest);
    reset();
    onClose();
  };

  const nationalityOptions = countries.map((c) => ({
    value: c.code,
    label: c.name,
    flag: c.flag,
  }));

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      {apiError && (
        <FormRow>
          <ErrorMessage>{apiError}</ErrorMessage>
        </FormRow>
      )}

      <FormRow>
        <Label>Full Name</Label>
        <Input
          {...register("fullName", { required: "Full Name Is Required" })}
          type="text"
        />
        {errors.fullName && (
          <ErrorMessage>{errors.fullName.message}</ErrorMessage>
        )}
      </FormRow>

      <FormRow>
        <Label>Email</Label>
        <Input
          {...register("email", { required: "Email is required" })}
          type="email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormRow>
      <FormRow>
        <Label>Age</Label>
        <Input
          {...register("age", { required: "Age is required" })}
          type="number"
        />
        {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>National ID</Label>
        <Input
          {...register("nationalID", { required: "National ID is required" })}
        />
        {errors.nationalID && (
          <ErrorMessage>{errors.nationalID.message}</ErrorMessage>
        )}
      </FormRow>

      <FormRow>
        <Label>Nationality</Label>
        <Controller
          name="nationality"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={nationalityOptions}
              placeholder="Select Country"
              styles={customSelectStyles}
              value={
                nationalityOptions.find((opt) => opt.value === field.value) ||
                null
              }
              onChange={(option) => field.onChange(option?.value || "")}
            />
          )}
        />
        {nationality && countries.length > 0 && (
          <img
            src={countries.find((c) => c.code === nationality)?.flag}
            alt="country flag"
            style={{
              marginLeft: "5rem",
              verticalAlign: "middle",
              height: "18px",
            }}
          />
        )}
        {errors.nationality && (
          <ErrorMessage>{errors.nationality.message}</ErrorMessage>
        )}
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={countries.length === 0}>
          Create Guest
        </Button>
        <Button type="button" variation="secondary" onClick={onClose}>
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

CreateGuestsForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateGuestsForm;
