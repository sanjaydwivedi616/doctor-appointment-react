import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDataApi } from '../../apiCall/api';
import AvailableTimeSlot from '../doctorTimeSlot/AvailableTimeSlot';
import AppointmentList from './AppointmentList';
import Loader from "../loader/Loader"

const AppointmentRequestList = () => {

    const [loader, setLoader] = useState(false)
    const [appointmentList, setAppointmentList] = useState([]);
    const state = useSelector(state => state.user);
    const { userType, userName, doctorId } = state;
    const getAppointmentRequest = () => {
        setLoader(true)
        if (userType === 'user') {
            getDataApi(`appointmentRequest/?userName=${userName}`).then(res => {
                setAppointmentList(res.data)
                setLoader(false)
            })
        } else {
            getDataApi(`appointmentRequest/?doctorId=${doctorId}`).then(res => {
                setAppointmentList(res.data)
                setLoader(false)
            })
        }
    }

    useEffect(() => {
        getAppointmentRequest()
    }, []);

    return (
        <>
            <div className={userType === "doctor" ? "col-sm-6" : "col-sm-12"}>
                {userType === "doctor" ?
                    <AvailableTimeSlot /> : null
                }
            </div>
            <div className={userType === "doctor" ? "col-sm-6" : "col-sm-12"}>
                {loader ? <Loader /> :
                    appointmentList.length > 0 ?
                        appointmentList?.map(appointmentData => {
                            return (
                                <AppointmentList appointmentData={appointmentData} />
                            )
                        })
                        : <h3 className="text-center">No appointment request</h3>
                }
            </div>
        </>
    )
}

export default AppointmentRequestList
