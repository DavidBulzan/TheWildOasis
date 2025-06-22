import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Select from "react-select";
import Spinner from "../../ui/Spinner";
import AddGuest from "../guests/AddGuests";
import { getBookedDatesForCabin } from "../../utils/helpers";
import { customSelectStyles } from "../../styles/customSelectStyles";
import { FormContent } from "../../ui/FormContent";
import { useForm, Controller } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useAllBookings } from "./useAllBookins";
import { useSettings } from "../settings/useSettings";
import { useState, useEffect } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const DateFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  input {
    width: 19.5rem;
  }
`;

const GuestRow = styled.div`
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

  > button,
  > div > button {
    grid-column: 3;
    justify-self: center;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

//Select Guests
function GuestSelector({ guests, onSelect, selectedGuest }) {
  const options = guests.map((guest) => ({
    value: guest.id,
    label: `${guest.fullName} (${guest.email})`,
  }));

  const selectedOption =
    options.find((opt) => opt.value === selectedGuest?.id) || null;

  return (
    <>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) =>
          onSelect(guests.find((g) => g.id === selected.value))
        }
        placeholder="Search guest"
        isClearable
        styles={customSelectStyles}
      />
    </>
  );
}

//Select Cabins
function CabinSelector({ cabins, onSelect, selectedCabin }) {
  const options = cabins.map((cabin) => ({
    value: cabin.id,
    label: `${cabin.name} (${cabin.regularPrice}€)`,
  }));

  const selectedOption =
    options.find((opt) => opt.value === selectedCabin?.id) || null;

  return (
    <Select
      options={options}
      placeholder="Search cabin"
      value={selectedOption}
      onChange={(selected) =>
        onSelect(cabins.find((c) => c.id === selected.value))
      }
      isClearable
      styles={customSelectStyles}
    />
  );
}

//Booking Form
function CreateBookingForm() {
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const { register, handleSubmit, formState, control, reset, watch, setValue } =
    useForm();
  const { createBooking, isCreating } = useCreateBooking();
  const { guests, isLoading } = useGuests();
  const { cabins } = useCabins();
  const { errors } = formState;
  const { settings } = useSettings();
  const { allBookings = [] } = useAllBookings();

  //Get all booked dates for the selected cabin
  const bookedDates = selectedCabin
    ? getBookedDatesForCabin(allBookings, selectedCabin?.id)
    : [];

  console.log(allBookings);
  console.log("bookedDates", bookedDates);

  //num nights calculation
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (startDate && endDate) {
      const nights = differenceInCalendarDays(
        parseISO(endDate),
        parseISO(startDate)
      );
      if (!isNaN(nights) && nights >= 0) {
        setValue("numNights", nights);
      } else {
        setValue("numNights", 1);
      }
    }
  }, [startDate, endDate, setValue]);

  if (isLoading) return <Spinner />;
  if (!guests || !cabins) return <p>No guests or cabins available</p>;

  const onGuestSelect = (guest) => setSelectedGuest(guest);
  const onCabinSelect = (cabin) => setSelectedCabin(cabin);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      guestId: selectedGuest?.id,
      cabinId: selectedCabin?.id,
      cabinPrice,
      extrasPrice,
      numGuests,
      numNights,
      totalPrice,
    };
    createBooking(payload);
  };

  const statusOptions = [
    { value: "unconfirmed", label: "Unconfirmed" },
    { value: "checked-in", label: "Checked-in" },
  ];

  //total price calculation
  const numNights = Number(watch("numNights")) || 0;
  const numGuests = Number(watch("numGuests")) || 0;
  const extrasPrice = Number(watch("extrasPrice")) || 0;
  const hasBreakfast = !!watch("hasBreakfast");
  const cabinPrice = Number(selectedCabin?.regularPrice) || 0;

  let totalPrice = numNights * cabinPrice + extrasPrice;
  const breakfastPrice =
    (settings?.breakfastPrice || 0) * numNights * numGuests;
  if (hasBreakfast) totalPrice = totalPrice + breakfastPrice;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="booking-modal">
      <FormContent>
        <FormRow>
          <Label>Cabin</Label>
          <CabinSelector
            cabins={cabins}
            onSelect={onCabinSelect}
            selectedCabin={selectedCabin}
          />
          {console.log("selectedCabin", selectedCabin)}
        </FormRow>

        <GuestRow>
          <Label>Guest</Label>
          <GuestSelector
            guests={guests}
            onSelect={onGuestSelect}
            selectedGuest={selectedGuest}
          />
          <AddGuest />
        </GuestRow>
        <DateFormRow>
          <Label>Start Date</Label>
          <Controller
            control={control}
            name="startDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date?.toISOString().slice(0, 10))
                }
                excludeDates={bookedDates}
                dateFormat={"yyyy-MM-dd"}
                placeholderText="Select start date"
                disabled={isCreating}
                customInput={<Input />}
                withPortal
              />
            )}
          />
          {errors.startDate && <Error>{errors.startDate.message}</Error>}
        </DateFormRow>
        <DateFormRow>
          <Label>End Date</Label>
          <Controller
            control={control}
            name="endDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date?.toISOString().slice(0, 10))
                }
                excludeDates={bookedDates}
                dateFormat={"yyyy-MM-dd"}
                placeholderText="Select end date"
                disabled={isCreating}
                minDate={
                  watch("startDate") ? new Date(watch("startDate")) : null
                }
                customInput={<Input />}
                withPortal
              />
            )}
          />
          {errors.endDate && <Error>{errors.endDate.message}</Error>}{" "}
        </DateFormRow>
        <FormRow>
          <Label>Nights</Label>
          <Input
            value={numNights}
            type="number"
            id="numNights"
            disabled
            readOnly
          />
          {errors.numNights && <Error>{errors.numNights.message}</Error>}{" "}
        </FormRow>
        <FormRow>
          <Label>Num Guests</Label>
          <Input
            {...register("numGuests", { required: true })}
            type="number"
            id="numGuests"
            disabled={isCreating}
          />
          {errors.numGuests && <Error>{errors.numGuests.message}</Error>}{" "}
        </FormRow>
        <FormRow>
          <Label>Cabin Price / Night (€)</Label>
          <Input
            value={selectedCabin?.regularPrice || ""}
            type="number"
            id="cabinPrice"
            disabled
            readOnly
          />
          {errors.cabinPrice && <Error>{errors.cabinPrice.message}</Error>}{" "}
        </FormRow>
        <FormRow>
          <Label>Extras Price (€)</Label>
          <Input
            {...register("extrasPrice", { required: true })}
            type="number"
            id="extrasPrice"
            disabled={isCreating}
          />
          {errors.extrasPrice && <Error>{errors.extrasPrice.message}</Error>}{" "}
        </FormRow>
        <FormRow>
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={statusOptions}
                isDisabled={isCreating}
                placeholder="Select status"
                value={
                  statusOptions.find((opt) => opt.value === field.value) || null
                }
                onChange={(option) => field.onChange(option.value)}
                styles={customSelectStyles}
              />
            )}
          />
          {errors.status && <Error>{errors.status.message}</Error>}
        </FormRow>
        <FormRow>
          <Label>
            Include Breakfast{" "}
            {`(${formatCurrency(
              settings?.breakfastPrice || 0
            )} / day / guest = ${formatCurrency(breakfastPrice || 0)} total)`}
          </Label>
          <input
            type="checkbox"
            id="hasBreakfast"
            {...register("hasBreakfast")}
            disabled={isCreating}
          />
          {errors.hasBreakfast && <Error>{errors.hasBreakfast.message}</Error>}{" "}
        </FormRow>
        <FormRow>
          <Label>Is Paid</Label>
          <input
            type="checkbox"
            id="isPaid"
            {...register("isPaid")}
            disabled={isCreating}
          />
          {errors.isPaid && <Error>{errors.isPaid.message}</Error>}{" "}
        </FormRow>
        <FormRow>
          <Label>Total Price</Label>
          <Input
            value={totalPrice}
            id="totalPrice"
            type="number"
            readOnly
            disabled
          />
        </FormRow>
        <FormRow>
          <Label>Observations</Label>
          <Input
            {...register("observations")}
            type="text"
            id="observations"
            disabled={isCreating}
          />
          {errors.observations && <Error>{errors.observations.message}</Error>}{" "}
        </FormRow>
      </FormContent>
      <FormRow>
        <Button type="submit" disabled={isCreating}>
          Create Booking
        </Button>
        <Button
          type="button"
          variation="secondary"
          onClick={() => reset()}
          disabled={isCreating}
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

GuestSelector.propTypes = {
  guests: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedGuest: PropTypes.object,
};

CabinSelector.propTypes = {
  cabins: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCabin: PropTypes.object,
};

export default CreateBookingForm;
