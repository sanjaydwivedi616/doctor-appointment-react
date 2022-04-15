import React, { lazy, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import Loader from "../loader/Loader";
const LoginContainers = lazy(() => import('../../containers/LoginContainers'));
const AppointmentRequestList = lazy(() => import("../appointment/AppointmentRequestList"));
const BookAppointment = lazy(() => import("../appointment/BookAppointment"));
const DoctorList = lazy(() => import("../doctors/DoctorList"));
const DoctorDetails = lazy(() => import("../doctors/DoctorDetails"));
const DoctorTimeSlot = lazy(() => import("../doctors/DoctorTimeSlot"));
const AvailableSlotList =lazy(() => import('../doctorTimeSlot/AvailableSlotList'));

const Router = (props) => {

  const history = useHistory();
  if (!props.userLoginStatus) {
    history.push("/")
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={LoginContainers}></Route>
        {props.userLoginStatus === true ?
          <>
            <Route path="/appointment-request-list" component={AppointmentRequestList}></Route>
            {props.userType === "doctor" ?<>
              <Route path="/doctor-time-slot" component={DoctorTimeSlot}></Route>
              <Route path="/available-slot-list" component={AvailableSlotList}></Route>
              </>
              : null
            }
            {props.userType === "user" ?
              <>
                <Route path="/doctor-list" component={DoctorList}></Route>
                <Route path="/doctor-details/:id" component={DoctorDetails}></Route>
                <Route path="/book-appointment/:doctorId" component={BookAppointment}></Route>
              </>
              : null}
          </> : null}
      </Switch>
    </Suspense>
  )
}

const mapStateToProps = state => {
  return {
    userLoginStatus: state.user.loginStatus,
    userType: state.user.userType
  }
}

export default connect(
  mapStateToProps
)(Router);
