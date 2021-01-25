//css
import './Header.css';
//react libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//logo
import ReactLogo from '../../assets/logo1.png';
//material ui
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../../redux/actions/userActions';
import Badge from '@material-ui/core/Badge';

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const history = useHistory();
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	let totalItemNum = cartItems.reduce((acc, curr) => curr.qty + acc, 0);

	const handleLogout = () => {
		dispatch(logout());
		setAnchorEl(null);
	};

	return (
		<div className='header'>
			<img onClick={() => history.push('/')} className='header__logo' src={ReactLogo} alt='' />
			<div className='header__icons'>
				{userInfo ? (
					<>
						<span>hi, {userInfo.name.split(' ')[0]}</span>
						<IconButton
							aria-controls='header__menu'
							aria-haspopup='true'
							onClick={event => setAnchorEl(event.currentTarget)}
						>
							<ArrowDropDownIcon />
						</IconButton>
					</>
				) : (
					<IconButton onClick={() => history.push('/login')}>
						<PersonIcon />
					</IconButton>
				)}

				<IconButton onClick={() => history.push('/cart')}>
					<Badge badgeContent={totalItemNum} color='secondary'>
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			</div>
			<Menu id='header__menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
				<MenuItem
					onClick={() => {
						history.push('/profile');
						setAnchorEl(null);
					}}
				>
					Profile
				</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export default Header;
