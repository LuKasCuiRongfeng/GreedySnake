class Grid {
    constructor(public canvas: HTMLCanvasElement, public gap: number, public lineWidth: number = 1,  public color: string = "#00000060") {
        this.draw()
    }
    draw() {
        const context = this.canvas.getContext("2d")!
        const width = this.canvas.width
        const height = this.canvas.height
        context.save()
        context.strokeStyle = this.color
        for (let i = 0; i * this.gap < width; i++) {
            context.beginPath()
            context.moveTo(i * this.gap, 0)
            context.lineTo(i * this.gap, height)
            context.stroke()
            context.closePath()
        }
        for (let i = 0; i * this.gap < height; i++) {
            context.beginPath()
            context.moveTo(0, i * this.gap)
            context.lineTo(width, i * this.gap)
            context.stroke()
            context.closePath()
        }
    }
}
export default Grid