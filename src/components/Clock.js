import React, {useState, useEffect} from 'react';

export function ClockToggle (props){
  return (
    <button 
      type="button"
      className="clock-toggle" 
      onClick={props.toggleClock}
    >
      Toggle Clock
    </button>
  )
  
} 

function Clock (props){
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     time: new Date(),
  //   };
  // }
  const [time, setTime] = useState(new Date());
  
  // componentDidMount() {
  //   this.interval = setInterval(this.tick, 1000);
  // }

  useEffect(()=>{
    const interval = setInterval(tick, 1000);
    return ()=>{
      clearInterval(interval);
      // console.log("cleared interval! interval clearing! wow!")
    }
  }, [])
  
  // componentWillUnmount() {
  //   console.log("Clearing Clock interval!")
  //   clearInterval(this.interval);
  // }

  
  
  const tick = () => {
    setTime(new Date());
  }

  // render() {
    // let hours = this.state.time.getHours();
    // let minutes = this.state.time.getMinutes();
    // let seconds = this.state.time.getSeconds();
    // hours = (hours < 10) ? `0${hours}` : hours;
    // minutes = (minutes < 10) ? `0${minutes}` : minutes;
    // seconds = (seconds < 10) ? `0${seconds}` : seconds;

    const timezone = time
      .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
      .replace(/[^A-Z]/g, "") // Strip out all but capitals
      .slice(3); // Eliminate initial GMT

    return (
      <section className="clock-section">
        <h1>Clock</h1>
        <div className='clock'>
          <p>
            <span>
              Time:
            </span>
            <span>
              {time.getHours()}:{time.getMinutes()}:{time.getSeconds()} {timezone}
            </span>
          </p>
          <p>
            <span>
              Date: 
            </span>
            <span>
              {time.toDateString()}
            </span>
          </p>
        </div>
      </section>
    );
  // }
}

export default Clock;