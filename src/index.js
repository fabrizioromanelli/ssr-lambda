import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

render((
	<BrowserRouter basename="/prod"> // To be changed when the base route is no more /prod
		<App />
	</BrowserRouter>
), document.getElementById('root'))
