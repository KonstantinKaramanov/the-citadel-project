import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import SingleTeamMember from "../../Team/TeamSingleCard/TeamSingleCard";
import SingleClassCard from "../../Classes/SingleClassCard/SingleClassCard";
import { useState, useEffect } from "react";
import { isAuth } from '../../../hoc/isAuth'
import "./Profile.css"


import * as classService from '../../../services/classService';
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import BookContext from "../../../contexts/BookContext";

const Profile = () => {
  let userId;
  let user;
  let { userInfo } = useContext(AuthContext)
  let { bookingInfo, changeBookingInfo } = useContext(BookContext)
  userId = userInfo.user.user.id
  user = userInfo.user.user;
  let isAuth = userInfo.isAuth

  const [userClasses, setuserClasses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let classes = [];
      if (user.acf.participates_in_classes != null && user.acf.user_type === "student") {
        for (let cl of user.acf.participates_in_classes) {
          let receivedClass = await classService.getClassById(cl['classId'])
          classes.push(receivedClass)
        }
      } else if (user.acf.user_type === "teacher") {
        classes = await classService.getAllbyPerson(userId);
      }
      setuserClasses(classes.length > bookingInfo.length ? classes : bookingInfo);
    }
    fetchData();
  }, [userInfo, userId, user.acf.participates_in_classes, user.acf.user_type, bookingInfo]);

  return isAuth ? (
    <>
      <SinglePageHead pageInfo={{ name: "My Account", slug: 'profile/' + userId }} />
      <div className="team">
        <div className="container">
          <div className="row inf-content">
            <SingleTeamMember
              style={{ marginTop: "2em" }}
              userImage={user.acf.user_imageUrl}
              userFullName={`${user.acf.first_name} ${user.acf.last_name}`}
              userType={user.acf.user_type}
            />
            <div className="col-md-6 user-info">
              <strong>Information</strong>
              <br />
              <div className="table-responsive">
                <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-bookmark text-primary"></span>
                          Username
                        </strong>
                      </td>
                      <td className="text-primary">{user.name || "User"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-calendar text-primary"></span>
                          Full Name
                        </strong>
                      </td>
                      <td className="text-primary">{`${user.acf.first_name} ${user.acf.last_name}` || "Default User"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-eye-open text-primary"></span>
                          Role
                        </strong>
                      </td>
                      <td className="text-primary"> {user.acf.user_type || "User"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <span className="glyphicon glyphicon-envelope text-primary"></span>
                          Email
                        </strong>
                      </td>

                      <td className="text-primary">{user.acf.email || "No email provided"}</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            className="section-header text-center wow zoomIn"
            data-wow-delay="0.1s"
          >
            <p> {user.acf.first_name}'s Classes </p>

            <h2>{user.acf.user_type === "student" ? "Classes you have booked" : "Classes you teach"}</h2>
          </div>
        </div>
        {userClasses.length > 0 ?
          (<div className="class">
            <div className="container">
              <div className="row class-container">
                {userClasses.filter(cl => cl.message !== "Invalid post ID.").map(c =>
                  <SingleClassCard
                    key={c.id}
                    classData={c}
                    authorId={c.author}
                    cardId={c.id}
                  />)}
              </div>
            </div>
          </div>)
          :
          (<h4 className="no-classes-found">No classes found.</h4>)}

      </div>
    </>
  ) : (
    <>
      <SinglePageHead pageInfo={{ name: "My Account", slug: 'profile' }} />
      <div className="team">
        <div className="container">
          Loading...
        </div>
      </div>
    </>
  );
};
export default isAuth(Profile);
