import React from 'react'
import '../styles/loading.css'

const Loading = () => {
  return (
    <div className = "position-absolute top-50 start-50 translate-middle">
      <div className="wrapper">
        <div className="line line1">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line2">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
        <div className="line line3">
          <span className="circle circle-top"></span>
          <div className="dotted">
            <span className="dot dot-top"></span>
            <span className="dot dot-middle-top"></span>
            <span className="dot dot-middle-bottom"></span>
            <span className="dot dot-bottom"></span>
          </div>
          <span className="circle circle-bottom"></span>
        </div>
      </div>
    </div>
  )
}
export default Loading
