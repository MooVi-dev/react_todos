import { useEffect } from 'react';
import TodoList from "../../views/TodoList"

const TodoPage = ({ deleteTodo, items, isLoading, changeTitleHandler }) => {

  const checkboxHandler = (index) => {
    if (index !== undefined) {
      if (items[index].checked) {
        items[index].checked = false
      } else {
        items[index].checked = true
      }
    }
    const todos = document.querySelectorAll('.todoList__item');
    for (let i = 0; i < items.length; i++) {
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
    <div className='todoPage'>
      <h1>Todo Page</h1>
      {isLoading ? (
        <div> loading..</div>
      ) : (
        <TodoList 
          data={items} 
          deleteTodo={deleteTodo} 
          todoPage
          checkboxHandler={checkboxHandler}
          changeTitleHandler={changeTitleHandler}
        />
      )}
    </div>
  )
};

export { TodoPage }