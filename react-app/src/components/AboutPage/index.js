import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoimg2 from './images/taskwabbitlogo2.png';
import linkedInLogo from './images/linkedin-logo.png';
import './AboutPage.css'

const AboutPage = () => {
    return ( 
        <div className="about-outer-container">
            <div className="aboutDescription">
                <div className="about-logo">
                    <img className='logoimg2' src={logoimg2} alt='logo' />
                </div>
                <div className="aboutDescription">
                    <h2>A group project inspired by TaskRabbit.com</h2> 
                    <div className="aboutContent">
                        <p>TaskWabbit is a fullstack web application that was built utilizing
                        the following languages/frameworks/libraries: JavaScript, Redux.js, Python, Flask, 
                        SQLAlchemy, React.js, HTML, and CSS.</p>

                        <p>TaskWabbit allows users to book skilled individuals 
                        in their local area to complete task related jobs such as painting, 
                        yard work, furniture building, etc. TaskWabbit also allows a 
                        user to sign up as a tasker and set an hourly rate for different 
                        tasks they are available to be hired to perform.</p>
                        <p>Click <NavLink className='about-login-link' exact to='/login' >HERE</NavLink> to demo the site.</p>
                    </div>
                </div>
            </div>
            <div className="contributors-outer-container">
                <div className="contributors-header">
                    <h2>Contributing Software Engineers:</h2>
                </div>
                <div className="contributors-inner-container">
                    <div className="contributors-name">
                        <a className='linkedIn' href='https://www.linkedin.com/in/julie-barreto-415105289/' target="_blank">
                            <img className='linkedIn' src={linkedInLogo} alt='linkedIn'width="20" height="20" />
                        </a>
                        <span>
                            <>Julie Barreto</>
                        </span> 
                    </div>
                    <div className="contributors-name">
                        <a className='linkedIn' href='https://www.linkedin.com/in/nenitae/' target="_blank">
                            <img className='linkedIn' src={linkedInLogo} alt='linkedIn'width="20" height="20" />
                        </a>
                        <span>
                            <>Nenita Espinosa</>
                        </span> 
                    </div>
                    <div className="contributors-name">
                        <a className='linkedIn' href='https://www.linkedin.com/in/scotnicol/' target="_blank">
                            <img className='linkedIn' src={linkedInLogo} alt='linkedIn'width="20" height="20" />
                        </a>
                        <span className='about-name'>
                            <>Scot Nicol</>
                        </span> 
                    </div>
                    <div className="contributors-name">
                        <a className='linkedIn'href='https://www.linkedin.com/in/imran-shaukat-0306a025a/' target="_blank">
                            <img className='linkedIn' src={linkedInLogo} alt='linkedIn'width="20" height="20" />
                        </a>
                        <span className='about-name'>
                            <>Imran Shaukat</>
                        </span> 
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AboutPage;