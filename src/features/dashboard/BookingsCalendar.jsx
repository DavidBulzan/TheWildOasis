import { useState, useMemo } from "react";
import styled from "styled-components";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Home,
  Clock,
  DollarSign,
} from "lucide-react";
import PropTypes from "prop-types";
import Spinner from "../../ui/Spinner";

// Styled Components
const CalendarContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CalendarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const MonthTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  min-width: 200px;
  text-align: center;
  margin: 0;
`;

const DayNamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const DayNameCell = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;
  color: #4b5563;
  background-color: #f9fafb;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayCell = styled.div`
  min-height: 100px;
  padding: 0.25rem;
  border: 1px solid #e5e7eb;
  background-color: ${(props) => (props.isCurrentMonth ? "white" : "#f9fafb")};
  ${(props) =>
    props.isToday &&
    `
    box-shadow: 0 0 0 2px #3b82f6;
  `}
`;

const DayNumber = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${(props) => (props.isCurrentMonth ? "#111827" : "#9ca3af")};
`;

const BookingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const BookingItem = styled.div`
  background-color: ${(props) => props.statusColor};
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const BookingCabinName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`;

const BookingGuests = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const MoreBookings = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
`;

const Legend = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendColor = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${(props) => props.color};
  border-radius: 0.125rem;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 28rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  color: #6b7280;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: #374151;
  }
`;

const ModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailTitle = styled.div`
  font-weight: 600;
`;

const DetailSubtitle = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: white;
  background-color: ${(props) => props.statusColor};
`;

const BreakfastBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #dbeafe;
  color: #1e40af;
  border-radius: 0.25rem;
  font-size: 0.75rem;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const NotesSection = styled.div`
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.25rem;
`;

const CabinSection = styled.div`
  background-color: #eff6ff;
  padding: 0.75rem;
  border-radius: 0.25rem;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const CabinSectionTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #1d4ed8;
  margin-bottom: 0.25rem;
`;

const SectionContent = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

const CabinSectionContent = styled.div`
  font-size: 0.875rem;
  color: #2563eb;
`;

const LoadingContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;
`;

const LoadingText = styled.div`
  color: #6b7280;
`;

const BookingCalendar = ({ bookings, cabins }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Create a cabin lookup map
  const cabinMap = useMemo(() => {
    if (!cabins) return {};
    return cabins.reduce((acc, cabin) => {
      acc[cabin.id] = cabin;
      return acc;
    }, {});
  }, [cabins]);

  // Process bookings for calendar display
  const processedBookings = useMemo(() => {
    if (!bookings) return [];
    return bookings.map((booking) => ({
      ...booking,
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      cabin: cabinMap[booking.cabinId],
    }));
  }, [bookings, cabinMap]);

  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    return processedBookings.filter((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // Calendar navigation
  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in":
        return "#10b981";
      case "checked-out":
        return "#6b7280";
      case "unconfirmed":
        return "#f59e0b";
      default:
        return "#3b82f6";
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (!bookings || !cabins) {
    return (
      <LoadingContainer>
        <LoadingContent>
          <LoadingText>Loading calendar...</LoadingText>
          <Spinner />
        </LoadingContent>
      </LoadingContainer>
    );
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          <Calendar size={24} />
          Hotel Booking Calendar
        </CalendarTitle>
        <NavigationContainer>
          <NavButton onClick={() => navigateMonth(-1)}>
            <ChevronLeft size={20} />
          </NavButton>
          <MonthTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </MonthTitle>
          <NavButton onClick={() => navigateMonth(1)}>
            <ChevronRight size={20} />
          </NavButton>
        </NavigationContainer>
      </CalendarHeader>

      <DayNamesGrid>
        {dayNames.map((day) => (
          <DayNameCell key={day}>{day}</DayNameCell>
        ))}
      </DayNamesGrid>

      <CalendarGrid>
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          const dayBookings = getBookingsForDate(new Date(day));

          return (
            <DayCell
              key={index}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
            >
              <DayNumber isCurrentMonth={isCurrentMonth}>
                {day.getDate()}
              </DayNumber>

              <BookingsContainer>
                {dayBookings.slice(0, 3).map((booking) => (
                  <BookingItem
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    statusColor={getStatusColor(booking.status)}
                    title={`${booking.cabin?.name || "Unknown Cabin"} - ${
                      booking.numGuests
                    } guests`}
                  >
                    <BookingCabinName>
                      {booking.cabin?.name || "N/A"}
                    </BookingCabinName>
                    <BookingGuests>
                      <Users size={12} />
                      <span>{booking.numGuests}</span>
                    </BookingGuests>
                  </BookingItem>
                ))}
                {dayBookings.length > 3 && (
                  <MoreBookings>+{dayBookings.length - 3} more</MoreBookings>
                )}
              </BookingsContainer>
            </DayCell>
          );
        })}
      </CalendarGrid>

      {/* Legend */}
      <Legend>
        <LegendItem>
          <LegendColor color="#10b981" />
          <span>Checked In</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#6b7280" />
          <span>Checked Out</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#f59e0b" />
          <span>Unconfirmed</span>
        </LegendItem>
      </Legend>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Booking Details</ModalTitle>
              <ModalCloseButton onClick={() => setSelectedBooking(null)}>
                ×
              </ModalCloseButton>
            </ModalHeader>

            <ModalDetails>
              <DetailRow>
                <Home size={20} color="#2563eb" />
                <DetailContent>
                  <DetailTitle>
                    Cabin {selectedBooking.cabin?.name || "N/A"}
                  </DetailTitle>
                  <DetailSubtitle>
                    Max Capacity: {selectedBooking.cabin?.maxCapacity || "N/A"}{" "}
                    guests
                  </DetailSubtitle>
                </DetailContent>
              </DetailRow>

              <DetailRow>
                <Users size={20} color="#16a34a" />
                <DetailContent>
                  <DetailTitle>{selectedBooking.numGuests} Guests</DetailTitle>
                  <DetailSubtitle>
                    Guest ID: {selectedBooking.guestId}
                  </DetailSubtitle>
                </DetailContent>
              </DetailRow>

              <DetailRow>
                <Calendar size={20} color="#9333ea" />
                <DetailContent>
                  <DetailTitle>
                    {formatDate(selectedBooking.startDate)} -{" "}
                    {formatDate(selectedBooking.endDate)}
                  </DetailTitle>
                  <DetailSubtitle>
                    {selectedBooking.numNights} nights
                  </DetailSubtitle>
                </DetailContent>
              </DetailRow>

              <DetailRow>
                <DollarSign size={20} color="#16a34a" />
                <DetailContent>
                  <DetailTitle>${selectedBooking.totalPrice}</DetailTitle>
                  <DetailSubtitle>
                    Cabin: ${selectedBooking.cabinPrice} | Extras: $
                    {selectedBooking.extrasPrice}
                  </DetailSubtitle>
                </DetailContent>
              </DetailRow>

              <DetailRow>
                <Clock size={20} color="#ea580c" />
                <DetailContent>
                  <DetailTitle style={{ textTransform: "capitalize" }}>
                    {selectedBooking.status}
                  </DetailTitle>
                  <StatusContainer>
                    <StatusBadge
                      statusColor={getStatusColor(selectedBooking.status)}
                    >
                      {selectedBooking.isPaid ? "Paid" : "Unpaid"}
                    </StatusBadge>
                    {selectedBooking.hasBreakfast && (
                      <BreakfastBadge>Breakfast Included</BreakfastBadge>
                    )}
                  </StatusContainer>
                </DetailContent>
              </DetailRow>

              {selectedBooking.observations && (
                <NotesSection>
                  <SectionTitle>Notes:</SectionTitle>
                  <SectionContent>
                    {selectedBooking.observations}
                  </SectionContent>
                </NotesSection>
              )}

              {selectedBooking.cabin?.description && (
                <CabinSection>
                  <CabinSectionTitle>Cabin Description:</CabinSectionTitle>
                  <CabinSectionContent>
                    {selectedBooking.cabin.description}
                  </CabinSectionContent>
                </CabinSection>
              )}
            </ModalDetails>
          </ModalContent>
        </Modal>
      )}
    </CalendarContainer>
  );
};

BookingCalendar.propTypes = {
  bookings: PropTypes.array,
  cabins: PropTypes.array,
};

export default BookingCalendar;
