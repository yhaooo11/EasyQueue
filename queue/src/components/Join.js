import { useState } from 'react'
import queueService from '../services/queues'

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
            <form onSubmit={joinQueue}>
                <div>
                    Queue ID: <input type='text' value={id} onChange={handleIdChange}></input>
                </div>
                <button type='submit'>Join</button>
            </form>
        </div>
    )
}

export default Join