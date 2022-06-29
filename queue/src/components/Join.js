import { useState } from 'react'
import queueService from '../services/queues'
import { Form, Button } from 'react-bootstrap'

const Join = ({ queues, navigate }) => {
    const [id, setId] = useState('')

    const joinQueue = async (event) => {
        event.preventDefault()
        try {
            const queue = await queueService.getOne(id)
            if (queue) {
                navigate(`/queue/${id}`)
                //console.log(id)
            }
        } catch (exception) {
            alert('invalid id')
        }
    }

    const handleIdChange = (event) => {
        setId(event.target.value)
    }

    return (
        <div>
            <h2>Join queue</h2>
            <Form onSubmit={joinQueue}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Queue ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter queue id" onChange={handleIdChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Join
                </Button>
            </Form>
        </div>
    )
}

export default Join