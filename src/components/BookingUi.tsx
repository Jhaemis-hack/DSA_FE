import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

import { Error, Success } from "../utils/toastify";


import { BookASession, fetchAvailableDate } from "../services/menteeService";

// Utility to format selected date to "Wednesday 16 July, 2025"
const formatFullDate = (date: Date): string => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const weekday = dayNames[date.getDay()];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${weekday} ${day} ${month}, ${year}`;
};

const BookingUI = ({ mentorId, close }: { mentorId: string, close: ()=> void }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mentorWeekdays, setMentorWeekdays] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [time, setTime] = useState({
    start: "",
    end: ""
  })

  // Fetch mentor's available day (e.g., "Wednesday")
  useEffect(() => {
    const fetchAvailability = async () => {
      const res = await fetchAvailableDate("68672eb716243a85ccf39d2a");
      const data = res.data;      

      const normalizedDays = ["wednesday", "thursday"].map(
        (day: string) =>
          day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
      ); // Normalize like "Wednesday"
      setMentorWeekdays(normalizedDays);

      if (Array.isArray(data.date) && data.date.length > 0) {
        const normalizedDays = data.date.map(
          (day: string) =>
            day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
        ); // Normalize like "Wednesday"
        setMentorWeekdays(normalizedDays);
        setTime({
          ...time,
          start: data.start,
          end: data.end,
        })
      } else {
        Error("Mentor has not set any available weekdays.");
      }
    };

    fetchAvailability();
  }, [mentorId]);

  // Enable only the mentor's weekday in the calendar
  const tileDisabled = ({ date }: { date: Date }) => {
    if (!mentorWeekdays || mentorWeekdays.length === 0) return true;

    const currentDayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return !mentorWeekdays.includes(currentDayName);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const confirmBooking = async () => {
    if (!selectedDate) return;

    const formattedDate = formatFullDate(selectedDate); // e.g., "Wednesday 16 July, 2025"

    try {
      let payload = { date: formattedDate };
      await BookASession(mentorId, payload);
      Success("Booking confirmed successfully.");
    } catch (err) {
      console.error("Booking failed:", err);
      Error("Booking failed. Try again.");
    } finally {
      setModalOpen(false);
      close()
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book a Mentorship Session</h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
      />

      <Modal
        isOpen={modalOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirm Booking"
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-2"
        overlayClassName="fixed z-30 inset-0 bg-neutral-100/60 flex items-center justify-center"
      >
        <h3 className="text-lg font-bold mb-4">Confirm Booking</h3>
        {selectedDate && (
          <p>
            You are booking a session on{" "}
            <strong>{formatFullDate(selectedDate)}</strong>,{" "}
            from{" "}<strong>{time.start} - {time.end}</strong>.
          </p>
        )}
        <div className="mt-4 flex gap-4">
          <button
            onClick={confirmBooking}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Confirm
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingUI;
