import React from 'react';
import FullCalendar from '@fullcalendar/react';  // First
import { useNavigate } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';  // Plugins after
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const EventCalendar = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (clickInfo) => {
    navigate(`/events/${clickInfo.event.id}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
    events={events.map(event => ({
  id: event.id.toString(),
  title: event.title,
  start: new Date(event.dateStart),  // ✅ Date object - FullCalendar reads this
  end: new Date(new Date(event.dateStart).getTime() + 2 * 60 * 60 * 1000),  // +2hrs
  extendedProps: { 
    category: event.category, 
    location: event.location, 
    price: event.price,
    rsvps: event.rsvps 
  }
}))}


      eventClick={handleEventClick}
      height="600px"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      }}
      eventDisplay="block"
    />
  );
};

export default EventCalendar;
