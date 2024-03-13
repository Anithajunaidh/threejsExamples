import React from 'react';

class CaptureComponent extends React.Component {
  captureScreenshot = () => {
    const { config, ext, getResolution, createFBO, render, framebufferToTexture, normalizeTexture, textureToCanvas, downloadURI } = this.props;

    let res = getResolution(config.CAPTURE_RESOLUTION);
    let target = createFBO(res.width, res.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.NEAREST);
    render(target);

    let texture = framebufferToTexture(target);
    texture = normalizeTexture(texture, target.width, target.height);

    let captureCanvas = textureToCanvas(texture, target.width, target.height);
    let datauri = captureCanvas.toDataURL();
    this.downloadURI('fluid.png', datauri);
    URL.revokeObjectURL(datauri);
  };

  framebufferToTexture = (target) => {
    const { gl } = this.props;
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    let length = target.width * target.height * 4;
    let texture = new Float32Array(length);
    gl.readPixels(0, 0, target.width, target.height, gl.RGBA, gl.FLOAT, texture);
    return texture;
  };

  normalizeTexture = (texture, width, height) => {
    let result = new Uint8Array(texture.length);
    let id = 0;
    for (let i = height - 1; i >= 0; i--) {
      for (let j = 0; j < width; j++) {
        let nid = i * width * 4 + j * 4;
        result[nid + 0] = this.clamp01(texture[id + 0]) * 255;
        result[nid + 1] = this.clamp01(texture[id + 1]) * 255;
        result[nid + 2] = this.clamp01(texture[id + 2]) * 255;
        result[nid + 3] = this.clamp01(texture[id + 3]) * 255;
        id += 4;
      }
    }
    return result;
  };

  clamp01 = (input) => {
    return Math.min(Math.max(input, 0), 1);
  };

  textureToCanvas = (texture, width, height) => {
    let captureCanvas = document.createElement('canvas');
    let ctx = captureCanvas.getContext('2d');
    captureCanvas.width = width;
    captureCanvas.height = height;

    let imageData = ctx.createImageData(width, height);
    imageData.data.set(texture);
    ctx.putImageData(imageData, 0, 0);

    return captureCanvas;
  };

  downloadURI = (filename, uri) => {
    let link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <div>
        <button onClick={this.captureScreenshot}>Capture Screenshot</button>
      </div>
    );
  }
}

export default CaptureComponent;
