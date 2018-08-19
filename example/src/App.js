import React, { Component } from "react";

import WaveCanvas from "react-wavecanvas";

export default class App extends Component {
  wavecanvas;
  render() {
    return (
      <div>
        <div onClick={this.play.bind(this)}>Start</div>
        <div onClick={this.pause.bind(this)}>Pause</div>
        <div onClick={this.stop.bind(this)}>Stop</div>
        <WaveCanvas
          ref={ref => (this.wavecanvas = ref)}
          url={window.location.origin + "/sample.mp3"}
          color={"white"}
          seekColor={"red"}
        />
      </div>
    );
  }

  play() {
    this.wavecanvas.play();
  }

  pause() {
    this.wavecanvas.pause();
  }

  stop() {
    this.wavecanvas.stop();
  }
}
