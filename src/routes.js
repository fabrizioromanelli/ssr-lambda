import Home from './components/Home'
import LP from './components/LP/'
import LPAll from './components/LP/All'
import LPSingle from './components/LP/Single'
import About from './components/About'
import RedirectWithStatus from './components/RedirectWithStatus'
import NotFound from './components/NotFound'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

require('dotenv').config()

// Custom function to load the data on the server-side
const loadData  = (match) => {
	// Alert a warning if not an absolute url
	// TODO change it!
	console.log('fetching server-side... '+process.env.REACT_APP_LOCAL)
  var location = ''
	if (process.env.REACT_APP_LOCAL == 'true'){
		location = 'http://localhost:3000/lps.json'
	}
	else {
		location = 'https://4jevustfab.execute-api.eu-central-1.amazonaws.com/prod/lps.json'
	}

	return fetch(location)
	.then(res => res.json())
}

export const routes = [
	{ path: '/',
		exact: true,
		component: Home,
	},
	{ path: '/lps',
		component: LP,
		routes: [
			{
				path: '/lps',
				exact: true,
				component: LPAll,
				loadData: loadData
			},
			{
				path: '/lps/:slug',
				component: LPSingle,
				loadData: loadData
			}
		]
	},
	{ path: '/about',
		component: About,

	},
	{
		path: '/eps',
		component: RedirectWithStatus,
		status: 301,
		to: '/lps'
	},
	{
		path: '*',
		component: NotFound
	}
]
