import React from "react";
import WeatherDetails from "../components/WeatherDeatils";

const countryFullData = (countries) => {
  return countries.map((item) => (
    <React.Fragment key={`${item.iso639_1}-${item.name}`}>
      <h2>{item.name}</h2>
      <p>Capital: {item.capital}</p>
      <p>Population: {item.population}</p>
      {item.languages && (
        <>
          <p>Languages:</p>
          <ul>
            {item.languages.map((item) => (
              <li key={`${item.iso639_1}-${item.name}`}>{item.name}</li>
            ))}
          </ul>
          <img width="100" src={item.flag} alt={item.name} />
        </>
      )}
      {<WeatherDetails city={item.name} />}
    </React.Fragment>
  ));
};

function CountryDetails(props) {
  const { countries, onButtonClick } = props;

  const handleShowClick = (item) => {
    if (onButtonClick) {
      onButtonClick(item);
    }
  };

  const showCountries = (item) => {
    const countryArrayLength = item.length;
    if (countryArrayLength === 1) {
      return countryFullData(item);
    }
    if (countryArrayLength > 10) {
      return <p>To many matches, specify another filter.</p>;
    }
    if (countryArrayLength === 0) {
      return <p>No results found.</p>;
    }
    return countryList(item);
  };

  const countryList = (countries) => {
    return countries.map((item) => (
      <h3 key={`${item.iso639_1}-${item.name}`}>
        {item.name}
        <button onClick={handleShowClick.bind(null, item.name)}>Show</button>
      </h3>
    ));
  };

  return showCountries(countries);
}

export default CountryDetails;
