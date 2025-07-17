import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import axios from "axios";

// Types
interface Availability {
  _id: string;
  mentorId: string;
  date: string; // ISO date string
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

interface BookingRequest {
  availabilityId: string;
  menteeId: string;
}
// : React.FC<{ mentorId: string; menteeId: string }>

const BookingUI = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null);

  const mentorId = ""
  const menteeId = ""

  // Fetch availability on mount
  useEffect(() => {
    axios.get(`/api/mentors/${mentorId}/availability`).then((res) => {
      setAvailabilities(res.data);
    });
  }, [mentorId]);

  
  const handleDateChange = (value: any, event?: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedDate(value);
  };

  const getSlotsForDate = (date: Date) => {
    const target = date.toISOString().split("T")[0];
    return availabilities.filter((a) => a.date.startsWith(target));
  };

  const handleSlotClick = (slot: Availability) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const confirmBooking = async () => {
    if (!selectedSlot) return;
    await axios.post<BookingRequest>("/api/book", {
      availabilityId: selectedSlot._id,
      menteeId,
    });
    setModalOpen(false);
    alert("Session booked successfully");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book a Mentorship Session</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />

      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Available Slots</h3>
          <ul>
            {getSlotsForDate(selectedDate).map((slot) => (
              <li key={slot._id} className="mb-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              </li>
            ))}
            {getSlotsForDate(selectedDate).length === 0 && (
              <p>No slots available.</p>
            )}
          </ul>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirm Booking"
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-32"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-lg font-bold mb-4">Confirm Booking</h3>
        <p>
          You are booking a session on <strong>{selectedSlot?.date}</strong>{" "}
          from <strong>{selectedSlot?.startTime}</strong> to{" "}
          <strong>{selectedSlot?.endTime}</strong>
        </p>
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
