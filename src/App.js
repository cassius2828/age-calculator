import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function App() {
  // todays date
  const date = new Date();

  // regex
  const regex = /\D/g;

  // top display state
  const [calMonth, setCalMonth] = useState("MM");
  const [calDay, setCalDay] = useState("DD");
  const [calYear, setCalYear] = useState("YYYY");
  // bottom display state
  const [years, setYears] = useState("--");
  const [months, setMonths] = useState("--");
  const [days, setDays] = useState("--");

  // total display

  const [total, setTotal] = useState("");

  //  action event function
  const getAge = () => {
    let dateEntry = document.getElementById("dateEntry");
    setTotal(dateEntry.value);

    let splitDates = total.split(regex);
    // let totalDate = new Date(total);
    // setting dates
    // * parse are for strings entered in input
    setCalDay(Number.parseFloat(splitDates[1]));
    setCalMonth(Number.parseFloat(splitDates[0]));
    setCalYear(Number.parseFloat(splitDates[2]));

    // calculation logic below
    let by = calYear,
      bm = calMonth,
      bd = calDay,
      ty = date.getFullYear(),
      tm = date.getMonth() + 1,
      td = date.getDate();

    //* does not allow future dates to be entered
    if (ty < by) {
      setYears(-1);
      setMonths(-1);
      setDays(-1);
      return;
    } else if (tm < bm && ty <= by) {
      setYears(-1);
      setMonths(-1);
      setDays(-1);
      return;
    } else if (td < bd && tm <= bm && ty <= by) {
      setYears(-1);
      setMonths(-1);
      setDays(-1);
      return;
    }
    // remaining date calculation logic
    if (td < bd && tm - bm > 0) {
      setDays(td - bd + 30);
      tm = tm - 1;
    } else if (td < bd && tm - bm <= 0) {
      setDays(td - bd + 30);
    } else if (td < bd) {
      setDays(bd - td);
    } else {
      setDays(td - bd);
    }
    if (tm < bm) {
      setMonths(tm - bm + 12);
    } else {
      setMonths(tm - bm);
    }

    if (ty === by) {
      setYears(0);
    } else if (ty > by && months > 10) {
      setYears(ty - by - 1);
    } else {
      setYears(ty - by);
    }
  };

  //? currently this runs continuously so that the button renders the results on one click,
  //? I understand this can cause performance issues on large scale projects
  //? I am currently trying to figure out a way to render all actions on a single click while not running a
  //? useEffect continously without dependencies
  useEffect(() => {
    getAge();
  });

  return (
    <div className="App">
      <input
        placeholder="ex: 12/03/1997"
        className="top-dates"
        id="dateEntry"
        type="text"
        minLength={10}
        maxLength={10}
      />
      <div className="main-container">
        <Dates
          calDay={calDay}
          calMonth={calMonth}
          calYear={calYear}
          days={days}
          months={months}
          years={years}
          handleClick={getAge}
          blank="--"
          date={date}
        />
      </div>
    </div>
  );
}

export default App;

export const Dates = ({
  calDay,
  calMonth,
  calYear,
  days,
  months,
  years,
  handleClick,
  blank,
  date,
}) => {
  return (
    <>
      {/* top container */}
      <div className="top-container">
        <div className="col">
          <p>month</p>
          <div>{calMonth ? calMonth : "--"}</div>
        </div>
        <div className="col">
          <p>day</p>
          <div>{calDay ? calDay : "--"}</div>
        </div>
        <div className="col">
          <p> year </p>
          <div>{calYear ? calYear : "--"}</div>
        </div>
      </div>
      {/* middle container */}
      <div className="middle">
        <hr></hr>
        <FontAwesomeIcon
          onClick={handleClick}
          className="icon"
          size="3x"
          icon={faArrowAltCircleDown}
        />
      </div>
      {/* bottom container */}
      <div className="bottom-container">
        {/* //* this logic controls user input to ensure accurate dates have been recorded */}
        {calYear > date.getFullYear() ? (
          <h1>
            You haven't been born yet... unless you are a time traveler! O_o
          </h1>
        ) : calDay > 31 || calMonth > 12 ? (
          <h1>That is not a real date my friend :/</h1>
        ) : (
          <>
            {/*//* dashes to fill space before numbers are entered */}
            <h1>
              <span>{years >= 0 ? years : blank} </span>
              years
            </h1>
            <h1>
              <span>{months >= 0 ? months : blank} </span>
              months
            </h1>
            <h1>
              <span>{days >= 0 ? days : blank} </span>
              days
            </h1>
          </>
        )}
      </div>
    </>
  );
};
