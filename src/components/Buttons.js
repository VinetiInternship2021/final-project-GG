import React from 'react';
import PropTypes from 'prop-types';

export const PageButton = (props) => {
  const {
    button, onSelect, buttonClassName, className,
  } = props;
  return (
    <button
      key={button}
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
        ) : ''}
        {' '}
        {button}
      </div>
    </button>
  );
};

export const HeaderButton = (props) => {
  const {
    key, onSelect, button, className,
  } = props;
  return (
    <button
      key={key}
      onClick={(event) => onSelect(event, button)}
      className={`btn btn-outline-success me-1 ${className}`}
      type="submit"
    >
      {button}
    </button>
  );
};

PageButton.propTypes = {
  button: PropTypes.element.isRequired,
  onSelect: PropTypes.element.isRequired,
  buttonClassName: PropTypes.element.isRequired,
  className: PropTypes.element.isRequired,
};

HeaderButton.propTypes = {
  key: PropTypes.element.isRequired,
  button: PropTypes.element.isRequired,
  onSelect: PropTypes.element.isRequired,
  className: PropTypes.element.isRequired,
};
