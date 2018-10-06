import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);


const Div = ({children, ...rest}) => <div {...rest}>{children}</div>
const Button = ({
  to, disabled, onClick, theme = 'default', children, removeid, id
}) => {

  const Element = (to && !disabled) ? Link : Div;
  return (
    <Element
      to={to}
      className={cx('button', theme, { disabled })}
      onClick={disabled ? () => null : onClick}
      removeid={removeid}
      id={id}
      >
      {children}
    </Element>
  );
}

export default Button;