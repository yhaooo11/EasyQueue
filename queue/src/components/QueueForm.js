import { useState } from 'react'

const QueueForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const addQueue = (event) => {
        event.preventDefault()
        
    }

    return (
        <div>
            <h2>Create new queue</h2>
            <form onSubmit={addQueue}>
                <div>
                    name: <input type='text' value={name} onChange={handleNameChange}></input>
                </div>
                <div>
                    description (optional): <input type='text' value={description} onChange={handleDescriptionChange}></input>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default QueueForm