import React from 'react';
import ReactDOM from 'react-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import { Settings } from './settings.js';

import './scss/index.scss';

import logo from './images/logo.svg';

export const fonts = {
	kumbhSans: 'Kumbh Sans',
	robotoSlab: 'Roboto Slab',
	spaceMono: 'Space Mono',
};

export const colorThemes = { // TODO: colorTheme(s) should be theme(s)Color in some places
	redTheme: '#F87070',
	lightBlueTheme: '#70F3F8',
	purpleTheme: '#D881F8',
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pomodoroFullTime: 60 * 25,
			pomodoroCurrentTime: 0,
			pomodoroCurrentPercentage: 0,
			isPomodoroStarted: false,

			shortBreakFullTime: 60 * 5,
			shortBreakCurrentTime: 0,
			shortBreakCurrentPercentage: 0,
			isShortBreakStarted: false,

			longBreakFullTime: 60 * 15,
			longBreakCurrentTime: 0,
			longBreakCurrentPercentage: 0,
			isLongBreakStarted: false,
		};
		this.pomodoroSecondTicker = null;
		this.pomodoroMinuteTicker = null;
		this.shortBreakSecondTicker = null;
		this.shortBreakMinuteTicker = null;
		this.longBreakSecondTicker = null;
		this.longBreakMinuteTicker = null;
	}

	setPomodoroFullTime = (seconds) => {
		clearInterval(this.pomodoroSecondTicker);
		this.setState({isPomodoroStarted: false});
		this.setState({pomodoroCurrentTime: 0});
		this.setState({pomodoroCurrentPercentage: 0});

		this.setState({pomodoroFullTime: seconds});
	}

	startPomodoro = () => {
		if(!this.state.isPomodoroStarted) {
			this.setState({isPomodoroStarted: true});

			let startTime = Math.round(Date.now() / 1000) - this.state.pomodoroCurrentTime;
			// this subtraction prevents skipping time that elapsed after pause after resume
			// I don't fully understand why

			this.pomodoroSecondTicker = setInterval(() => {
				let currentTime = Math.round(Date.now() / 1000) - startTime;
				this.setState({pomodoroCurrentTime: currentTime});

				if(currentTime === this.state.pomodoroFullTime) {
					clearInterval(this.pomodoroSecondTicker);
				}
			}, 1 * 100); // 100 because it allows to include ms differences between pauses

			this.pomodoroMinuteTicker = setInterval(() => {
				this.setState({
					pomodoroCurrentPercentage: (this.state.pomodoroCurrentTime / this.state.pomodoroFullTime) * 100,
				});

				if(this.state.pomodoroCurrentPercentage >= 100) {
					clearInterval(this.pomodoroMinuteTicker);
				}
			}, 1 * 100);
		}
	}

	pausePomodoro = () => {
		clearInterval(this.pomodoroSecondTicker);
		clearInterval(this.pomodoroMinuteTicker);
		this.setState({isPomodoroStarted: false});
	}


	setShortBreakFullTime = (seconds) => {
		clearInterval(this.shortBreakSecondTicker);
		this.setState({isShortBreakStarted: false});
		this.setState({shortBreakCurrentTime: 0});
		this.setState({shortBreakCurrentPercentage: 0});

		this.setState({shortBreakFullTime: seconds});
	}

	startShortBreak = () => {
		if(!this.state.isShortBreakStarted) {
			this.setState({isShortBreakStarted: true});

			let startTime = Math.round(Date.now() / 1000)  - this.state.shortBreakCurrentTime;

			this.shortBreakSecondTicker = setInterval(() => {
				let currentTime = Math.round(Date.now() / 1000) - startTime;
				this.setState({shortBreakCurrentTime: currentTime});

				if(currentTime === this.state.shortBreakFullTime) {
					clearInterval(this.shortBreakSecondTicker);
				}
			}, 1 * 100);

			this.shortBreakMinuteTicker = setInterval(() => {
				this.setState({
					shortBreakCurrentPercentage: (this.state.shortBreakCurrentTime / this.state.shortBreakFullTime) * 100,
				});

				if(this.state.shortBreakCurrentPercentage >= 100) {
					clearInterval(this.shortBreakMinuteTicker);
				}
			}, 1 * 100);
		}
	}

	pauseShortBreak = () => {
		clearInterval(this.shortBreakSecondTicker);
		clearInterval(this.shortBreakMinuteTicker);
		this.setState({isShortBreakStarted: false});
	}


	setLongBreakFullTime = (seconds) => {
		clearInterval(this.longBreakSecondTicker);
		this.setState({isLongBreakStarted: false});
		this.setState({longBreakCurrentTime: 0});
		this.setState({longBreakCurrentPercentage: 0});

		this.setState({longBreakFullTime: seconds});
	}

	startLongBreak = () => {
		if(!this.state.isLongBreakStarted) {
			this.setState({isLongBreakStarted: true});

			let startTime = Math.round(Date.now() / 1000) - this.state.longBreakCurrentTime;

			this.longBreakSecondTicker = setInterval(() => {
				let currentTime = Math.round(Date.now() / 1000) - startTime;
				this.setState({longBreakCurrentTime: currentTime});

				if(currentTime === this.state.longBreakFullTime) {
					clearInterval(this.longBreakSecondTicker);
				}
			}, 1 * 100);

			this.longBreakMinuteTicker = setInterval(() => {
				this.setState({
					longBreakCurrentPercentage: (this.state.longBreakCurrentTime / this.state.longBreakFullTime) * 100,
				});

				if(this.state.longBreakCurrentPercentage >= 100) {
					clearInterval(this.longBreakMinuteTicker);
				}
			}, 1 * 100);
		}
	}

	pauseLongBreak = () => {
		clearInterval(this.longBreakSecondTicker);
		clearInterval(this.longBreakMinuteTicker);
		this.setState({isLongBreakStarted: false});
	}

	render() {
		return (
			<HashRouter>
				<Header />
				<Nav />

				<Route exact path='/'
					children={<Timer
						fullTime={this.state.pomodoroFullTime}
						currentTime={this.state.pomodoroCurrentTime}
						currentPercentage={this.state.pomodoroCurrentPercentage}
						start={this.startPomodoro}
						pause={this.pausePomodoro}
						isStarted={this.state.isPomodoroStarted}
						/>}
				/>
				<Route exact path='/shortbreak'
					children={<Timer
						fullTime={this.state.shortBreakFullTime}
						currentTime={this.state.shortBreakCurrentTime}
						currentPercentage={this.state.shortBreakCurrentPercentage}
						start={this.startShortBreak}
						pause={this.pauseShortBreak}
						isStarted={this.state.isShortBreakStarted}
						/>}
				/>
				<Route exact path='/longbreak'
					children={<Timer
						fullTime={this.state.longBreakFullTime}
						currentTime={this.state.longBreakCurrentTime}
						currentPercentage={this.state.longBreakCurrentPercentage}
						start={this.startLongBreak}
						pause={this.pauseLongBreak}
						isStarted={this.state.isLongBreakStarted}
						/>}
				/>

				<SettingsButton />

				<Settings
					fullTime={this.state.pomodoroFullTime}
					setPomodoroFullTime={this.setPomodoroFullTime}
					setShortBreakFullTime={this.setShortBreakFullTime}
					setLongBreakFullTime={this.setLongBreakFullTime}
				/>
			</HashRouter>
		);
	}
}

function Header() {
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

function Nav() {
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

function Timer(props) {
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

function SettingsButton() {
	return (
		<button id='settingsButton' onClick={() => document.getElementById('settingsOverlay').style.display = 'flex'}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28">
				<path
					fill="#D7E0FF"
					d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
					opacity=".5"
				/>
			</svg>
		</button>
	);
}

// window.history.pushState('jhvjhv', '/pomodoro');
ReactDOM.render(<App />, document.getElementById('root'));

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