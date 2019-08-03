import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import JokeForm from '../../shared/JokeForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../messages'

class JokeEdit extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      joke: {
        id: '',
        set_up: '',
        punch_line: '',
        user_id: ''
      },
      edited: false
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/jokes/${this.props.match.params.id}`)
      .then(res => this.setState({ joke: res.data.joke }))
      .catch(err => this.setState({ error: err.stack }))
  }
  handleChange = event => {
    // create object with updated field
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // use object to create updated state object
    const editedJoke = Object.assign(this.state.joke, updatedField)

    // setState with updated object
    this.setState({ joke: editedJoke })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log(this.props.user)

    axios({
      url: `${apiUrl}/jokes/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { joke: {
        set_up: this.state.joke.set_up,
        punch_line: this.state.joke.punch_line,
        user_id: this.props.user.id
      } }
    })
      .then(res => this.setState({
        jokeId: res.data.joke.id
      }))
      .then(() => this.props.alert(messages.editSuccess, 'success'))
      .then(() => this.props.history.push('/jokes'))
      .catch(console.error)
  }

  render () {
    const { joke, jokeId } = this.state
    const { handleChange, handleSubmit } = this

    if (jokeId) {
      return <Redirect to={`/jokes/${jokeId}`}/>
    }

    return (
      <div>
        <h4>Edit this joke</h4>
        <JokeForm
          joke={joke}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </div>
    )
  }
}

export default withRouter(JokeEdit)
