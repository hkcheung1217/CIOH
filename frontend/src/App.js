//CSS
import './App.css';
//React libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Header from './components/Header/Header';
//Pages
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import OrderDetailsPage from './pages/OrderDetailsPage/OrderDetailsPage';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Switch>
					<Route path='/cart/:id?' component={CartPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/orders/:id' component={OrderDetailsPage} />
					<Route path='/products/:id' component={ProductPage} />
					<Route path='/profile' component={ProfilePage} />
					<Route path='/register' component={RegisterPage} />
					<Route exact path='/' component={HomePage} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
