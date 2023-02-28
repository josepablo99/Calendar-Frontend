import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";





export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();


  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);


    const style = {
      backgroundColor: isMyEvent ? '#34CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])


  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        culture='es'
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
