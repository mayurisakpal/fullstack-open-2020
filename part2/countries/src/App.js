import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CoutryDetails";
import Filter from "../src/components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, SetSearchTerm] = useState("");
  const handleFilterChange = (event) => SetSearchTerm(event.target.value);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.warn(error));
  }, []);

  const resultCountries = () =>
    countries.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleShowClick = (city) => {
    SetSearchTerm(city);
  };

  return (
    <>
      <Filter onChange={handleFilterChange} value={searchTerm} />
      {searchTerm && (
        <CountryDetails
          onButtonClick={handleShowClick}
          countries={resultCountries()}
        />
      )}
    </>
  );
}

export default App;
