import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

const Filters = () => {
  const { setFilterByName, data, setData } = useContext(PlanetsContext);
  const [filters, setFilters] = useState({ column: 'population',
    comparison: 'maior que',
    value: 0 });

  const handleInput = (event) => {
    const name = event.target.value;
    setFilterByName({ name });
  };

  const handleFilters = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClick = () => {
    const { column, comparison, value } = filters;
    switch (comparison) {
    case 'maior que':
      return setData(data.filter((planet) => +planet[column] > +value));
    case 'menor que':
      return setData(data.filter((planet) => +planet[column] < +value));
    case 'igual a':
      return setData(data.filter((planet) => +planet[column] === +value));
    default:
      return data;
    }
  };

  return (
    <form>
      <input
        onChange={ handleInput }
        placeholder="Planet Name"
        data-testid="name-filter"
        type="text"
      />
      <select
        onChange={ handleFilters }
        name="column"
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        onChange={ handleFilters }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        onChange={ handleFilters }
        placeholder="Value"
        data-testid="value-filter"
        type="number"
        value={ filters.value }
      />
      <button
        data-testid="button-filter"
        onClick={ handleClick }
        type="button"
      >
        Filter
      </button>
    </form>
  );
};

export default Filters;
