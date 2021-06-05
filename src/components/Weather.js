import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import languages from "./languages";
import creds from "./creds.json";

function Weather() {
  const [dataAll, setData] = useState({});
  const [base, setBase] = useState({});
  const [cords, setCords] = useState({});
  const [search, setSearch] = useState();
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [lang, setLang] = useState("en");
  const [showDaily, setShowDaily] = useState(false);
  const [showHourly, setShowHourly] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=${lang}&appid=${creds.api}`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(displayCoords);
    } else {
      alert("Enter a valid location");
    }
  };

  function displayCoords(res) {
    setCords(res.coord);
    setBase(res);
    console.log(cords);
    console.log(base);
  }

  const api = creds.api;
  const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?";

  function displayResults(res) {
    setData(res);
    setHourly(dataAll.hourly);
    setDaily(res.daily);
    console.log(res);
    console.log(hourly);
    console.log(daily);
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function displayDay(d) {
    var date = new Date(d * 1000);
    return days[date.getDay()];
  }

  function displayTime(d) {
    var date = new Date(d * 1000);
    var hrs = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime = hrs + ":" + minutes.toFixed();

    return formattedTime;
  }

  function displayDate(d) {
    var date = new Date(d * 1000);
    var years = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();

    var formattedDate = day + " " + month + " " + years;
    return formattedDate;
  }

  return (
    <div className="weather">
      <div className="weather-container">
        <div className="weather-search">
          <form onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter a location"
            />
            <select
              onChange={(e) => setLang(e.target.value)}
              defaultValue={lang}
            >
              {languages.map((langs) => (
                <option value={langs.code}>{langs.name}</option>
              ))}
            </select>
            <button onClick={handleSubmit} type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="weather-current">
          <h4>
            {base.name}, {base.sys?.country}
          </h4>
          <small>{displayDate(base.dt)}</small>
          <div className="weather-info">
            <div className="weather-icon">
              <img
                src={
                  base?.weather &&
                  `https://openweathermap.org/img/wn/${base?.weather[0]?.icon}@2x.png`
                }
                alt=""
              />
            </div>
            <div className="weather-temp">
              <p>
                {(((parseInt(base.main?.temp) - (273.15))*9/5)+32).toFixed()}
                <sup>°F</sup>
              </p>
              <small>
                Real feel{" "}
                <span>
                  {(((parseInt(base.main?.temp) - (273.15))*9/5)+32).toFixed()}°F ,{" "}
                  {base.weather && base.weather[0]?.description}
                </span>
              </small>
            </div>
            <div className="weather-min-max">
              <div className="weather-max">
                <ArrowDropUpIcon />
                <p>
                  {(((parseInt(base.main?.temp) - (273.15))*9/5)+32).toFixed()}
                  <sup>°F</sup>
                </p>
              </div>
              <div className="weather-max">
                <ArrowDropDownIcon />
                <p>
                  {(((parseInt(base.main?.temp) - (273.15))*9/5)+32).toFixed()}
                  <sup>°F</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
