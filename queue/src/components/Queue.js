import { useState, useEffect } from 'react'
import {
  useParams
} from 'react-router-dom'

const Queue = ({ queueService, user }) => {
    const [queue, setQueue] = useState(null)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const id = useParams().id
    
    useEffect(() => {
        queueService.getOne(id).then(queue => {
            setQueue(queue)
        })
    }, [id, queueService])

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    const updateQueue = async (event) => {
        event.preventDefault()

        const newQueue = queue.queue.concat({
            name: name,
            location: location
        })
        
        const response = await queueService.updateQueue(id, { queue: newQueue })

        setQueue(response)
        setName('')
        setLocation('')
    }

    if (!queue) {
        return (
            <div>
                loading ...
            </div>
        )
    }

    if (user && user.id === queue.user) {
        console.log('same')
    }

    return (
      <div>
        User View
        <div>
            <h2>name: {queue.name}</h2>
        </div>
        <div>
            date created: {queue.date.slice(0, 9)}
        </div>
        <form onSubmit={updateQueue}>
            <div>
                name: <input type='text' value={name} onChange={handleNameChange} required></input>
            </div>
            <div>
                location: <input type='text' value={location} onChange={handleLocationChange} placeholder='optional'></input>
            </div>
            <button type='submit'>Join queue</button>
        </form>
        <ul>
            {queue.queue.map(item => <li key={item._id}>{item.name} at {item.location}</li>)}
        </ul>
      </div>
    )
  }

export default Queue