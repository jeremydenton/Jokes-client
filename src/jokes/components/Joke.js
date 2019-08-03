import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, Redirect, withRouter } from 'react-router-dom'
import messages from '../messages'

class Joke extends Component {
  constructor (props) {
    super(props)

    this.state = {
      joke: null,
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/jokes/${this.props.match.params.id}`)
      .then(res => this.setState({ joke: res.data.joke }))
      .catch(err => this.setState({ error: err.stack }))
  }

  delete = () => {
    axios({
      url: `${apiUrl}/jokes/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.alert(messages.deleteSuccess, 'success'))
      .then(() => this.props.history.push('/jokes'))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { joke, error, deleted } = this.state
    const ownerButtons = (
      <div>
        <button onClick={this.delete}>DELETE</button>
        <Link to={`/jokes/${this.props.match.params.id}/edit`}>
          <button>EDIT</button>
        </Link>
      </div>
    )
    if (error) {
      return <p>Error: {error}</p>
    }
    if (!joke) {
      return <p>Loading...</p>
    }
    if (deleted) {
      return <Redirect to={
        { pathname: '/jokes', state: { msg: 'Joke Successfully Deleted!!!' } }
      } />
    }
    return (
      <div>
        <h4>{joke.set_up}</h4>
        <p>Punch Line: {joke.punch_line}</p>
        <p>ID: {joke.id}</p>
        <Link to="/jokes">Back to all the Jokes</Link>
        {this.props.user.id === joke.user_id ? ownerButtons : <p></p>}
      </div>
    )
  }
}

export default withRouter(Joke)
