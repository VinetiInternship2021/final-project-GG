import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import getUserData from './ProfilePageHelper';
import { mapStateToProps } from '../redux/actions';
import { signParams } from '../utils/configs';
import UpdateHelper from './UpdateHelper';
import ErrorMessages from '../components/layouts/ErrorMessages';
import SettingsHelperFields from './SettingsHelperFields';
import imgUploadHelper from './imgUploadHelper';

const SettingsHelper = ({
  appState, dispatch, modelName, reqKey, driver,
}) => {
  const { userId } = appState;
  const history = useHistory();
  const [state, setState] = useState({
    userId,
    isLoading: true,
    user: {},
    changePassword: false,
  });
  const [fields, setFields] = useState({
    ...signParams,
  });

  const params = {};
  params[reqKey] = { ...fields };

  useEffect(() => {
    if (typeof state.userId === 'number') {
      getUserData({
        state, setState, modelName, dispatch,
      })
        .then(() => {
          setFields(state.user);
        });
    } else {
      setState(
        {
          ...state,
          exist: false,
          isLoading: false,
        },
      );
    }
  }, [state.isLoading, state.changePassword, userId]);

  const onClick = (event, Fields, SetFields, State, Dispatch, History, Params) => {
    const newParams = {};
    Object.keys(Params).forEach((prop) => {
      if (Params[prop]) { newParams[prop] = Params[prop]; }
    });
    UpdateHelper(Fields, SetFields, State, Dispatch, History, newParams);
  };

  return (
    <>
      {typeof state.userId === 'number'
        && (
        <form>
          {fields.alert
            ? (
              <ErrorMessages fields={fields} />
            )
            : false}
          <SettingsHelperFields
            key={fields.phone_number}
            fields={fields}
            state={state}
            driver={driver}
            setFields={setFields}
            onChange={(event) => {
              imgUploadHelper({ event, fields, setFields });
            }}
          />
          { state.changePassword && (
          <div>
            <label htmlFor="password" className="form-label">
              Password
              <br />
              <input
                onChange={(event) => {
                  imgUploadHelper({ event, fields, setFields });
                }}
                id="password"
                type="text"
                className="form-control"
              />
            </label>
            <label htmlFor="password confirmation" className="form-label">
              Password confirmation
              <br />
              <input
                onChange={(event) => {
                  imgUploadHelper({ event, fields, setFields });
                }}
                id="password_confirmation"
                type="text"
                className="form-control"
              />
            </label>
          </div>
          ) }
          <button
            onClick={(e) => {
              onClick(e, fields, setFields, state, dispatch, history, params);
            }}
            type="submit"
            className="btn btn-outline-success mx-3 mb-3"
          >
            Submit
          </button>
          <button
            onClick={() => {
              setState({
                ...state,
                changePassword: !state.changePassword,
              });
            }}
            type="button"
            className="btn btn-outline-success mx-3 mb-3"
          >
            Change password
          </button>
        </form>
        )}
    </>
  );
};

SettingsHelper.defaultProps = {
  driver: false,
};

SettingsHelper.propTypes = {
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  reqKey: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  driver: PropTypes.bool,
};

export default connect(mapStateToProps)(SettingsHelper);
