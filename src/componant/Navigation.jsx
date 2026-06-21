import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return <>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/services">Services</Link>
        </li>
    </ul>
  </>
}

export default Navigation