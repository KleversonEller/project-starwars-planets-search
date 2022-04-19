import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './planetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    const getPlanets = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataFetch = await result.json();
      const handleData = await dataFetch.results;
      setData(handleData);
    };
    getPlanets();
  }, []);

  const contextValue = { data, setFilterByName, filterByName, setData };

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
