import { useState } from 'react'

const LoginFormCreate = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // useNavigate to go to create page clicking dont log in. Need to set token tho
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCreateLogin = (event) => {
        event.preventDefault()
        console.log(username, password)
        login(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleCreateLogin}>
                <div>
                    username: <input type='text' value={username} onChange={handleUsernameChange}></input>
                </div>
                <div>
                    password: <input type='password' value={password} onChange={handlePasswordChange}></input>
                </div>
                <button type='submit'>create</button>
            </form>
            <button>create without logging in</button>
        </div>
    )
}

export default LoginFormCreate