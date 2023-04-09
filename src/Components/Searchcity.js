import React, { useState } from "react";

import "./search.css";
import Displayweather from "./Displayweather";

export default function Searchcity() {
  const [reponses, setResponse] = useState("");
  const [datas, setdata] = useState();

  const handleClick = () => {
    setResponse("");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f7eb03c643msh2d4f2874340a6d4p140884jsn0213a8463bfb",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000&namePrefix=${reponses}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setdata(response.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="title-card">Weather Finder</h1>
      <div className="content">
        <input
          placeholder="search Location..."
          onChange={(e) => setResponse(e.target.value)}
          className="searchinput"
          value={reponses}
        ></input>
        <button onClick={handleClick} className="searchbutton">
          search
        </button>
      </div>

      {datas ? <Displayweather data={datas} /> : null}
    </div>
  );
}
