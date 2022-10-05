import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function TodoList(props) {
  const { data, deleteTodo, isLoading, todoPage, checkboxHandler, changeTitleHandler } = props
  const [slicedItems, setSlicedItems] = useState(data)
  const [sliced, setSliced] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if (data.length === 0) {
        return (
            <div>нет ToDo</div>
        )
    }
    if (todoPage === undefined) {
        if (data.length > 5) {
            let arr = data.slice()
            let removed = arr.splice(0, 5)
            setSlicedItems(removed)
            setSliced(true)
            }
        }
    }, [data])
  
    const changeHandler = (index) => {
        document.querySelectorAll('.changing')[index].style.display = 'block'
        document.querySelectorAll('.noChanging')[index].style.display = 'none'
    }

    const saveChanges = (index, id) => {
        const value = document.querySelectorAll('.changeTitleInput')[index].value
        document.querySelectorAll('.changing')[index].style.display = 'none'
        document.querySelectorAll('.noChanging')[index].style.display = 'block'

        changeTitleHandler(id, value)
    }
    
    return (
    <ul className='todoList'>
            {slicedItems.map((item, index) => (
                    <li key={index} className='todoList__item'>
                        <input id='checkbox' type='checkbox' onChange={() => checkboxHandler(index)} />
                        <button onClick={() => changeHandler(index)}>изменить</button>
                        <div className='changing'>
                            <input className='changeTitleInput' type="text"/>
                            <button onClick={() => saveChanges(index, item.id)}>сохранить</button>
                        </div>
                        <div className='noChanging'>
                            {item.title}
                        </div>
                        <button onClick={() => deleteTodo(index)}>удалить ToDo</button>
                    </li>
                ))}
            {todoPage === undefined && sliced && (
                <Link to='/todoPage'>открыть весь список задач</Link>
            )}
    </ul>
  )
}
