import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoimg from './images/tWabbitLogo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);


	return (
			<div className='navContainer'>
				<span className='logo-link'>
					<NavLink exact to="/" className="navLinkLogo">
						<img className='logoimg' src={logoimg} alt='logo' />
					</NavLink>	
				</span>
				
				<span className="about-link">
					<NavLink className='aboutLink' exact to="/about">
					ABOUT
					</NavLink>
				</span>
				<span className='profileButton'>
					<ProfileButton user={sessionUser} />
				</span>
			</div>
	);
}

export default Navigation;
