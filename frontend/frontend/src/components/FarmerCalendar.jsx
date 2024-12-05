import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const FarmerCalendar = () => {
  const [events, setEvents] = useState([]);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents)); // Parse the JSON string into an array
    }
  }, []);

  // Function to reset the calendar
  const resetCalendar = () => {
    setEvents([]); // Clear the events state
    localStorage.removeItem("events"); // Remove events from localStorage
  };

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <h2>Farmer Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

      {/* Reset Button */}
      <button onClick={resetCalendar} style={{ marginTop: "20px" }}>
        Reset Calendar
      </button>
    </div>
  );
};

export default FarmerCalendar;
