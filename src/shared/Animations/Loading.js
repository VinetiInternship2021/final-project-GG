import React from 'react';
import '../../styles/loading.css';

const Loading = () => (
  <div className="position-absolute top-50 start-50 translate-middle">
    <div className="wrapper">
      <div className="line line1">
        <span className="circle circle-top" />
        <div className="dotted">
          <span className="dot dot-top" />
          <span className="dot dot-middle-top" />
          <span className="dot dot-middle-bottom" />
          <span className="dot dot-bottom" />
        </div>
        <span className="circle circle-bottom" />
      </div>
      <div className="line line2">
        <span className="circle circle-top" />
        <div className="dotted">
          <span className="dot dot-top" />
          <span className="dot dot-middle-top" />
          <span className="dot dot-middle-bottom" />
          <span className="dot dot-bottom" />
        </div>
        <span className="circle circle-bottom" />
      </div>
      <div className="line line3">
        <span className="circle circle-top" />
        <div className="dotted">
          <span className="dot dot-top" />
          <span className="dot dot-middle-top" />
          <span className="dot dot-middle-bottom" />
          <span className="dot dot-bottom" />
        </div>
        <span className="circle circle-bottom" />
      </div>
    </div>
  </div>
);

export default Loading;
