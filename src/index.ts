import './style/index.less'
import Game from './game'
import Controller from './controller'

const game = new Game(window.innerWidth - 10, window.innerHeight - 10)
const controller = new Controller(game)