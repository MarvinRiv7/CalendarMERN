import { addHours, differenceInSeconds } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker, {registerLocale}from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore()
    const {activeEvent, startSavingEvent} = useCalendarStore()
    const [formSubmitted, setformSubmitted] = useState(false)

    const [formValues, setformValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours (new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if(!formSubmitted) return ''
        return (formValues.title.length > 5) 
        ? '' 
        : 'is-invalid'
    }, 
    [formValues.title, formSubmitted])

    useEffect(() => {
      if(activeEvent !== null) {
        setformValues({...activeEvent})
      }
    
    }, [activeEvent])
    

    const onInputChanged = ({target}) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing ) => {
        setformValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando')
        closeDateModal()
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setformSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)
       if (isNaN(difference)|| difference <= 0) {
        Swal.fire('Fechas incorrectas', "Revisar las fechas ingresadas", 'error')
        return; 
       } 
       if(formValues.title.length <= 0) return

       console.log(formValues)
       await startSavingEvent(formValues)
       closeDateModal()
       setformSubmitted(false)

    }

  return (
    <Modal
    isOpen={isDateModalOpen}
    onRequestClose={onCloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
    >
        <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio: &nbsp;</label>
        <DatePicker
         className="form-control"
        selected={formValues.start}
        onChange={(event) => onDateChanged(event, 'start')}
        dateFormat="Pp"
        showTimeSelect
        locale="es"
        timeCaption='Hora'
        />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin: &nbsp; </label>
        <DatePicker
        minDate={formValues.start}
        className="form-control"
        selected={formValues.end}
        onChange={(event) => onDateChanged(event, 'end')}
        dateFormat="Pp"
        showTimeSelect
        locale="es"
        timeCaption='Hora'
        
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>
</form>
    </Modal>
  )
}
