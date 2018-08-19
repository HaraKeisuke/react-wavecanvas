import React, { Component } from "react";

class Canvas extends Component {
  canvas;
  context;

  componentDidMount() {
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = this.props.color;
    if (this.props.buffer.length > 0) {
      this.drawCanvas(this.props.buffer);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.context.fillStyle = this.props.color;
    if (this.props.buffer !== nextProps.buffer && nextProps.buffer.length > 0) {
      this.drawCanvas(nextProps.buffer);
    }
  }

  drawCanvas(buffer) {
    this.context.beginPath();

    let widthUnit = Math.floor(this.canvas.width / buffer.length);
    let height = this.canvas.height;
    let halfHeight = height / 2;

    for (let i = 0; i < buffer.length; i++) {
      let barHeight = buffer[i] * height;
      this.context.fillRect(
        i * widthUnit,
        halfHeight - barHeight / 2,
        widthUnit - widthUnit / 3,
        barHeight
      );
    }
  }

  render() {
    return (
      <canvas
        ref={ref => {
          this.canvas = ref;
        }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Canvas;
