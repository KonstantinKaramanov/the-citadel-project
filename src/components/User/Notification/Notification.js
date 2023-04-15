import './Notification.css'

const Notification = ({type, message, closeNotification, page}) => {

		let key = 1;
		return (
      <div className={`alert ${type} ${page=="contact" ? "contact" : ''}`} >
        <span
          className="closebtn"
          onClick={closeNotification}
        >
          &times;
        </span>
        {message.map(m => <p key={`notify - ${key++}`} className='single-msg'>&rarr; {m}</p>)}
      </div>
    );
}

export default Notification;