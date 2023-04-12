import { useState, useEffect } from "react";
import { TimerInterface } from "../../models/models";
import "../../scss/components/timer.scss";

function Timer() {
  const [time, setTime] = useState(new Date());
  const [timerData, setTimerData] = useState<TimerInterface>({
    days: [0, 0],
    hours: [0, 0],
    minutes: [0, 0],
    seconds: [0, 0],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem("time") != "null") {
        const difference =
          JSON.parse(localStorage.getItem("time")) - Date.now();
        if (difference > 0) {
          const differenceDate = new Date(difference);
          const secondsData = differenceDate.getUTCSeconds();
          const minutesData = differenceDate.getUTCMinutes();
          const hoursData = differenceDate.getUTCHours();
          const daysData = Math.floor(difference / (1000 * 60 * 60 * 24));

          setTimerData({
            days: [Math.floor(daysData / 10), daysData % 10],
            hours: [Math.floor(hoursData / 10), hoursData % 10],
            minutes: [Math.floor(minutesData / 10), minutesData % 10],
            seconds: [Math.floor(secondsData / 10), secondsData % 10],
          });
        }
      } else {
        setTimerData({
          days: [0, 0],
          hours: [0, 0],
          minutes: [0, 0],
          seconds: [0, 0],
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0].value == 0) {
      localStorage.setItem(
        "time",
        JSON.stringify(
          Date.parse(
            new Date(Date.now()).toDateString() + " " + e.target[1].value
          )
        )
      );
    } else {
      localStorage.setItem(
        "time",
        JSON.stringify(Date.parse(e.target[0].value + " " + e.target[1].value))
      );
    }
  }

  return (
    <div className="timer">
      <form className="timer-timeset" onSubmit={handleSubmit}>
        <div>
          <input className="timer-timeset__date" type={"date"}></input>
          <input className="timer-timeset__time" type={"time"}></input>
        </div>
        <button className="timer-timeset__submit" type={"submit"}>
          SET TIMER
        </button>
      </form>
      <div className="timer-output">
        <div className="timer-output__number">
          {timerData.days}
          <span>days</span>
        </div>
        <div className="timer-output__number">
          {timerData.hours}
          <span>hours</span>
        </div>
        <div className="timer-output__number">
          {timerData.minutes}
          <span>minutes</span>
        </div>
        <div className="timer-output__number">
          {timerData.seconds}
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
}
export default Timer;
