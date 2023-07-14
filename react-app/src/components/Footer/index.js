import React from 'react';
import './Footer.css';

function Footer(){
    return (
        <div className='footer'>
            <div className='footer-content'>
                <p>Follow us! We're friendly:</p>
            </div>
            <div className='footer-grid'>
                <div className='footer-discover'> Discover
                    <p>Become a Tasker</p>
                    <p>Services By City</p>
                    <p>Elite Taskers</p>
                    <p>Help</p>
                </div>
                <div className='footer-Company'>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press</p>
                    <p>TaskRabbit for Good</p>
                    <p>Blog</p>
                    <p>Terms & Privacy</p>
                </div>
                <div className='footer-app'>
                    <p>Download our app</p>
                    <p>Tackle your to-do list wherever you are with our mobile app.</p>
                    <p>download on the appstore</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
