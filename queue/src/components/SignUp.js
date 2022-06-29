import { useState } from 'react'
import userService from '../services/users'
import { Form, Button, Alert } from 'react-bootstrap'

const SignUp = ({ login, navigate }) => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const createAccount =  (event) => {
        event.preventDefault()
        userService.create({ username, name, password }).then(response => {
            console.log(response)
            login(username, password)
            navigate('/')
        })
        .catch(error => {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        })
    }

    return (
        <div className='mt'>
            {error && <Alert variant='danger'>{error}</Alert>}
            <h2>Sign up</h2>
            <Form onSubmit={createAccount}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={handleNameChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
            {/* <form onSubmit={createAccount}>
                <div>
                    name: <input type='text' value={name} onChange={handleNameChange}></input>
                </div>
                <div>
                    username: <input type='text' value={username} onChange={handleUsernameChange} required></input>
                </div>
                <div>
                    password: <input type='password' value={password} onChange={handlePasswordChange} required></input>
                </div>
                <button type='submit'>Create Account</button>
            </form> */}
        </div>
    )
}

export default SignUp