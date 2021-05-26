import { handleVerify } from '../utils/API';

const VerifyHelper = async ({ id, setState }) => {
  await handleVerify({ id })
    .then((resp) => {
      if (resp.statusText === 'OK') {
        setState(true);
      }
    });
};

export default VerifyHelper;
