import { formHandler } from './js/app.js'
import { deleteTrip } from './js/app.js'

import './styles/style.scss'

const buttonID = document.getElementById('generate')

buttonID.addEventListener('click', formHandler)
buttonID.addEventListener('submit', formHandler)

export { formHandler, deleteTrip }
