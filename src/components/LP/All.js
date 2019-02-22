import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

class LPAll extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.staticContext || { lps: [] }
	}

	componentDidMount() {
		console.log('fetching client-side...')
		fetch('/lps.json')
		.then(res => res.json())
		.then((json) => {
			this.setState({
				lps: json.lps
			})
		})
	}

	render() {
		let lps = this.state.lps.map(lp => (
			<li key={lp.id}>
				<Link to={`/lp/${lp.slug}`}><b>{lp.title}</b></Link> by <em>{lp.author}</em>
			</li>
		))
		return (
			<div>
				<div>
					<h2>LPs</h2>
					<ul>{lps}</ul>
				</div>
			</div>
		)
	}
}

export default LPAll
