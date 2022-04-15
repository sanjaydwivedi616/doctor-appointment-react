import React, { useEffect, useState } from 'react';
import { getDataApi } from '../../apiCall/api';
import ListData from '../ListData';
import Loader from '../loader/Loader';

const DoctorList = (props) => {

    const [loader, setLoader] = useState(false)
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        setLoader(true)
        getDataApi('doctorList').then(res => {
            setDoctorList(res.data);
            setLoader(false)
        })
    }, []);

    const moreInfoAboutDr = (id) => {
        props.history.push(`/doctor-details/${id}`)
    }

    return (
        <>
            { loader ? <Loader /> :
                doctorList.length > 0 ?
                    doctorList?.map(doctor => {
                        return <>
                            <ListData key={doctor.id} doctor={doctor}>
                                <button className="btn btn-info" onClick={() => moreInfoAboutDr(doctor.id)}>More info</button>
                            </ListData>
                        </>
                    })
                    : <p>No data fund</p>}
        </>
    )
}
export default DoctorList