type Shpae = "circle" | "square"
class Food {
    // 代表第几格
    x = 40
    y = 40
    context: CanvasRenderingContext2D
    constructor(public canvas: HTMLCanvasElement, public shape: Shpae = "circle", public gap: number) {
        this.context = this.canvas.getContext("2d")!
    }
    getPosition() {
        return { x: this.x, y: this.y }
    }
    setPosition(position: { x: number, y: number }) {
        let xGap = Math.floor(this.canvas.width / this.gap)
        let yGap = Math.floor(this.canvas.height / this.gap)
        if (position.x < 1) {
            position.x = 1
        } else if (position.x > xGap) {
            position.x = xGap
        }
        if (position.y < 1) {
            position.y = 1
        } else if (position.y > yGap) {
            position.y = yGap
        }
        this.x = position.x
        this.y = position.y
    }
    draw() {
        this.context.save()
        this.context.fillStyle = "#f00"
        const position = this.getPosition()
        switch(this.shape) {
            case "circle":
                this.context.beginPath()
                this.context.arc(position.x * this.gap - this.gap / 2, position.y * this.gap - this.gap / 2, this.gap / 2, 0, Math.PI *2)
                this.context.fill()
                this.context.closePath()
                break
            case "square":
                this.context.fillRect((position.x - 1) * this.gap, (position.y - 1) * this.gap, this.gap, this.gap)
                break
        }
        this.context.restore()
    }
}

export default Food