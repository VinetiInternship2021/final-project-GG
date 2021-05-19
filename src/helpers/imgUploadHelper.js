const imgUploadHelper = ({ event, fields, setFields }) => {
  const parameter = {
    ...fields,
    alert: '',
  };
  if (event.target.files && event.target.files[0]) {
    const img = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      parameter[event.target.id] = reader.result;
      setFields(parameter);
    };
    reader.readAsDataURL(img);
  } else {
    parameter[event.target.id] = event.target.value;
    setFields(parameter);
  }
};

export default imgUploadHelper;
