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
import { NavDropdown, Navbar, Nav, Container, Button } from 'react-bootstrap'

const App = () => {
  const [queues, setQueues] = useState([])
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    queueService.getAll().then(queues => {
      setQueues(queues)
    })
    if (window.localStorage.getItem('loggedQueueappUser')) {
      setUser(JSON.parse(window.localStorage.getItem('loggedQueueappUser')))
    }
    const socket = io()
    setSocket(socket)

    return () => socket.disconnect()
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
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">Queue It!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Create</Nav.Link>
            <Nav.Link href="#pricing">Join</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Navbar.Text href="#deets">{user ? <div>{user.username} is logged in</div> : <div>logged out</div>}</Navbar.Text>
            <Nav.Link eventKey={2} href="#memes">
              {user ? <Button variant='primary' onClick={handleLogout}>logout</Button> : <Button variant='primary' onClick={goToLogin}>login</Button>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='container'>
        <h1>Queue Maker</h1>
        
      
      
        <Routes>
          <Route path='/' element={<Home user={user} navigate={navigate}></Home>}></Route>
          <Route path='/join' element={<Join queues={queues} navigate={navigate}></Join>}></Route>
          <Route path='/signup' element={<SignUp login={handleLogin} navigate={navigate}></SignUp>}></Route>
          <Route path='/login-create' element={<LoginForm login={handleLogin} navigate={navigate} redirect={'/create'}></LoginForm>}></Route>
          <Route path='/login' element={<LoginForm login={handleLogin} navigate={navigate} redirect={-1}></LoginForm>}></Route>
          <Route path='/create' element={<QueueForm navigate={navigate}></QueueForm>}></Route>
          <Route path='/queue/:id' element={<Queue queueService={queueService} user={user} socket={socket}></Queue>}></Route>
          <Route path='/account' element={<User user={user}></User>}></Route>
        </Routes>
      </div>
    </div>
  )
}


export default App;
