import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text1, text2 }) => {
  return (
    <div className="text-3xl font-bold text-center">
      <span>{text1} </span>
      <span className="text-primary">{text2}</span>
    </div>
  );
};

Title.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default Title;
