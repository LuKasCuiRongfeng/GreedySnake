interface fontOptions {
    font: string,
    fillColor: string,
    position: { x: number, y: number }
}
class FPS {
    startTime = 0
    context: CanvasRenderingContext2D
    constructor(public canvas: HTMLCanvasElement, public fontOptions: fontOptions = {
        font: "24px arial",
        fillColor: "#00f",
        position: { x: 0, y: 50 }
    }){
        this.context = this.canvas.getContext("2d")!
    }
    draw(nowTime: number) {
        let fps = "0"
        if (this.startTime) {
            fps = (1000 / (nowTime - this.startTime)).toFixed(0)
        }
        this.context.save()
        this.context.fillStyle = this.fontOptions.fillColor
        this.context.font = this.fontOptions.font
        this.context.fillText("fps: " + fps, this.fontOptions.position.x, this.fontOptions.position.y)
        this.context.restore()
        this.startTime = nowTime
    }
}

export default FPS