import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataApi } from '../../apiCall/api';
import ListData from '../ListData';

const DoctorDetails = (props) => {

    const [doctorInfo, setDoctorInfo] = useState({});
    const { id: paramsId } = useParams();

    useEffect(() => {
        getDataApi(`doctorList/${paramsId}`).then(res => {
            setDoctorInfo(res.data)
        })
    }, []);

    return (
        <div >
            <p><b>Address</b>: {doctorInfo?.address?.colony} </p>
            <p><b>City</b>: {doctorInfo?.address?.city} </p>
            <p><b>About Dr.</b>: {doctorInfo?.aboutDr} </p>
            <p><b>Education</b>: {doctorInfo?.education} </p>
            <hr />
            <button className="btn btn-info" onClick={() => props.history.push(`/book-appointment/${doctorInfo.doctorId}`)}>Appointment</button>
            <button className="btn btn-warning" onClick={() => props.history.push(`/doctor-list`)}>Go Back Page</button>
        </div >
    )
}


export default DoctorDetails