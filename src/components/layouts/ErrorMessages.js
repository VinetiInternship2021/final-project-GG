import React from 'react'

const ErrorMessages = (props) => {
  const Errors = props.Errors
  return (
            <div>
              {Errors ? <div id="error_explanation">
                  <div className="alert alert-danger"> Found {Errors.length} errors </div>
                    <ul>
                      {Errors.map((error) => {
                        <li>{error}</li>
                      })}
                    </ul>
                </div>
                : ''}
            </div>
  )
}
export default ErrorMessages