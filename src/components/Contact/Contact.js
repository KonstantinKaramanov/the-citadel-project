import SinglePageHead from "../SinglePageHead/SinglePageHead";
import { send } from 'emailjs-com';
import  * as userService from "../../services/userService";
import { useState } from "react";
import Notification from "../User/Notification/Notification";
import { validateEmail } from "../../services/userService";
import { useHistory } from "react-router";
import "./Contact.css"

const initialNotificationState = {type:'', message: []}
const Contact = () => {
	let history = useHistory();
	const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);
	
const closeNotification = () => {
	setShowNotification(false)
	setNotification(initialNotificationState)
}
	const [toSend, setToSend] = useState({
		"from_name": '',
		"to_name": 'Admin',
		"message": '',
		"reply_to": '',
	  });

	 let userData = []

	  const getName = (e) => {
		userData.push(e.target.value)
		setToSend(prevState => ({
			...prevState,
			["from_name"]: e.target.value
		}));

	  }
	  const getEmail = (e) => {
		  if (! validateEmail(e.target.value)) {
			setNotification({
				type:'error',
				message: ['Email is not valid.']
			})
			setShowNotification(true)
			
		  } else {
			  setNotification(initialNotificationState)
			  setShowNotification(false)
		  }
		
		setToSend(prevState => ({
			...prevState,
			["reply_to"]: e.target.value
		}));

	  }
	  const getMessage = (e) => {
		setToSend(prevState => ({
			...prevState,
			["message"]: e.target.value
		}));

	  }


	function submitContact(e) {
		e.preventDefault();
	
		send(
			'service_odjm2ae',
			'template_82tmqgn',
			toSend,
			'user_ASUFZV4633Wfp9UfdzYfX'
		  )
			.then((response) => {
	
			  setShowNotification(true)
			  setNotification({
				  type:'success',
				  message: ['Message sent successfully. We will get back to you!']
			  })
			
			  e.target.reset();
		
			})
			.catch((err) => {
		
			  setShowNotification(true)
			  setNotification({
				  type:'error',
				  message: ['Error sending message! Try again or contact us via phone']
			  })

			});
	
		//	setTimeout(() => {setShowNotification(false)},3000)

			setTimeout(() => {history.push("/")}, 4000)
			setNotification(initialNotificationState)
	}


	return (
		<>
		<SinglePageHead pageInfo={{name:'Contact', slug:'contact'}} />
		<div className="contact">
            <div className="container">
                <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>Get In Touch</p>
                    <h2>For Any Query</h2>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.2s">
                                <i className="fa fa-map-marker-alt"></i>
                                <div className="contact-text">
                                    <h2>Location</h2>
                                    <p>Plovdiv, Bulgaria</p>
                                </div>
                            </div>
                            <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.4s">
                                <i className="fa fa-phone-alt"></i>
                                <div className="contact-text">
                                    <h2>Phone</h2>
                                    <p>+359 888 888</p>
                                </div>
                            </div>
                            <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.6s">
                                <i className="far fa-envelope"></i>
                                <div className="contact-text">
                                    <h2>Email</h2>
                                    <p>lok'thar@ogar.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
					{showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} page={'contact'}/> : '' }
                    <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="contact-form">
                            <div id="success"></div>
                            <form name="sentMessage" id="contactForm" onSubmit={submitContact}> 
	
                                <div className="control-group">
                                    <input onBlur={getName} type="text" name="name" className="form-control" id="name" placeholder="Your Name" required="required"  data-validation-required-message="Please enter your name" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input onBlur={getEmail} type="email" name="email" className="form-control" id="email" placeholder="Your Email" required="required"  data-validation-required-message="Please enter your email" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <textarea onBlur={getMessage}  name="message" className="form-control" id="message" placeholder="Message" required="required" data-validation-required-message="Please enter your message"></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div>
                                    <button className="btn" type="submit" id="sendMessageButton" >Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</>
	)
}

export default Contact;