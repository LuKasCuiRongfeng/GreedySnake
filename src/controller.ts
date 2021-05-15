import Game from './game'

class Controller {
    showGridController: HTMLDivElement
    isShowGrid = false
    constructor(public game: Game | null) {
        this.showGridController = document.createElement("div")
        this.initController()
    }
    initController() {
        this.showGridController.id = "controller"
        document.body.appendChild(this.showGridController)
        this.showGridController.innerHTML = `
            <label for="grid">显示网格：</label>
            <input type="checkbox" id="grid" />
            <span id="speed">速度：</span>
        `
        const grid = document.getElementById("grid")
        grid?.addEventListener("change", e => {
            this.isShowGrid = (<HTMLInputElement>e.target).checked
            this.game?.setIsShowGrid(this.isShowGrid)
        })
        this.freshSpeed()
    }
    freshSpeed() {
        const speed = document.getElementById("speed")
        speed && (speed.innerHTML = "速度：" + this.game?.snake.getSpeed())
        setTimeout(() => {
            this.freshSpeed()
        }, 100);
    }
}

export default Controller