import React, { Component } from 'react'

import WaveCanvas from 'react-wavecanvas'

export default class App extends Component {
  render () {
    return (
      <div>
        <WaveCanvas url='http://localhost:3000/sample.mp3' color={"blue"}/>
      </div>
    )
  }
}
