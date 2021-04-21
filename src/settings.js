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

export function SelectableCircle(props) {
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

export class TimeSetter extends React.Component { // TODO: maybe add a clue that TimeSetter includes a label
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