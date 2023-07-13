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
				<NavLink exact to="/" className="navLinkLogo">
					<img className='logoimg' src={logoimg} alt='logo' />
				</NavLink>	
				<span>
					<li className="profileButton">
							<ProfileButton user={sessionUser} />
					</li>
				</span>
			</div>
	);
}

export default Navigation;
