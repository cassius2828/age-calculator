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

    setCalDay(splitDates[1]);
    setCalMonth(splitDates[0]);
    setCalYear(splitDates[2]);

    // calculation logic
    // * parse are for strings entered in input
    // * for todays times we dont need to parse bc they are integers
    let by = Number.parseFloat(calYear),
      bm = Number.parseFloat(calMonth),
      bd = Number.parseFloat(calDay),
      ty = date.getFullYear(),
      tm = date.getMonth() + 1,
      td = date.getDate();
// ! affected area #1
    if (td < bd 
      // && td - bd > 0
      ) {
      setDays(td - bd + 30);
      tm = tm - 1;
    } else {
      setDays(td - bd);
      // ty = ty - 1;
    }
    if (tm < bm 
      // && tm - bm > 0
      ) {
      setMonths(tm - bm + 12);
    } else {
      setMonths(tm - bm);
    }
    setYears(ty - by);
  };

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
}) => {
  return (
    <>
      <div className="top-container">
        <div className="col">
          <p>month</p>
          <div>{calMonth}</div>
        </div>
        <div className="col">
          <p>day</p>
          <div>{calDay}</div>
        </div>
        <div className="col">
          <p> year </p>
          <div>{calYear}</div>
        </div>
      </div>

      <div className="middle">
        <hr></hr>
        <FontAwesomeIcon
          onClick={handleClick}
          className="icon"
          size="3x"
          icon={faArrowAltCircleDown}
        />
      </div>
      <div className="bottom-container">
        {/* this logic controls user input to ensure accurate dates have been recorded */}
        {/* // ! affected area #2 */}
        {years < 0 && days < 0 && months < 0 ? (
          <h1 style={{ margin: "6rem" }}>You haven't been born yet silly :P</h1>
        ) : calDay > 31 || calMonth > 12 ? (
          <h1 style={{ margin: "6rem" }}>
            That is not a real date my friend :/
          </h1>
        ) : (
          <>
            {/* // ! affected area #3 */}

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
