import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import queueService from './services/queues'
import loginService from './services/login'
import LoginFormCreate from './components/LoginFormCreate'
import QueueForm from './components/QueueForm'
import Queue from './components/Queue'

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
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedQueueappUser', JSON.stringify(user)
      )
      queueService.setToken(user.token)
      queueService.updateQueue('62acd86bac349dbc8cab8b38', {
      queue: [{
        name: "q test",
        location: "test location"
      },
      {
        name: "a change",
        location: "room 131"
      }]
      })
      setUser(user)
      //alert('logged in')
    } catch (exception) {
      alert('wrong username or password')
    }
  }

  return (
    <div>
      <h1>Queue Maker</h1>
      
    
        <Routes>
          <Route path='/' element={<LoginFormCreate login={handleLogin} navigate={navigate}/>}></Route>
          <Route path='/create' element={<QueueForm navigate={navigate}></QueueForm>}></Route>
          <Route path='/queue/:id' element={<Queue queueService={queueService} user={user}></Queue>}></Route>
        </Routes>
     
    </div>
  )
}


export default App;
