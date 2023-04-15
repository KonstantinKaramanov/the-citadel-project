import { Link } from "react-router-dom";
import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import * as classService from '../../../services/classService';
import * as userService from '../../../services/userService';
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import BookContext from "../../../contexts/BookContext";
import Notification from "../../User/Notification/Notification";

import './ClassDetails.css';


let errors = ['Booking failed. Try again or contact us.']
let success = [`Booking is successful!`]
const initialNotificationState = { type: '', message: [] }

const ClassDetails = ({
  location,
  history,
  match,

}) => {
  // Notifation handling
  const [notification, setNotification] = useState(initialNotificationState);
  const [showNotification, setShowNotification] = useState(false);
  const closeNotification = () => {
    setShowNotification(false);
    setNotification(initialNotificationState);
  };
  const { changeBookingInfo } = useContext(BookContext);
  const classAuthor = location.state;
  const authorId = location.state?.authorId;
  const { userInfo: currentLoggedUser } = useContext(AuthContext);
  const [userAcf, setUserAcf] = useState(null);
  let currentUserID = currentLoggedUser?.user?.user?.id;


  let isAuthor = false;

  if (currentLoggedUser.isAuth && currentUserID === authorId) {
    isAuthor = true;
  }

  const userToken = currentLoggedUser?.user.token;

  const [classDetails, setClassDetails] = useState({});
  const [hasBooked, setHasBooked] = useState(false);
  const [changeSpots, setChangeSpots] = useState(false);
  const showBtns = Boolean(currentLoggedUser.isAuth)

  useEffect(() => {

    async function getClass() {
      const result = await classService.getClassById(match.params.cardId);
      let userResult = await userService.searchUserByEmail(
        currentLoggedUser?.user?.user_email
      );
      userResult = userResult[0]?.acf;
      setUserAcf(userResult);
      setClassDetails(result);


    }
    getClass();
  }, );



  let { id, acf } = classDetails;


  const bookClass = async (e) => {
    e.preventDefault();
    let classToBook = match.params.cardId;
    let booked_by = "";
    let participates_in_classes = "";

    acf.booked_by != null
      ? (booked_by = [...acf.booked_by, { userId: currentUserID.toString() }])
      : (booked_by = [{ userId: currentUserID.toString() }]);
    userAcf.participates_in_classes != null
      ? (participates_in_classes = [
        ...userAcf.participates_in_classes,
        { classId: classToBook.toString() },
      ])
      : (participates_in_classes = [{ classId: classToBook.toString() }]);
    let objToClass = {
      acf: {
        booked_by,
      },
    };
    let objToUser = {
      acf: {
        participates_in_classes,
      },
    };

    let result = await classService.bookClassbyId(
      objToClass,
      classToBook,
      userToken
    );
    let userResult = await userService.addBookingToUser(
      currentUserID,
      objToUser,
      userToken
    );

    if (userResult.id && result.id) {
      setNotification({
        type: 'success',
        message: success
      })
      setShowNotification(true)
    } else {
      setNotification({
        type: 'error',
        message: errors
      })
      setShowNotification(true)
    }

    setTimeout(() => { setShowNotification(false) }, 3000)
    let ids = [];
    for (let id of userResult.acf?.participates_in_classes) {
      ids.push(id["classId"]);
    }
    let updatedBookings = await classService.getSeveralClassesByIds(ids);
    changeBookingInfo(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setHasBooked(true);
    setChangeSpots(true);
  };
  let initialspotsLeft =
    acf?.booked_by !== null
      ? Number(acf?.capacity) - Number(acf?.booked_by?.length)
      : acf.capacity;

  let finalSpots = changeSpots ? initialspotsLeft-- : initialspotsLeft;

  const SpecificButtons =
    userAcf?.user_type === "teacher" || initialspotsLeft === 0 ? (
      ""
    ) : (
      <button className="submit login details" onClick={bookClass}>
        {" "}
        BOOK CLASS
      </button>
    );

  return acf ? (
    <>
      <SinglePageHead
        pageInfo={{ name: acf.name, slug: `details/${match.params.cardId}` }}
      />

      <div className="single">
        <div className="container">
          <div className="row details-row">
            <div className="col-lg-8">
              <div className="single-content wow fadeInUp">
                <img src={acf.imageUrl} />
                <h2>{acf.name}</h2>
                <p>{acf.description}</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar-widget wow fadeInUp"></div>

                <div className="sidebar-widget wow fadeInUp">
                  <h2 className="widget-title">Class Details:</h2>
                </div>
                <div className="sidebar-widget wow fadeInUp">
                  <div className="category-widget">
                    <ul>
                      <li>
                        <strong>Taught By</strong>
                      </li>
                      {classAuthor?.first_name ? (
                        <div className="single-bio wow fadeInUp">
                          <div className="single-bio-img">
                            <img src={classAuthor.user_imageUrl} />
                          </div>
                          <div className="single-bio-text">
                            <h3>
                              {classAuthor.first_name} {classAuthor.last_name}
                            </h3>
                          </div>
                        </div>
                      ) : (
                        <h1> No author info </h1>
                      )}
                      <li>
                        <strong>Class Type:</strong> {acf.type}
                      </li>
                      <li>
                        <strong>Group Size:</strong> {acf.capacity}{" "}
                      </li>
                      <li>
                        <strong>Spots Left: </strong>
                        {initialspotsLeft > 0
                          ? initialspotsLeft
                          : "Fully Booked"}
                      </li>
                      <li>
                        <strong>When:</strong> {acf.date}
                      </li>
                      <li>
                        <strong>What time:</strong> {acf.start_time} -{" "}
                        {acf.end_time}
                      </li>
                    </ul>
                  </div>
                </div>
                {showBtns ? (
                  <div className="sidebar-widget wow fadeInUp">
                    {!isAuthor ? (
                      <div className="guest-btns">
                        {showNotification === true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : ''}
                        {!hasBooked &&
                          !acf.booked_by?.some(
                            (e) => e["userId"] === currentUserID
                          ) ? (
                          <>{SpecificButtons}</>
                        ) : (
                          <h5>You have booked this class.</h5>
                        )}
                      </div>
                    ) : (
                      <div className="author-btns">
                        <button className="submit login details">
                          {" "}
                          <Link
                            className="btn"
                            to={{
                              pathname: `/edit/${match.params.cardId}`,
                              state: acf,
                            }}
                          >
                            EDIT
                          </Link>
                        </button>
                        <button className="submit login details">
                          {" "}
                          <Link
                            className="btn"
                            to={{
                              pathname: `/delete/${match.params.cardId}`,
                              state: acf,
                            }}
                          >
                            DELETE
                          </Link>{" "}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <span>
                    <Link to="/login">Log in </Link>to Book, Edit or Delete
                    class.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <SinglePageHead
      pageInfo={{ name: "LOADING", slug: window.location.href }}
    />
  );
};

export default ClassDetails;
