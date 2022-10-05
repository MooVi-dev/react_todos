import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddTodo from '../../Components/AddTodo'
import TodoList from '../../views/TodoList'
import axios from 'axios'

export default function MainPage({ itemsHandler, isLoading, items, deleteTodo, changeTitleHandler }) {

  const [axiosData, setAxiosData] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(res => {
        if (res.status === 200) {
          setAxiosData(res.data)
        }
      })
      .catch(e => {
        if (e.response.status === 404) {
          alert('404')
          console.log(e.response)
        }
      })
  }, [])

  const checkboxHandler = (index) => {
    if (index !== undefined) {
      if (items[index].checked) {
        items[index].checked = false
      } else {
        items[index].checked = true
      }
    }
    const todos = document.querySelectorAll('.todoList__item');
    for (let i = 0; i < todos.length; i++) {
      const item = items[i];
      const checkbox = todos[i].querySelector('#checkbox')
      if (item.checked) {
        todos[i].classList.add('todo-done')
        checkbox.checked = true
      } else {
        todos[i].classList.remove('todo-done')
        checkbox.checked = false
      }
    }
  }

  useEffect(() => {
    if (!isLoading) {
      checkboxHandler()
    }
  }, [isLoading])

  return (
    <main className='mainPage'>
      <h1>MainPage</h1>
      <Link to='/todoList'>I'm link from react router</Link>
      <AddTodo itemsHandler={itemsHandler}/>
      {isLoading ? (
        <div>
          загрузка...
        </div>
      ) : (
        <TodoList 
          data={items} 
          deleteTodo={deleteTodo} 
          checkboxHandler={checkboxHandler} 
          changeTitleHandler={changeTitleHandler}
        />
      )}
      <div className='axios'>
        {axiosData.map(item => {
          return (
            <p>
              {item.title}
            </p>
          )
        })}
      </div>
    </main>
  )
}
