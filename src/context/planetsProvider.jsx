import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './planetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataFetch = await result.json();
      setData(dataFetch.results);
    };
    getPlanets();
  }, []);

  const contextValue = { data };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default Provider;
