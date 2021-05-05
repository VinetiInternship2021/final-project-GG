import React from 'react'
import params from './particles.json'
import Particles from 'react-particles-js';
import './style.css'

const ParticlesForm = () => {
  return (
    <div className="particles">
      <Particles params={params}/>
    </div>
  )
}

export default ParticlesForm