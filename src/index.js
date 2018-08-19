import React, { Component } from "react";
import Audio from "./audio";
import Canvas from "./canvas";

class WaveCanvas extends Component {
  timer = null;
  node = null;
  startTime = 0;
  state = { audio: null, context: null, seekPosition: 0, duration: 0 };

  componentDidMount() {
    this.loadAudio();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url != this.props.url) {
      this.loadAudio();
    }
  }

  loadAudio() {
    let context = this.props.context || new AudioContext();
    this.setState({ context: context });
    let audio = new Audio(context);
    audio.load(this.props.url).then(() => {
      this.setState({ audio: audio, duration: audio.getDuration() });
    });
  }

  play() {
    if (this.node) {
      this.pause();
    }
    this.node = this.state.audio.getAudioNode();
    this.node.connect(this.state.context.destination);
    this.node.start(0, this.state.seekPosition);
    this.setTimer();
  }

  pause() {
    this.node.stop(0);
    this.removeTimer();
  }

  stop() {
    this.node.stop(0);
    this.setState({ seekPosition: 0 });
    this.removeTimer();
  }

  setTimer() {
    this.startTime = this.state.context.currentTime + this.state.seekPosition;
    if (this.timer) {
      this.removeTimer();
    }
    this.timer = setInterval(() => {
      this.setState({ seekPosition: this.state.seekPosition + 0.1 });
    }, 100);
  }

  removeTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getPlayedPosition(division) {
    if (this.state.seekPosition === 0) {
      return 0;
    }
    let _seek = Math.floor(this.state.seekPosition * 100);
    let _duration = Math.floor(this.state.duration * 100);

    let _range = _seek / _duration;
    return division * _range;
  }

  render() {
    const { audio, seekPosition } = this.state;
    const color = this.props.color || "white";
    const seekColor = this.props.seekColor || "black";
    const width = this.props.width || 500;
    const height = this.props.height || 200;
    const division = this.props.division || 150;

    if (!audio) {
      return <div />;
    }

    return (
      <div>
        <Canvas
          buffer={audio.getCanvasBuffer(division)}
          color={color}
          seekColor={seekColor}
          playedPosition={this.getPlayedPosition(division)}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default WaveCanvas;
