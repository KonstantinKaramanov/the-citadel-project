import "./Footer.css"


const Footer = () => {
	return (
		
		<div className="footer wow fadeIn" data-wow-delay="0.3s">
            <div className="container-fluid">
                <div className="container">
                    <div className="footer-info">
                        <span className="footer-logo">The Citadel </span>
                        <h3>Plovdiv, Bulgaria</h3>
                        <div className="footer-menu">
                            <p>+359 888 888</p>
                            <p>Lok'tar@Ogar.com</p>
                        </div>
                    </div>
                </div>
                <div className="container copyright">
                    <div className="row">
                        <div className="col-md-6">
                            <p>&copy; The Citadel Project, All Right Reserved.</p>
                        </div>
                        <div className="col-md-6">
                            <p>Designed By <a href="https://github.com/KonstantinKaramanov">Konstantin Karamanov</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default Footer;
