import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import queueService from './services/queues'
import loginService from './services/login'
import Home from './components/Home'
import QueueForm from './components/QueueForm'
import Queue from './components/Queue'
import LoginForm from './components/LoginForm'
import Join from './components/Join'
import SignUp from './components/SignUp'
import User from './components/User'

const App = () => {
  const [queues, setQueues] = useState([])
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    queueService.getAll().then(queues => {
      setQueues(queues)
    })
    if (window.localStorage.getItem('loggedQueueappUser')) {
      setUser(JSON.parse(window.localStorage.getItem('loggedQueueappUser')))
    }
    const socket = io()
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedQueueappUser', JSON.stringify(user)
      )
      queueService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      alert('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedQueueappUser')
    queueService.setToken('')
    setUser(null) 
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <h1>Queue Maker</h1>
      {user ? <h3>{user.username} is logged in</h3> : <h3>logged out</h3>}
      {user ? <button onClick={handleLogout}>logout</button> : <button onClick={goToLogin}>login</button>}
    
      <Routes>
        <Route path='/' element={<Home user={user} navigate={navigate}></Home>}></Route>
        <Route path='/join' element={<Join queues={queues} navigate={navigate}></Join>}></Route>
        <Route path='/signup' element={<SignUp login={handleLogin} navigate={navigate}></SignUp>}></Route>
        <Route path='/login-create' element={<LoginForm login={handleLogin} navigate={navigate} redirect={'/create'}></LoginForm>}></Route>
        <Route path='/login' element={<LoginForm login={handleLogin} navigate={navigate} redirect={'/'}></LoginForm>}></Route>
        <Route path='/create' element={<QueueForm navigate={navigate}></QueueForm>}></Route>
        <Route path='/queue/:id' element={<Queue queueService={queueService} user={user}></Queue>}></Route>
        <Route path='/account' element={<User user={user}></User>}></Route>
      </Routes>
     
    </div>
  )
}


export default App;
