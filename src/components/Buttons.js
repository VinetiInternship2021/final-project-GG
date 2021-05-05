import React from 'react'

export const PageButton = (props) => {
  return (
    <button key={props.button}
            onClick={(event) => props.onSelect(event)}
            className={`btn btn-outline-success me-1 user-page ${props.buttonClassName}`}
            type="submit"> <div>{props.className? <div><i key={props.button}
                                               className={props.className}/></div>:''} {props.button}</div>
            </button>
  )
}

export const HeaderButton = (props) => {
  return (
    <button key={props.key}
            onClick={(event) => props.onSelect(event, props.button)}
            className={`btn btn-outline-success me-1 ${props.className}`}
            type="submit">{props.button}</button>
  )
}