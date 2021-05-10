import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from '../shared/Animations/Loading';
import getUserData from './ProfilePageHelper';
import { mapStateToProps } from '../redux/actions';
import { signParams } from '../utils/configs';
import UpdateHelper from './UpdateHelper';
import ErrorMessages from '../components/layouts/ErrorMessages';
import RegistrationForm from '../components/RegistrationForm';

const SettingsHelper = ({
  appState, dispatch, modelName, reqKey,
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
    UpdateHelper(Fields, SetFields, State, Dispatch, History, newParams)
      .then();
  };

  return (
    <>
      <form>
        {fields.alert
          ? (
            <ErrorMessages fields={fields} />
          )
          : false}
        <div className="me-3 mx-3">
          {state.isLoading ? <Loading /> : false}
          Settings
          <RegistrationForm
            onChange={onChange}
            data={[fields, setFields]}
            header={`${fields.first_name} information updating`}
          />
        </div>
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

SettingsHelper.propTypes = {
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  appState: PropTypes.objectOf(PropTypes.any).isRequired,
  reqKey: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SettingsHelper);
