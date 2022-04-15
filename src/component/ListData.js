import React from 'react'
import Rating from './rating/Rating';

const ListData = (props) => {

    const { doctorName, doctoreType, email, contact, rating } = props.doctor;

    return (
        <div className="panel panel-info">
            <div className="panel-heading">Name : {doctorName}  <Rating rating={rating} /></div>
            <div className="panel-body">
                <p><b>Specialist : </b>{doctoreType}</p>
                <p><b>Email : </b>{email}</p>
                <p><b>Contact : </b>{contact}</p>
                {props.children}
            </div>
        </div>
    )
}


export default ListData;