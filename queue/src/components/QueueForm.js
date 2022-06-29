import { useState } from 'react'
import queueService from '../services/queues'
import { Form, Button, Alert } from 'react-bootstrap'

const QueueForm = ({ navigate }) => {
    const [queues, setQueues] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const addQueue =  async (event) => {
        event.preventDefault()
        try {
            const response = await queueService.create({ name, description })
            setQueues(queues.concat(response))
            setName('')
            setDescription('')
            navigate(`/queue/${response.id}`)
        } catch (ex) {
            if (ex.response.data.error === 'invalid token') {
                setError('Must be logged in to create a queue')
            } else {
                setError(ex.response.data.error)
            }
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
        
    }

    

    return (
        <div style={{marginTop: '1rem'}}>
            {error && <Alert variant='danger'>{error}</Alert>}
            
            <h2>Create new queue</h2>

            <Form onSubmit={addQueue}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your queue's name" onChange={handleNameChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Optional queue description" onChange={handleDescriptionChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>

            {/* <form onSubmit={addQueue}>
                <div>
                    name: <input type='text' value={name} onChange={handleNameChange}></input>
                </div>
                <div>
                    description (optional): <input type='text' value={description} onChange={handleDescriptionChange}></input>
                </div>
                <button type='submit'>create</button>
            </form> */}
        </div>
    )
}

export default QueueForm