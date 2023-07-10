import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NAVBAR':
      return true;
    case 'HIDE_NAVBAR':
      return false;
    default:
      return state;
  }
};

const DontShowSearchBar = ({ children }) => {
  const location = useLocation();

  const [showNavBar, dispatch] = useReducer(reducer, true);

  useEffect(() => {
    console.log('this is location:', location);
    if (location.pathname === '/signing') {
        
   // if (location.pathname === '/signing' || 'header') {
   // if do like that i will hide the header its nice but this is
   // not the solution

      dispatch({ type: 'HIDE_NAVBAR' });
    } else {
      dispatch({ type: 'SHOW_NAVBAR' });
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
};

export default DontShowSearchBar;



// this function will do the same thing as theone on top


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const DontShowSearchBar = ({ children }) => {
//   const location = useLocation();

//   const [showNavBar, setShowNavBar] = useState(false);

//   useEffect(() => {
//     console.log('this is location:', location);
//     if (location.pathname === '/signing') {

//         // if (location.pathname === '/signing' || 'header') {
//         // if do like that i will hide the header its nice but this is
//         // not the solution

//       setShowNavBar(false);
//     } else {
//       setShowNavBar(true);
//     }
//   }, [location]);

//   return <div>{showNavBar && children}</div>;
// };

// export default DontShowSearchBar;
