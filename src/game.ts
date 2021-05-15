import Grid from './grid'
import FPS from './fps'
import Food from './food'
import Snake from './snake'

class Game {
    private canvas: HTMLCanvasElement = document.createElement("canvas")
    context = this.canvas.getContext("2d")!
    private isShowGrid = false
    grid: Grid
    fps: FPS
    food: Food
    snake: Snake
    gap = 10
    isGameOver = false
    timer: any
    constructor(width: number, height: number) {
        this.grid = new Grid(this.canvas, this.gap)
        this.fps = new FPS(this.canvas)
        this.food = new Food(this.canvas, "circle", this.gap)
        this.snake = new Snake(this.canvas, this.gap, "#000", { x: 3, y: 3 })
        this.init(width, height)
        document.addEventListener("keydown", this.snakeDirectionHandler.bind(this))
        this.loop()
    }
    loop() {
        let status = this.snake.run(this.food.getPosition())
        if (status.isEatFood) {
            const sankeBodies = this.snake.bodies
            let xGap = Math.floor(this.canvas.width / this.gap)
            let yGap = Math.floor(this.canvas.height / this.gap)
            let x = Math.floor(Math.random() * xGap) + 1
            let y = Math.floor(Math.random() * yGap) + 1
            while (sankeBodies.find(body => body.x === x && body.y === y)) {
                x = Math.floor(Math.random() * xGap) + 1
                y = Math.floor(Math.random() * yGap) + 1
            }
            if (x >= xGap) x = xGap - 1
            if (y >= yGap) y = yGap - 1
            this.food.setPosition({ x, y })
        }
        if (status.isGameOver) {
            this.isGameOver = status.isGameOver
            clearTimeout(this.timer)
            this.timer = null
        } else {
            this.timer = setTimeout(() => {
                if (this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
                this.loop()
            }, 1000 / this.snake.getSpeed());
        }
    }
    init(width: number, height: number, bgColor: string = "#0f0") {
        this.canvas.width = width
        this.canvas.height = height
        bgColor && (this.canvas.style.background = bgColor)
        document.body.appendChild(this.canvas)
        this.draw(0)
    }
    draw(nowTime: number) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (this.isGameOver) {
            this.context.font = "36px 隶书"
            this.context.fillText("GAME OVER", this.canvas.width / 2 - 100, this.canvas.height / 2)
        }
        this.isShowGrid && this.grid.draw()
        this.fps.draw(nowTime)
        this.food.draw()
        this.snake.draw()
        requestAnimationFrame(time => this.draw(time))
    }
    snakeDirectionHandler(event: KeyboardEvent) {
        this.snake.changeDirection(event.key)
    }
    reStart(width: number, height: number) {
        return new Game(width, height)
    }
    setIsShowGrid(isShowGrid: boolean) {
        this.isShowGrid = isShowGrid
    }
}
export default Game