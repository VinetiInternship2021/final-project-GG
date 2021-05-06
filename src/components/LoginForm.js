import React from 'react'

const LoginForm = (props) => {
  const fields = props.fields
  const setFields = props.setFields
  const onClick = props.onClick
  const header = props.header
  
  return (
    <form className="text-center w-25 border position-absolute top-50 start-50 translate-middle">
      <div className="me-3 mx-3">
        <br />
        <h5>{header}</h5>
        <label htmlFor="phone" className="form-label">Phone</label>
        <input onClick={() => {
          setFields({ ...fields, alert: '' })
        }}
               onChange={(e) => {
                 setFields({ ...fields, phone_number: e.target.value })
               }}
               id="phone"
               type="number"
               className="form-control" />
        <label htmlFor="password" className="form-label">Password</label>
        <input onClick={() => {
          setFields({ ...fields, alert: '' })
        }}
               onChange={(e) => {
                 setFields({ ...fields, password: e.target.value })
               }}
               id="password"
               type="password"
               className="form-control"/>
      
        <label htmlFor="rememberMe" className="form-label">
          <input
            className="form-check-input"
            name="rememberMe"
            type="checkbox"
            checked={fields.remember_me}
            onChange={ (event) =>  setFields({
              ...fields,
              remember_me: event.target.checked
            })
            } />
          Remember
        </label>
        <p>{fields.alert}</p>
      </div>
      <button onClick={(e)=>onClick(e)}
              type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
    </form>
  )
}

export default LoginForm