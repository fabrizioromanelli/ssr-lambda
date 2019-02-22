import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

class LPSingle extends Component {
	constructor (props) {
		super(props)
		let lp = {}
		let slug = this.props.match.params.slug

		// Set 'book' if it’s on server-side
		if (this.props.staticContext) {
			 lp = this.props.staticContext.books.find(lp => lp.slug === slug)
		}

		this.state = { lp: lp, slug: slug }
	}

	componentDidMount () {
		let slug = this.state.slug
		fetch('/lps.json')
		.then(res => res.json())
		.then((json) => {
			let lp = json.lps.find(lp => lp.slug === slug)
			this.setState({lp: lp})
		})
	}

	render () {
		let lp = this.state.lp
		return (
			<div>
				<h3>{lp.title}</h3>
				<h5 style={{textAlign: 'right'}}><em>{lp.author}</em></h5>
				<p>{lp.description}</p>
				<br/>
				<p><Link to='/lps'>Back to all LPs</Link></p>
			</div>
		)
	}
}

export default LPSingle