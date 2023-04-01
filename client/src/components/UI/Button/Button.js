import React from 'react';

import classes from './Button.module.css';
import ThemeContext from '../../../store/theme-context';


const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className} ${classes[React.useContext(ThemeContext).theme]}`}
      onClick={props.onClick}
      disabled={props.isDisabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
