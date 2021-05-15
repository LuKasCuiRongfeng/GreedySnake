interface snakeOptions {
    fillColor: string,
    gap: number
}
const speedOptions = {
    normalSpeed: 10,
    moderateSpeed: 20,
    largeSpeed: 30,
    superSpeed: 50
}
type Shpae = "circle" | "square"
type Direction = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"
class Snake {
    bodies: Array<{ x: number, y: number }> = []
    context: CanvasRenderingContext2D
    direction: Direction = "ArrowRight"
    speed = speedOptions.normalSpeed

    constructor(public canvas: HTMLCanvasElement, public gap: number, public fillColor: string, headPosition: { x: number, y: number }, public shape: Shpae = "circle") {
        this.bodies.push(headPosition)
        this.context = this.canvas.getContext("2d")!
    }
    run(foodPosition: { x: number, y: number }) {
        const head = this.bodies[0]
        switch (this.direction) {
            case "ArrowLeft":
                this.bodies.unshift({ x: head.x - 1, y: head.y })
                break
            case "ArrowRight":
                this.bodies.unshift({ x: head.x + 1, y: head.y })
                break
            case "ArrowUp":
                this.bodies.unshift({ x: head.x, y: head.y - 1 })
                break
            case "ArrowDown":
                this.bodies.unshift({ x: head.x, y: head.y + 1 })
                break;
        }
        let isGameOver = this.endGame()
        let isEatFood = this.eatFood(foodPosition, head)
        if (!isEatFood) {
            this.bodies.pop()
        }
        this.changeSpeed()
        return {
            isGameOver,
            isEatFood
        }
    }
    eatFood(foodPosition: { x: number, y: number }, head: { x: number, y: number }) {
        if (foodPosition.x === head.x && foodPosition.y === head.y) {
            return true
        }
        return false
    }
    endGame() {
        const head = this.bodies[0]
        let maxXGap = Math.floor(this.canvas.width / this.gap)
        let maxyGap = Math.floor(this.canvas.height / this.gap)
        if (head.x < 1 || head.x > maxXGap - 1 || head.y < 1 || head.y > maxyGap - 1) {
            return true
        }
        if (this.bodies.length > 1 && this.bodies.slice(1).find(body => body.x === head.x && body.y === head.y)) {
            return true
        }
        return false
    }
    draw() {
        this.context.save()
        this.context.fillStyle = this.fillColor
        this.context.strokeStyle = "#f00"
        this.context.lineWidth = 1
        for (let i = 0; i < this.bodies.length; i++) {
            const body = this.bodies[i]
            if (i === 0) {
                this.context.moveTo(body.x * this.gap - this.gap / 2, body.y * this.gap - this.gap / 2)
            } else {
                this.context.lineTo(body.x * this.gap - this.gap / 2, body.y * this.gap - this.gap / 2)
            }
            this.context.stroke()
            switch (this.shape) {
                case "square":
                    this.context.fillRect((body.x - 1) * this.gap, (body.y - 1) * this.gap, this.gap, this.gap)
                    break
                case "circle":
                    this.context.beginPath()
                    this.context.arc(body.x * this.gap - this.gap / 2, body.y * this.gap - this.gap / 2, this.gap / 2, 0, Math.PI * 2)
                    this.context.fill()
                    this.context.closePath()
            }
        }
        this.context.restore()
    }
    changeDirection(direction: string) {
        if (direction === "ArrowLeft" || direction === "ArrowRight" || direction === "ArrowUp" || direction === "ArrowDown") {
            if (!this.isPrallelDirection(direction)) {
                this.direction = direction
            }
        }
    }
    isPrallelDirection(direction: string) {
        if (this.direction === "ArrowLeft" || this.direction === "ArrowRight") {
            if (direction === "ArrowLeft" || direction === "ArrowRight") {
                return true
            }
        }
        if (this.direction === "ArrowUp" || this.direction === "ArrowDown") {
            if (direction === "ArrowUp" || direction === "ArrowDown") {
                return true
            }
        }
        return false
    }
    getSpeed() {
        return this.speed
    }
    setSpeed(speed: number) {
        this.speed = speed
    }
    changeSpeed() {
        if (this.bodies.length === 5) {
            this.setSpeed(speedOptions.moderateSpeed)
        } else if (this.bodies.length === 10) {
            this.setSpeed(speedOptions.largeSpeed)
        } else if (this.bodies.length === 20) {
            this.setSpeed(speedOptions.superSpeed)
        }
    }
}

export default Snake