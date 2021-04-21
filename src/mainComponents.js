import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { NavLink } from 'react-router-dom';

import logo from './images/logo.svg';

export function Header() {
	return (
		<header>
			<img
			id='logo'
			src={logo}
			alt=''
		/>
		</header>
	);
}

export function Nav() {
	return (
		<nav>
			<NavLink exact to='/' className='navItem' activeClassName="navItemActive">
				<div>pomodoro</div>
			</NavLink>

			<NavLink exact to='/shortbreak' className='navItem' activeClassName="navItemActive">
				short break
			</NavLink>

			<NavLink exact to='/longbreak' className='navItem' activeClassName="navItemActive">
				long break
			</NavLink>
		</nav>
	);
}

export function Timer(props) {
	let actionWord = null;
	let action = null;

	if(props.isStarted) {
		actionWord = 'PAUSE';
		action = () => props.pause();
	} else {
		actionWord = 'START';
		action = () => props.start();
	}

	return (
		<div id="progressbarBox">
			<CircularProgressbarWithChildren
				value={ props.currentPercentage }
				text={ getSecondsToClockString(props.fullTime - props.currentTime) }
				strokeWidth={3}
				background
				backgroundPadding={3}
				styles={buildStyles({
					pathColor: window.getComputedStyle(document.getElementsByTagName('body')[0]).getPropertyValue('--theme-color'),
					backgroundColor: '#161932',
					trailColor: 'transparent',
					textColor: '#D7E0FF',
				})}>
				<button onClick={ () => action() } className='startButton'>{actionWord}</button>
			</CircularProgressbarWithChildren>
		</div>
	);
}

function getSecondsToClockString(seconds) {
    if(isNaN(seconds) || seconds === '') {
    	return NaN;
    }

	let minutesPart = parseInt(seconds / 60).toString();
    let secondsPart = (seconds % 60).toString();


    if(secondsPart.length === 1) {
    	if(secondsPart > 0) {
    		secondsPart = "0".concat(secondsPart);
    	} else {
    		secondsPart += '0';
    	}
    }

    return minutesPart + ':' + secondsPart;
}