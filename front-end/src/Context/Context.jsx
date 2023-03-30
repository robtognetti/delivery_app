import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();
function Provider({ children }) {
  const [update, setUpdate] = useState(false);

  const context = useMemo(
    () => ({
      update,
      setUpdate,
    }),
    [update],
  );

  Provider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}
export default Provider;
