import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutesCount: 25 * 60,
    isClicked: true,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onIncrease = () => {
    this.setState(prevState => ({minutesCount: prevState.minutesCount + 60}))
  }

  onDecrease = () => {
    this.setState(prevState => ({minutesCount: prevState.minutesCount - 60}))
  }

  onReset = () => {
    this.setState({minutesCount: 25 * 60})
    clearInterval(this.timerId)
  }

  tick = () => {
    this.setState(prevState => ({minutesCount: prevState.minutesCount - 1}))
  }

  onStartPause = () => {
    const {isClicked} = this.state
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
    if (isClicked === true) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  showMinutes = () => {
    const {minutesCount} = this.state
    const minutes = Math.floor(minutesCount / 60)
    if (minutes > 10) {
      return minutes
    }
    return `0${minutes}`
  }

  showSeconds = () => {
    const {minutesCount} = this.state
    const seconds = Math.floor(minutesCount % 60)
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  render() {
    const {isClicked} = this.state
    const startPause = isClicked ? 'Start' : 'Pause'
    const startPauseImages = isClicked
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const changingText = isClicked ? 'Paused' : 'Running'
    const altText = isClicked ? 'play icon' : 'pause icon'

    console.log(this.showMinutes())

    const timerValue = `${this.showMinutes()}:${this.showSeconds()}`

    return (
      <div className="bg-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="row-styling">
          <div className="card-image">
            <div className="timer-container">
              <h1 className="time-heading">{timerValue}</h1>
              <p className="time-description">{changingText}</p>
            </div>
          </div>

          <div className="row-styling">
            <button
              type="button"
              className="button"
              onClick={this.onStartPause}
            >
              <img
                src={startPauseImages}
                className="custom-icons"
                alt={altText}
              />
              <p className="icons-description">{startPause}</p>
            </button>

            <button type="button" className="button" onClick={this.onReset}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                className="custom-icons"
                alt="reset icon"
              />
              <p className="icons-description">Reset</p>
            </button>
          </div>

          <div>
            <p className="set-timer-heading">Set Timer Limit</p>
            <div className="styling">
              <button
                type="button"
                className="custom-buttons"
                onClick={this.onDecrease}
              >
                -
              </button>
              <p className="count-heading">{this.showMinutes()}</p>
              <button
                type="button"
                className="custom-buttons"
                onClick={this.onIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
