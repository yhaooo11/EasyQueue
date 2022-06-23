import { useState } from 'react'
import userService from '../services/users'

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
        <div>
            <div>{error}</div>
            <form onSubmit={createAccount}>
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
            </form>
        </div>
    )
}

export default SignUp