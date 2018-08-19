export default class Audio {
  buffer;

  load(url) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = "arraybuffer"
      req.onload = () => {
        if (req.response) {
          let ctx = new AudioContext()
          ctx.decodeAudioData(req.response).then(b => {
            this.buffer = b
            resolve()
          }, reject)
        }
      }
      req.send()
    })
  }

  getCanvasBuffer(division = 150, type = 'normal') {
    let data = this.buffer.getChannelData(0)
    let buffer = []
    let unit = Math.floor(this.buffer.length / division)
    for (let i = 0; i < division; i++) {
      if (i === 0) {
        buffer[i] =
          Math.abs(data[i * unit] + Math.abs(data[(i + 1) * unit])) / 2;
        continue
      }
      if (i === division) {
        buffer[i] =
          Math.abs(data[i * unit] + Math.abs(data[(i - 1) * unit])) / 2;
        continue
      }

      if (type === 'normal') {
        let count = 0
        for (let j = 1; j < unit; j++) {
          count += Math.abs(data[i * unit + j])
        }
        buffer[i] = count / unit
      } else {
        buffer[i] =
          Math.abs(
            data[i * unit] +
              Math.abs(data[(i + 1) * unit]) +
              Math.abs(data[(i - 1) * unit])
          ) / 3
      }
    }
    return buffer
  }
}
