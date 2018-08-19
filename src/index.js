import React, { Component } from "react";
import Audio from "./audio";
import Canvas from "./canvas";

class WaveCanvas extends Component {
  timer = null;
  node = null;
  startTime = 0;
  canvas = null;
  state = {
    audio: null,
    context: null,
    seekPosition: 0,
    duration: 0,
    isPlaying: false
  };

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

  play(isResume = false) {
    if (this.state.isPlaying && !isResume) {
      return;
    }
    this.node = this.state.audio.getAudioNode();
    this.node.connect(this.state.context.destination);
    this.node.start(0, this.state.seekPosition);
    this.setState({ isPlaying: true });
    this.setTimer();
  }

  pause() {
    if (!this.node) {
      return;
    }

    this.node.stop(0);
    this.setState({ isPlaying: false });
    this.removeTimer();
  }

  stop() {
    if (!this.node) {
      return;
    }

    this.node.stop(0);
    this.setState({ seekPosition: 0, isPlaying: false });
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

  getPlayedPosition(division, seekPosition = this.state.seekPosition) {
    if (seekPosition === 0) {
      return 0;
    }
    let _seek = Math.floor(seekPosition * 100);
    let _duration = Math.floor(this.state.duration * 100);

    let _range = _seek / _duration;
    return division * _range;
  }

  onSeek(seek) {
    let _isPlaying = this.state.isPlaying;
    let seekPosition = this.state.duration * seek;
    this.pause();
    this.setState({ seekPosition: seekPosition });
    if (_isPlaying) {
      this.play(true);
    }
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
          ref={ref => (this.canvas = ref)}
          buffer={audio.getCanvasBuffer(division)}
          color={color}
          seekColor={seekColor}
          playedPosition={this.getPlayedPosition(division)}
          width={width}
          height={height}
          onSeek={this.onSeek.bind(this)}
        />
      </div>
    );
  }
}

export default WaveCanvas;
