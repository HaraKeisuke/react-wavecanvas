import React, { Component } from "react";
import Audio from "./audio";
import Canvas from "./canvas";

class WaveCanvas extends Component {
  state = { buffer: [] };

  componentDidMount() {
    let audio = new Audio();
    audio.load(this.props.url).then(() => {
      const division = this.props.division || 150;
      let buffer = audio.getCanvasBuffer(division);
      this.setState({ buffer: buffer });
    });
  }

  render() {
    const color = this.props.color || "white";
    const width = this.props.width || 500;
    const height = this.props.height || 200;

    return (
      <div>
        <Canvas
          buffer={this.state.buffer}
          color={color}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default WaveCanvas;
