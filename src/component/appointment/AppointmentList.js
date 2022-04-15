import React, { useState } from 'react'
import { patchDataApi } from "../../apiCall/api";

/**
 * property comming with appointmentData 
 * appointmentData have all this values id, firstName, lastName, timeSlot, email, contact, doctorId, doctoreType, status
 * after cancel the Appointment Updating the AppointmentData with cancel status
 * and updating the ui
 */

const AppointmentList = (props) => {

    const [msg, setMsg] = useState('');
    const cancelAppointmentRequest = (appoi) => {
        const newObj = { ...appoi, status: 'cancel' }
        patchDataApi(`appointmentRequest/${appoi.id}`, newObj).then(res => {
            if (res.status === 200) {
                setMsg('AppointmentData canceld.')
                setTimeout(() => {
                    setMsg('')
                }, 2000)
            }
        })
    }


    //Distracturing the props data

    const { id, firstName, lastName, timeSlot, email, contact, doctorId, doctoreType, status } = props.appointmentData;
    return (
        <>
            {msg !== '' ? <p className="success-msg">{msg}</p> : null}
            <div key={id} className="panel panel-info">
                <div className="panel-heading">Name : {firstName}  {lastName} / <b> Booked Time Slot:</b> {timeSlot}</div>
                <div className="panel-body">
                    <p><b>Email : </b>{email}</p>
                    <p><b>Contact : </b>{contact}</p>
                    <p><b>Doctore : </b>{doctorId}</p>
                    <p><b>Specialist : </b>{doctoreType}</p>
                    <button disabled={status === "cancel" ? true : false} className="btn btn-danger" onClick={() => cancelAppointmentRequest(props.appointmentData)}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default AppointmentList;