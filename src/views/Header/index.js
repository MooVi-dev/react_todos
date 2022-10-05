import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({headerMenu}) {
  return (
    <header className='header'>
      <h3 className='header-logo'>ToDoApp</h3>
      <ul className='header-list'>
        {headerMenu.map( item => (
          <Link to={item.slug}>
            <li key={item.id} className='header-list__item'>
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </header>
  )
}
