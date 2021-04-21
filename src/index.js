import React from 'react';
import ReactDOM from 'react-dom';
import 'react-circular-progressbar/dist/styles.css';
import { Route, HashRouter } from 'react-router-dom';

import { Header, Nav, Timer } from './mainComponents.js';
import { Settings, SettingsButton } from './settings.js';

import './scss/index.scss';

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

ReactDOM.render(<App />, document.getElementById('root'));