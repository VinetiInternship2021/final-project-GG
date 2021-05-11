import React from 'react';
import PropTypes from 'prop-types';

export const PageButton = ({
  button, onSelect, buttonClassName, className,
}) => (
  <button
    key={button}
    data-name={button}
    onClick={(event) => onSelect(event)}
    className={`btn btn-outline-success me-1 user-page ${buttonClassName}`}
    type="submit"
  >
    {' '}
    <div>
      {className ? (
        <div>
          <i
            key={button}
            className={className}
          />
        </div>
      ) : <></>}
      {' '}
      {button}
    </div>
  </button>
);

export const HeaderButton = ({
  onSelect, button, className,
}) => (
  <button
    key={button}
    data-name={button}
    onClick={(event) => onSelect(event, button)}
    className={`btn btn-outline-success me-1 ${className}`}
    type="submit"
  >
    {button}
  </button>
);

PageButton.propTypes = {
  button: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

HeaderButton.propTypes = {
  button: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
