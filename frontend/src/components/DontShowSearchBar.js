import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DontShowSearchBar = ({ children }) => {
  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    console.log('this is location:', location);
    if (location.pathname === '/signing') {

        // if (location.pathname === '/signing' || 'header') {
        // if do like that i will hide the header its nice but this is
        // not the solution

      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
};

export default DontShowSearchBar;
