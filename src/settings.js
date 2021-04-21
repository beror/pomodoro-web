import React from 'react';

import closeIcon from './images/icon-close.svg';

import { fonts, colorThemes } from './index.js';

export class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFont: fonts.kumbhSans,
			selectedColor: colorThemes.redTheme,
		};
	}

	setActiveFont = (font) => {
		this.setState({selectedFont: font});
	}

	setSelectedColorTheme = (color) => {
		this.setState({selectedColor: color});
	}

	applySettings = () => {
		let pomodoroSeconds = document.getElementById('inputTimer1').value * 60;
		let shortBreakSeconds = document.getElementById('inputTimer2').value * 60;
		let longBreakSeconds = document.getElementById('inputTimer3').value * 60;

		document.getElementsByTagName('body')[0].style.setProperty('--font-family', this.state.selectedFont);
		document.getElementsByTagName('body')[0].style.setProperty('--theme-color', this.state.selectedColor);

		this.props.setPomodoroFullTime(pomodoroSeconds);
		this.props.setShortBreakFullTime(shortBreakSeconds);
		this.props.setLongBreakFullTime(longBreakSeconds);

		document.getElementById('settingsOverlay').style.display = 'none';
	}

	render() {
		return (
				<div id="settingsOverlay">
					<section id="settingsWindow">
						<header id="settingsHeader">
							<span id="settingsLabel">Settings</span>
							<button id="closeSettingsButton" onClick={() => document.getElementById('settingsOverlay').style.display = 'none'}>
								<img src={closeIcon} alt='' />
							</button>
						</header>

						<span className='settingsSectionName'>TIME (MINUTES)</span> {/* TODO: all settings section nams shuold be give the class "settingsSectionName" */}
						<div className='settingsSection'>
							<TimeSetter label='pomodoro' />
							<TimeSetter label='short break' />
							<TimeSetter label='long break' />
						</div>

						<div className='settingsSection'>
							<div className='settingsSectionName'>FONT</div>
							<div style={{display: 'flex', justifyContent: 'space-between', width: '170px'}}>
								<SelectableCircle
									settingState={this.state.selectedFont}
									setSettingState={this.setActiveFont}
									settingStateOption={fonts.kumbhSans}

									circleColor='#EFF1FA'
									innerTextFontFamily={fonts.kumbhSans}
									innerContentClassName='fontSettingCircle'
									hoverClassName='hoverSettingCircle'
									selectedClassName='selectedFontCircle'
								/>
								<SelectableCircle
									settingState={this.state.selectedFont}
									setSettingState={this.setActiveFont}
									settingStateOption={fonts.robotoSlab}

									circleColor='#EFF1FA'
									innerTextFontFamily={fonts.robotoSlab}
									innerContentClassName='fontSettingCircle'
									hoverClassName='hoverSettingCircle'
									selectedClassName='selectedFontCircle'
								/>
								<SelectableCircle
									settingState={this.state.selectedFont}
									setSettingState={this.setActiveFont}
									settingStateOption={fonts.spaceMono}

									circleColor='#EFF1FA'
									innerTextFontFamily={fonts.spaceMono}
									innerContentClassName='fontSettingCircle'
									hoverClassName='hoverSettingCircle'
									selectedClassName='selectedFontCircle'
								/>
							</div>
						</div>

						<div className='settingsSection'>
							<div className='settingsSectionName'>COLOR</div>
							<div style={{display: 'flex', justifyContent: 'space-between', width: '170px'}}>
								<SelectableCircle
									settingState={this.state.selectedColor}
									setSettingState={this.setSelectedColorTheme}
									settingStateOption={colorThemes.redTheme}

									circleColor={colorThemes.redTheme}
									hoverClassName='hoverSettingCircle'
									selectedClassName='selectedColorCircle'
								/>
								<SelectableCircle
									settingState={this.state.selectedColor}
									setSettingState={this.setSelectedColorTheme}
									settingStateOption={colorThemes.lightBlueTheme}

									circleColor={colorThemes.lightBlueTheme}
									hoverClassName='hoverSettingCircle'
									selectedClassName='selectedColorCircle'
								/>
								<SelectableCircle
									settingState={this.state.selectedColor}
									setSettingState={this.setSelectedColorTheme}
									settingStateOption={colorThemes.purpleTheme}

									circleColor={colorThemes.purpleTheme}
									hoverClassName='hoverSettingCircle'
									selectedClassName='selectedColorCircle'
								/>
							</div>
						</div>

						<button id='applySettingsButton' onClick={() => this.applySettings()}>
							Apply
						</button>
					</section>
				</div>
		);
	}
}

function SelectableCircle(props) {
	return (
		<button
			onClick={() => {
				props.setSettingState(props.settingStateOption);
			}}
			className={
				'coloredCircle '
				+ (props.innerContentClassName ?
					props.innerContentClassName + ' ' : '')
				+ (props.hoverClassName ?
					props.hoverClassName + ' ' : '')
				+ (props.settingState === props.settingStateOption ?
					props.selectedClassName + ' ' : '')
			}
			style={{backgroundColor: props.circleColor, fontFamily: props.innerTextFontFamily}}
		>
		</button>
	);
}

class TimeSetter extends React.Component { // TODO: maybe add a clue that TimeSetter includes a label
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
		TimeSetter.instanceCount = (TimeSetter.instanceCount === 0) ? 0 : (TimeSetter.instanceCount || 0) + 1;
		this.instanceNumber = TimeSetter.instanceCount;
		/* instanceNumber fixes instanceCount for the instance.
		Needed because instanceCount changes as new instances are created
		and cannot be used to rerender elements that use it to set its ID
		*/
	}

	render() {
		return (
			<div className='timeSetter'>
				<label htmlFor={'inputTimer' + this.instanceNumber} className='inputTimerLabel'>{this.props.label}</label> { /* should input be renamed to "timerInput"? */ }
				<div className='inputTimerBox'>
					<input
						id={'inputTimer' + this.instanceNumber}
						type='text'
						value={this.state.value} 
						readOnly
						className='inputTimer'
					/>

					<div>
						<button onClick={() => this.setState({value: this.state.value + 1,})} className='IncremDecremBtn'>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="7">
								<path
									fill="none"
									stroke="#1E213F"
									strokeOpacity=".25"
									strokeWidth="2.5"
									d="M1 6l6-4 6 4"/>
							</svg>
						</button>
						<button onClick={() => {
							if(this.state.value - 1 >= 0) {
								this.setState({value: this.state.value - 1,})
							}
						}} className='IncremDecremBtn'>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="7">
								<path
									fill="none"
									stroke="#1E213F"
									strokeOpacity=".25"
									strokeWidth="2.5"
									d="M1 1l6 4 6-4"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export function SettingsButton() {
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