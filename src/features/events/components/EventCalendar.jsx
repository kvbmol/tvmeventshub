import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const EventCalendar = ({ events = [] }) => {
  const navigate = useNavigate();

  console.log("Events received:", events);

  return (
    <div className="p-4 border-2 border-red-500 min-h-150">
      <div className="w-full h-125">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map((e) => ({
            id: e.id,
            title: e.title,
            start: e.dateStart,
            end: e.dateEnd,
          }))}
          height={500}
          eventDisplay="block"
          eventBackgroundColor="#3B82F6"
          eventBorderColor="#1D4ED8"
          eventTextColor="white"
          eventClick={(info) => {
            console.log("Clicked event ID:", info.event.id);
            navigate(`/events/${info.event.id}`);
          }}
        />
      </div>
    </div>
  );
};

export default EventCalendar;
