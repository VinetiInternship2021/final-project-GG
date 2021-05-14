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

const SettingsHelper = ({
  appState, dispatch, modelName, reqKey, driver,
}) => {
  const { userId } = appState;
  const history = useHistory();
  const [state, setState] = useState({
    userId,
    isLoading: true,
    user: {},
  });
  const [fields, setFields] = useState({
    ...signParams,
  });

  const params = {};
  params[reqKey] = { ...fields };

  useEffect(() => {
    getUserData({
      state, setState, modelName, dispatch,
    })
      .then(() => {
        setFields(state.user);
      });
  }, [state.isLoading]);

  const onChange = (event) => {
    const parameter = {
      ...fields,
      alert: '',
    };
    parameter[event.target.id] = event.target.value;
    setFields(parameter);
  };

  const onClick = (event, Fields, SetFields, State, Dispatch, History, Params) => {
    const newParams = {};
    Object.keys(Params).forEach((prop) => {
      if (Params[prop]) { newParams[prop] = Params[prop]; }
    });
    UpdateHelper(Fields, SetFields, State, Dispatch, History, newParams);
  };

  return (
    <>
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
          onChange={onChange}
        />
        <button
          onClick={(e) => {
            onClick(e, fields, setFields, state, dispatch, history, params);
          }}
          type="submit"
          className="btn btn-outline-success mx-3 mb-3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

SettingsHelper.defaultProps = {
  driver: false,
};

SettingsHelper.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  reqKey: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  driver: PropTypes.bool,
};

export default connect(mapStateToProps)(SettingsHelper);
