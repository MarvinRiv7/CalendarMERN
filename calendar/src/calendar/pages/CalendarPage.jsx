import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../components/Navbar"
import { getMessagesEs, localizers } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'
import { useEffect, useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'
import { useAuthStore } from '../../hooks/useAuthStote'

export const CalendarPage = () => {


  const {user} = useAuthStore()

  const {events, setActiveEvent, startLoadingEventes} = useCalendarStore()
  const {openDateModal} = useUiStore()

  const [lastview, setlastview] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) ||  (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? 'blue' : 'grey',
      borderRadius: '10px',
      opacity: '0.9',
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    //console.log({doubleClick: event})
    openDateModal()
  }

  const onSelect = (event) => {
    //console.log({click: event})
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setlastview(event)
  }

  useEffect(() => {
    startLoadingEventes()
  }, [])
  

  return (
    <>
      <Navbar/>
      <Calendar
      culture='es'
      localizer={localizers}
      events={events}
      defaultView={lastview}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesEs()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
    <CalendarModal/>
    <FabAddNew/>
    <FabDelete/>

    </>
  )
}
