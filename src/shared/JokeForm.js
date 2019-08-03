import React from 'react'
import { Link } from 'react-router-dom'

const JokeForm = ({ joke, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Set Up</label>
    <input
      placeholder="Setup"
      value={joke.set_up}
      name="set_up"
      onChange={handleChange}
    />
    <label>Punch Line</label>
    <input
      placeholder="Punch Line"
      value={joke.punch_line}
      name="punch_line"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>

    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)
export default JokeForm
