import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const FarmerCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Sowing Wheat",
      start: new Date(2024, 11, 10),
      end: new Date(2024, 11, 12),
    },
    {
      title: "Irrigation",
      start: new Date(2024, 11, 14),
      end: new Date(2024, 11, 15),
    },
    {
      title: "Fertilizer Application",
      start: new Date(2024, 11, 20),
      end: new Date(2024, 11, 20),
    },
  ]);

  // Function to add new events
  const addEvent = (title, start, end) => {
    const newEvent = { title, start: new Date(start), end: new Date(end) };
    setEvents([...events, newEvent]);
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

      <div style={{ marginTop: "20px" }}>
        <h3>Add New Task</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const title = formData.get("title");
            const start = formData.get("start");
            const end = formData.get("end");
            if (title && start && end) addEvent(title, start, end);
          }}
        >
          <label>
            Task Title:
            <input type="text" name="title" required />
          </label>
          <label>
            Start Date:
            <input type="date" name="start" required />
          </label>
          <label>
            End Date:
            <input type="date" name="end" required />
          </label>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default FarmerCalendar;
