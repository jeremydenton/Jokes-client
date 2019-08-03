import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Jokes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      jokes: [],
      error: null,
      loaded: false,
      msg: ''
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/jokes`)
      .then(res => this.setState({ jokes: res.data.jokes, loaded: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { jokes, error, loaded, msg } = this.state

    const jokesList = jokes.map(joke => (
      <li key={joke.id}>
        <Link to={`/jokes/${joke.id}`}>{joke.set_up}</Link>
      </li>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>Error: {error}</p>
    }
    return (
      <div>
        <p>{msg}</p>
        <h4>Jokes</h4>
        <ul>
          {jokesList}
        </ul>
      </div>
    )
  }
}

export default Jokes
