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

    const copyQueueLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Copied the text: " + window.location.href);
    }

    const removeFirst = async (event) => {
        event.preventDefault()
        if (queue.queue.length > 0) {
            const newQueueList = queue.queue.slice(1)
            const newQueue = { ...queue, queue: newQueueList }
            const response = await queueService.updateQueue(id, newQueue)
            setQueue(response)
        } else {
            alert('no one in queue!')
        }
    }

    const removeOne = async (thisId) => {
        console.log(id)
        const newQueueList = queue.queue.filter(queue => queue._id !== thisId)
        const newQueue = { ...queue, queue: newQueueList }
        console.log(newQueue)
        const response = await queueService.updateQueue(id, newQueue)
        setQueue(response)
    }

    if (!queue) {
        return (
            <div>
                loading ...
            </div>
        )
    }

    if (user && user.id === queue.user) {
        return (
            <div>
                Creator View
                <div>
                    Share: <input type='text' value={window.location.href} readOnly id='link'></input>
                    <button onClick={copyQueueLink}>copy link</button>
                </div>
                <div>
                    id: {queue.id}
                </div>
                <div>
                    <h2>name: {queue.name}</h2>
                </div>
                <div>
                    date created: {queue.date.slice(0, 9)}
                </div>
                <button onClick={removeFirst}>remove first</button>
                <div>
                    {queue.queue.length === 0 ? <i>queue empty</i> : 
                        <ol>
                            {queue.queue.map(item => (
                                <li key={item._id}>
                                    {item.name} at {item.location}
                                    <button onClick={() => removeOne(item._id)}>remove</button>
                                </li>
                            ))}
                        </ol>}
                </div>
               
                
            </div>
        )
    }

    return (
        <div>
            User View
            <div>
                Share: <input type='text' value={window.location.href} readOnly></input>
                <button onClick={copyQueueLink}>copy link</button>
            </div>
            <div>
                <h2>name: {queue.name}</h2>
            </div>
            <div>
                date created: {queue.date.slice(0, 9)}
            </div>
            <form onSubmit={updateQueue}>
                <h2>Join queue</h2>
                <div>
                    name: <input type='text' value={name} onChange={handleNameChange} required></input>
                </div>
                <div>
                    location: <input type='text' value={location} onChange={handleLocationChange} placeholder='optional'></input>
                </div>
                <button type='submit'>Join queue</button>
            </form>
            <ol>
                {queue.queue.map(item => <li key={item._id}>{item.name} at {item.location}</li>)}
            </ol>
        </div>
    )  
  }

export default Queue