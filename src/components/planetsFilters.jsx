import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

const Filters = () => {
  const { setFilterByName, data, setData } = useContext(PlanetsContext);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filters, setFilters] = useState({ column: 'population',
    comparison: 'maior que',
    value: 0 });

  useEffect(() => {
    const attOptions = () => {
      setFilters({ column: options[0],
        comparison: 'maior que',
        value: 0 });
    };
    attOptions();
  }, [options]);

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
    setOptions(options.filter((opition) => opition !== column));
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
        {options.map((opition) => (
          <option
            key={ opition }
            value={ opition }
          >
            { opition }
          </option>))}
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
