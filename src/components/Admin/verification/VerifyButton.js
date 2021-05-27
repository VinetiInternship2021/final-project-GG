import React from 'react';
import PropTypes from 'prop-types';

const VerifyButton = ({ onClick, text }) => (
  <button
    className="verifyButton badge"
    onClick={onClick}
    type="submit"
  >
    {text}
  </button>
);

VerifyButton.defaultProps = {
  text: 'Undefined',
};

VerifyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default VerifyButton;
