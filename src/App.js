import { useState, useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import './style/global.scss'
import MainPage from './pages/MainPage';
import { TodoPage } from './pages/TodoPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const data = [
  {id: 1, title: '1st todo', checked: false},
  {id: 2, title: '2nd todo', checked: false},
  {id: 3, title: '3d todo', checked: false},
  {id: 4, title: '4th todo', checked: false},
  {id: 5, title: '5th todo', checked: false},
  {id: 6, title: '6th todo', checked: false},
  {id: 7, title: '7th todo', checked: false},
]

function App() {
  const headerMenu = [
    {
      id: 1,
      title: 'Главная',
      slug: '/',
    },
    {
      id: 2,
      title: 'Список задач',
      slug: '/todoPage',
    },
  ]

  const [items, setItems] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  
  const itemsHandler = (value) => {
    setIsLoading(true)
    setTimeout(() => {
      let arr = JSON.parse(JSON.stringify(items))
      let arrEl = {id: items.length + 1, title: value, checked: false}
      arr.push(arrEl)
      setItems(arr)      
    }, 1500)
  }

  const changeTitleHandler = (id, value) => {
    setIsLoading(true)
    if (!value) return
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        let arr = JSON.parse(JSON.stringify(items))
        let arrEl = {id: id, title: value, checked: item.checked}
        arr.splice(i, 1, arrEl)
        setItems(arr)
      }
    }
  }

  
  const deleteTodo = (index) => {    
    setIsLoading(true)
    const arr = JSON.parse(JSON.stringify(items))
    arr.splice(index, 1)
    setItems(arr) 
  }
  
  useEffect(() => {
    setIsLoading(false)
  }, [items])

  return (
    <Router>
      <Layout headerMenu={headerMenu}>
        <Routes>
            <Route exact path='/' element={
              <MainPage 
                itemsHandler={itemsHandler}
                isLoading={isLoading}
                items={items}
                deleteTodo={deleteTodo}
                changeTitleHandler={changeTitleHandler}
              />
            } />
            <Route exact path='/todoPage' element={
              <TodoPage                 
                deleteTodo={deleteTodo}
                items={items}
                isLoading={isLoading}
                changeTitleHandler={changeTitleHandler}
              />
            } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;