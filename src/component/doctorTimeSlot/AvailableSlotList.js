import React from 'react'
import { deleteDataApi } from '../../apiCall/api';

const AvailableSlotList = (props) => {
    console.log(props.doctorTimeSlot)
    const deleteTimeSlot = (id) => {
        var result = window.confirm("Do you wand to delete this slot!!!");
        if (result == true) {
            deleteDataApi(`timeSlot/${id}`).then(res => {
                if (res.status === 200) {
                    alert("Slot deleted successfully...")
                }
            })
        }
    }

    return (
        <>
            { props.doctorTimeSlot?.map(time => {
                const { date, fromTime, toTime, status, id } = time;
                return (<li className="list-group-item">{date} / {fromTime} / {toTime}
                    {status === 'booked' ? <span className="float-right">Booked</span> :
                        <button className="float-right btn-danger" onClick={() => deleteTimeSlot(id)}>Delete</button>}
                </li>
                )
            })
            }
        </>

    )
}

export default AvailableSlotList;


