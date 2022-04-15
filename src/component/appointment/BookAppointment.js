import React, { useEffect, useState } from 'react';
import { getDataApi, patchDataApi, postDataApi } from '../../apiCall/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addSlotInTheList } from '../../redux/addSlote/addSlotAction';

const BookAppointment = (props) => {

    const [doctorTimeSlot, setDoctorTimeSlot] = useState([]);
    const [msg, setMsg] = useState('');
    const { doctorId } = useParams();

    const dispatcher = useDispatch()

    const state = useSelector(state => state.user)

    useEffect(() => {
        getDataApi(`timeSlot/?doctorId=${doctorId}`).then(res => {
           
           const newData = res.data.filter(timeSlot =>{
                if(timeSlot.status !== 'booked'){
                    return timeSlot
                }
            })
            setDoctorTimeSlot(newData)
        })
    }, []);


    const formik = useFormik({
        initialValues: {
            timeSlot: '',
            firstName: '',
            lastName: '',
            email: '',
            contact: ''
        },
        validationSchema: Yup.object({
            timeSlot: Yup.string()
                .required('Select time slot'),

            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('First name is required'),

            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Last name is required'),

            email: Yup.string().email('Invalid email id')
                .required('Email id is Required'),

            contact: Yup.string()
                .max(10, 'contact should be 10 characters').min(10)
                .required('Contact number is Required'),
        }),

        onSubmit: values => {
            const appointmentRequestData = {
                ...values, doctorId: doctorTimeSlot.doctorId, doctoreType: doctorTimeSlot.doctoreType,
                userName: state.userName, status: ''
            }
         //   dispatcher(addSlotInTheList(appointmentRequestData))

            postDataApi(`appointmentRequest`, appointmentRequestData).then(res => {
                if (res.status === 201) {
                    doctorTimeSlot.map(fromTime => {
                        const bookedTime = `${fromTime.toTime} - ${fromTime.fromTime}`;
                        if (bookedTime === values.timeSlot) {
                            patchDataApi(`timeSlot/${fromTime.id}`, { ...fromTime, status: "booked" }).then(res => {
                                console.log(res.data)
                            })
                        }
                    })
                    setMsg('Appointment booked successfully.')
                    setTimeout(() => {
                        setMsg('')
                          props.history.push("/appointment-request-list")
                    }, 1500)
                }
            })
        },
    });

    return (
        <>
            <h1>Book Doctor Appointment</h1>
            <form className="appointmentForm" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                   {msg !== "" ? <h3 className="success-msg">{msg}</h3> : null}
                    <label className="control-label">Select Slot : </label>
                    <select name="timeSlot" className="form-control" {...formik.getFieldProps('timeSlot')}>
                        <option value="" label="Select time" />
                        {doctorTimeSlot.length > 0 ?
                            doctorTimeSlot?.map(time => {
                                return <option value={`${time.toTime} - ${time.fromTime}`} label={`${time.toTime} - ${time.fromTime}`} />
                            })
                            : null}
                    </select>
                    <div className="error-msg">{formik.errors.timeSlot}</div>
                </div>
                <div className="form-group">
                    <label className="control-label">First Name : </label>
                    <input id="firstName" type="text" className="form-control" {...formik.getFieldProps('firstName')} />
                    <div className="error-msg">{formik.errors.firstName}</div>
                </div>
                <div className="form-group">
                    <label className="control-label">Last Name : </label>
                    <input id="lastName" className="form-control" type="text" {...formik.getFieldProps('lastName')} />
                    <div className="error-msg">{formik.errors.lastName}</div>
                </div>
                <div className="form-group">
                    <label className="control-label">Email Address : </label>
                    <input id="email" className="form-control" type="email" {...formik.getFieldProps('email')} />
                    <div className="error-msg">{formik.errors.email}</div>
                </div>
                <div className="form-group">
                    <label className="control-label">Contact : </label>
                    <input id="contact" className="form-control" type="test" {...formik.getFieldProps('contact')} />
                    <div className="error-msg">{formik.errors.contact}</div>
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
            </form>
            <button className="btn btn-warning" onClick={() => props.history.push(`/doctor-list/`)}>Go Back Page</button>
        </>
    )
}


export default BookAppointment;