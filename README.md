# react-wavecanvas

>

[![NPM](https://img.shields.io/npm/v/react-wavecanvas.svg)](https://www.npmjs.com/package/react-wavecanvas) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project is a library for visualizing music using React.js.

## Install & Example

Install

```bash
yarn install react-wavecanvas
```

Example

```bash
> cd example && yarn start
```

## Get Started

```js
import React, { Component } from "react";

import WaveCanvas from "react-wavecanvas";

export default class App extends Component {
  render() {
    return (
      <div>
        <WaveCanvas
          url="http://localhost:3000/sample.mp3"
          color={"blue"} // text or rgb format (ex. rgb(0, 0, 0)
          width={500}
          height={200}
          isCursorShow={true}
        />
      </div>
    );
  }
}
```

## Props
|Key|Value|
|:---|:---|
|url|Audio Resource URL (mp3 and wav).Other formats conform to use of WebAudio|
|color|text format or rgb format. ex.) blue red rgb(0,0,0)|
|width|Width of canvas element.|
|height|Height of canvas element.|
|isCursorShow|Seek cursor visibllity turn on/off.


## License

MIT © [HaraKeisuke](https://github.com/HaraKeisuke)
