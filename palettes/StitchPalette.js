import { BimpPalette } from "../BimpPalette";
export class StitchPalette extends BimpPalette {
  LIGHT = "#ff9e0d";
  DARK = "#cf7e06";
  constructor() {
    super(["KNIT", "SLIP", "TUCK"]);
    this.drawFunc = this.drawStitch;
    this.hOff = 0.2;
    this.vOff = 0.85;

    this.styles = { imageRendering: "auto" };
  }

  render(ctx, bitmap, scale) {
    ctx.imageSmoothingEnabled = true;
    for (let y = 0; y < bitmap.height; y++) {
      for (let x = 0; x < bitmap.width; x++) {
        ctx.translate(x * scale, y * scale);
        this.draw(ctx, bitmap, [x, y], scale);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }

  makeLinGrad(ctx, start, stop, c1, c2) {
    const grad = ctx.createLinearGradient(start[0], start[1], stop[0], stop[1]);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    return grad;
  }

  drawStitch(ctx, bitmap, [x, y], scale) {
    const stitch = this.entries[bitmap.pixel(x, y)];

    ctx.lineWidth = scale / 6;
    ctx.lineCap = "round";

    if (stitch == "KNIT") {
      this.knit(ctx, scale);
    } else if (stitch == "SLIP") {
      this.slip(ctx, scale);
    }
  }

  knit(ctx, scale) {
    // KNIT

    ctx.strokeStyle = this.LIGHT;

    // top left under
    const lstart = [0, this.vOff * scale];
    const lstop = [0.4 * scale, 0.6 * scale];
    // const lgrad = this.makeLinGrad(ctx, lstart, lstop, this.DARK, this.LIGHT);
    // ctx.strokeStyle = lgrad;

    ctx.beginPath();
    ctx.moveTo(lstart[0], lstart[1]);
    ctx.bezierCurveTo(
      0.25 * scale,
      this.vOff * scale,
      0.3 * scale,
      0.75 * scale,
      lstop[0],
      lstop[1]
    );
    ctx.stroke();

    // top right under

    const rstart = [scale, this.vOff * scale];
    const rstop = [0.6 * scale, 0.6 * scale];
    // const rgrad = this.makeLinGrad(ctx, rstart, rstop, this.DARK, this.LIGHT);
    // ctx.strokeStyle = rgrad;
    ctx.beginPath();
    ctx.moveTo(rstart[0], rstart[1]);
    ctx.bezierCurveTo(
      0.75 * scale,
      this.vOff * scale,
      0.7 * scale,
      0.75 * scale,
      rstop[0],
      rstop[1]
    );
    ctx.stroke();

    // bottom part
    // const cgrad = this.makeLinGrad(
    //   ctx,
    //   [0.5 * scale, 0.25 * scale],
    //   [0.5 * scale, 0.75 * scale],
    //   this.DARK,
    //   this.LIGHT
    // );
    // ctx.strokeStyle = cgrad;
    ctx.beginPath();
    ctx.moveTo(this.hOff * scale, scale);
    ctx.bezierCurveTo(
      0,
      0.1 * scale,
      scale,
      0.1 * scale,
      scale - this.hOff * scale,
      scale
    );
    ctx.stroke();
    ctx.strokeStyle = this.LIGHT;

    // top left
    ctx.beginPath();
    ctx.moveTo(lstop[0], lstop[1]);
    ctx.bezierCurveTo(
      0.5 * scale,
      this.hOff * scale,
      this.hOff * scale,
      this.hOff * scale,
      this.hOff * scale,
      0
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rstop[0], rstop[1]);
    ctx.bezierCurveTo(
      0.5 * scale,
      this.hOff * scale,
      scale - this.hOff * scale,
      this.hOff * scale,
      scale - this.hOff * scale,
      0
    );
    ctx.stroke();
  }

  slip(ctx, scale) {
    // SLIP

    // float across the back
    ctx.strokeStyle = this.DARK;
    ctx.beginPath();
    ctx.moveTo(0, this.vOff * scale);
    ctx.lineTo(scale, this.vOff * scale);
    ctx.stroke();

    ctx.strokeStyle = this.LIGHT;

    // left part of stretched stitch
    ctx.beginPath();
    ctx.moveTo(this.hOff * scale, scale);
    ctx.lineTo(this.hOff * scale, 0);
    ctx.stroke();

    // right part of stretched stitch
    ctx.beginPath();
    ctx.moveTo(scale - this.hOff * scale, scale);
    ctx.lineTo(scale - this.hOff * scale, 0);
    ctx.stroke();
  }
}
