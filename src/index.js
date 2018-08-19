import React, { Component } from "react";
import Audio from "./audio";
import Canvas from "./canvas";

class WaveCanvas extends Component {
  state = { buffer: [] };

  componentDidMount() {
    let audio = new Audio();
    audio.load(this.props.url).then(() => {
      let buffer = audio.getCanvasBuffer();
      this.setState({ buffer: buffer });
    });
  }

  render() {
    return (
      <div>
        <Canvas buffer={this.state.buffer} />
      </div>
    );
  }
}

export default WaveCanvas;
