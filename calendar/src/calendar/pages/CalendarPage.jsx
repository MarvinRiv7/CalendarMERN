import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../components/Navbar"
import { addHours } from 'date-fns'
import { getMessagesEs, localizers } from '../../helpers'



const events = [{
  title: 'Cumple de Marvin',
  notes: 'Hay que comprarle un iPhone',
  start: new Date(),
  end: addHours(new Date(), 3 ),
  bgColor: '#fafafa',
  user: {
    _id: '1234',
    name: 'Marvin'
  }
}] 

export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return {
      style
    }
  }
  return (
    <>
      <Navbar/>
      <Calendar
      culture='es'
      localizer={localizers}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesEs()}
      eventPropGetter={eventStyleGetter}
    />

    </>
  )
}
