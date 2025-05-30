import React from 'react';
import './styles.css';

const Button = ({text}) => {
  return (
    <div className="styled-wrapper">
      <button>
       {text}
      </button>
    </div>
  );
};

export default Button;