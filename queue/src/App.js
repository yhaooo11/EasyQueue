import { useState } from 'react'
import queueService from './services/queues'
import loginService from './services/login'
import LoginFormCreate from './components/LoginFormCreate'

const App = () => {
  const [queues, setQueues] = useState([])
  const [user, setUser] = useState(null)

  const addQueue = async (queueObject) => {
    const response = await queueService.create(queueObject)
    setQueues(queues.concat(response))
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      queueService.setToken(user.token)
      setUser(user)
      alert('logged in')
    } catch (exception) {
      alert('wrong username or password')
    }
  }


  return (
    <div>
      <h1>Queue Maker</h1>
      <LoginFormCreate login={handleLogin}/>
    </div>
  )
}


export default App;
