import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postDataApi } from '../../apiCall/api';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

const DoctorTimeSlot = (props) => {
    const classes = useStyles();
    const [timeSlot, setTimeSlot] = useState({ date: '', fromTime: '', toTime: '' })

    const state = useSelector(state => state.user)
    const { doctorId } = state;
    const [msg, setMsg] = useState('')


    const onchangeHandel = (e) => {
        const { name, value } = e.target;
        setTimeSlot({ ...timeSlot, [name]: value });
    }

    const addTimeSlotHandel = () => {
        const newData = { ...timeSlot, doctorId }
        postDataApi('timeSlot', newData).then(res => {
            if (res.status === 201) {
                setMsg("Time Slot added successfully.")
                setTimeout(() => {
                    setMsg('');
                    props.history.push("/appointment-request-list")
                }, 2000)
            }
        })
    }

    return (
        <>
            <p className="text-center success-msg">{msg}</p>
            <div className="panel panel-info">
                <div className="panel-heading">Doctor Time Slot</div>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="Birthday"
                        name='date'
                        type="date"
                        defaultValue={timeSlot.time}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => onchangeHandel(event)}
                    />

                    <TextField
                        id="fromTime"
                        name='fromTime'
                        label="from time"
                        type="time"
                        defaultValue={timeSlot.fromTime}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => onchangeHandel(event)}
                    />

                    <TextField
                        id="toTime"
                        name='toTime'
                        label="To time"
                        type="time"
                        defaultValue={timeSlot.toTime}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => onchangeHandel(event)}
                    />
                    <Button variant="contained" color="primary" onClick={() => addTimeSlotHandel()}>ADD</Button>
                </form>
            </div>
        </>
    )
}

export default DoctorTimeSlot


