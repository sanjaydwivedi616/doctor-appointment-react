import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { deleteDataApi, getDataApi } from '../../apiCall/api';

const AvailableTimeSlot = () => {

    const [doctorTimeSlot, setDoctorTimeSlot] = useState([]);
    const state = useSelector(state => state.user);
    const { doctorId } = state;

    const getTimeSlotData = () => {
        getDataApi(`timeSlot/?doctorId=${doctorId}`).then(res => {
            setDoctorTimeSlot(res.data);
        })
    }

    useEffect(() => {
        getTimeSlotData()
    }, [doctorTimeSlot.length]);

    const deleteTimeSlot = (id) => {
        var result = window.confirm("Do you wand to delete this slot!!!");
        if (result == true) {
            deleteDataApi(`timeSlot/${id}`).then(res => {
                if (res.status === 200) {
                    alert("Slot deleted successfully...")
                    getTimeSlotData()
                }
            })
        }
    }

    return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item active">Available Time Slot.</li>
                {doctorTimeSlot.length > 0 ?
                    doctorTimeSlot?.map(time => {
                        const { date, fromTime, toTime, status, id } = time;
                        return (<li className="list-group-item">Date: {date} Time {fromTime} To {toTime}
                            {status === 'booked' ? <span className="float-right">Booked</span> :
                                <button className="float-right btn-danger" onClick={() => deleteTimeSlot(id)}>Delete</button>}
                        </li>
                        )
                    })
                    : <p className="text-center">No slot Available...</p>}
            </ul>
        </div>
    )
}


export default AvailableTimeSlot;