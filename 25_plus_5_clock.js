class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        phase: "Session",
        timeLeft: 25 + ":00",
        sessionLength: 25,
        breakLength: 5,
        onOff: "Off"
      };
      this.timer = this.timer.bind(this);
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.reset = this.reset.bind(this);
      this.startStop = this.startStop.bind(this);
    }
  
    // Method to increment the break or session length
    increment(event) {
      if (this.state.onOff === "Off") {
        if (
          event.currentTarget.id === "break-increment" &&
          this.state.breakLength < 60
        ) {
          this.setState({
            breakLength: this.state.breakLength + 1
          });
        } else if (
          event.currentTarget.id === "session-increment" &&
          this.state.sessionLength < 60
        ) {
          this.setState({
            sessionLength: this.state.sessionLength + 1,
            timeLeft:
              (this.state.sessionLength + 1).toString().padStart(2, "0") + ":00"
          });
        }
      }
    }
  
    // Method to decrement the break or session length
    decrement(event) {
      if (this.state.onOff === "Off") {
        if (
          event.currentTarget.id === "break-decrement" &&
          this.state.breakLength > 1
        ) {
          this.setState({
            breakLength: this.state.breakLength - 1
          });
        } else if (
          event.currentTarget.id === "session-decrement" &&
          this.state.sessionLength > 1
        ) {
          this.setState({
            sessionLength: this.state.sessionLength - 1,
            timeLeft:
              (this.state.sessionLength - 1).toString().padStart(2, "0") + ":00"
          });
        }
      }
    }
  
    // Method to reset the clock
    reset() {
      clearInterval(this.myInterval);
      var audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
      this.setState({
        phase: "Session",
        timeLeft: 25 + ":00",
        sessionLength: 25,
        breakLength: 5,
        onOff: "Off"
      });
    }
  
    // Method to start or stop the clock
    startStop() {
      if (this.state.onOff === "Off") {
        this.setState({
          onOff: "On"
        });
        this.myInterval = setInterval(this.timer, 1000);
      } else if (this.state.onOff === "On") {
        this.setState({
          onOff: "Off"
        });
        clearInterval(this.myInterval);
      }
    }
  
    // Method to handle the timer logic
    timer() {
      const timeLeft = this.state.timeLeft;
      const timeLeftArr = timeLeft.split(":").map((x) => parseFloat(x));
      let newTimeLeft;
      var audio = document.getElementById("beep");
  
      if (timeLeftArr[0] === 0 && timeLeftArr[1] === 0) {
        // If time is up
        if (this.state.phase === "Session") {
          // If the current phase is Session, switch to Break phase
          this.setState({
            phase: "Break",
            timeLeft: this.state.breakLength.toString().padStart(2, "0") + ":00"
          });
          audio.play(); // Play the audio clip
        } else {
          // If the current phase is Break, switch to Session phase
          this.setState({
            phase: "Session",
            timeLeft: this.state.sessionLength.toString().padStart(2, "0") + ":00"
          });
          audio.play(); // Play the audio clip
        }
      } else {
        // Decrease the time left by 1 second
        if (timeLeftArr[1] === 0) {
          timeLeftArr[0] = timeLeftArr[0] - 1;
          timeLeftArr[1] = 59;
        } else {
          timeLeftArr[1] = timeLeftArr[1] - 1;
        }
  
        // Format the new time left
        newTimeLeft = timeLeftArr
          .map((x) => x.toString().padStart(2, "0"))
          .join(":");
        this.setState({
          timeLeft: newTimeLeft
        });
      }
    }
  
    render() {
      return (
        <div id="container">
          {/* Audio element for the beep sound */}
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
          
          {/* Clock title */}
          <h2 id="title">25 + 5 Clock</h2>
          
          {/* Break and Session length adjustment */}
          <div id="adjustment-div">
            <div id="break-div">
              <h3 id="break-label">Break Length</h3>
              <div id="break-control">
                <button id="break-decrement" onClick={this.decrement}>
                  <i class="fa-solid fa-arrow-down"></i>
                </button>
                <h3 id="break-length">{this.state.breakLength}</h3>
                <button id="break-increment" onClick={this.increment}>
                  <i class="fa-solid fa-arrow-up"></i>
                </button>
              </div>
            </div>
            <div id="session-div">
              <h3 id="session-label">Session Length</h3>
              <div id="session-control">
                <button id="session-decrement" onClick={this.decrement}>
                  <i class="fa-solid fa-arrow-down"></i>
                </button>
                <h3 id="session-length">{this.state.sessionLength}</h3>
                <button id="session-increment" onClick={this.increment}>
                  <i class="fa-solid fa-arrow-up"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Timer display */}
          <div id="timer-div">
            <h3 id="timer-label">{this.state.phase}</h3>
            <h1 id="time-left">{this.state.timeLeft}</h1>
          </div>
          
          {/* Timer controls */}
          <div id="timer-controls">
            <button id="start_stop" onClick={this.startStop}>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-pause"></i>
            </button>
            <button id="reset" onClick={this.reset}>
              <i class="fa-sharp fa-solid fa-arrow-rotate-left"></i>
            </button>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<Clock />, document.getElementById("app"));
  