import React from 'react';
import Particles from 'react-particles-js';
import params from './particles.json';
import './style.css';

const ParticlesForm = () => (
  <div className="particles">
    <Particles params={params} />
  </div>
);

export default ParticlesForm;
