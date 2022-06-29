import { useState, useEffect } from 'react'
import {
  useParams
} from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const Queue = ({ queueService, user, socket }) => {
    const [queue, setQueue] = useState(null)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const id = useParams().id
    
    useEffect(() => {
        queueService.getOne(id).then(queue => {
            setQueue(queue)
        })
        if (socket) {
            console.log(socket)
            socket.emit('join-queue', id)
            socket.on('send-queue', (data) => {
                setQueue(data)
            })
        }
    }, [id, queueService, socket])

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
        socket.emit('update-queue', response, id)

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
            socket.emit('update-queue', response, id)
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
        socket.emit('update-queue', response, id)
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
                <h5 style={{marginTop: '1rem'}}>Creator View</h5>
                <div className='queue-card'>
                    <div>
                        <h2>{queue.name}</h2>
                    </div>
                    <div className='queue-info'>
                        <div>
                            {queue.description}
                        </div>
                        <div>
                            date created: {queue.date.slice(0, 9)}
                        </div>
                        <div>
                            id: {queue.id}
                        </div>
                    </div>
                    
                    <div>
                        Share <input className='share' type='text' value={window.location.href} readOnly id='link'></input>
                        <Button variant='secondary' onClick={copyQueueLink}>Copy link</Button>
                    </div>
                    
                    <div>
                        <Button variant='primary' onClick={removeFirst}>Remove first</Button>
                    </div>     
                </div>

                <div>
                    {
                        queue.queue.length === 0 ? <h3>Queue empty!</h3> :
                        <Table striped>
                        <tbody>
                            <tr>
                                <th>Position</th>
                                <th>Name</th>
                                <th>Location</th>
                            </tr>
                            {
                                queue.queue.map(item => 
                                    <tr key={item._id}>
                                        <td>
                                            {queue.queue.indexOf(item) + 1}
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.location}
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </Table>
                    }
                    
                </div>
            </div>
            
        )
    }

    return (
        <div>
            <h5 style={{marginTop: '1rem'}}>User View</h5>
            <div className='queue-card' style={{marginBottom: '2rem'}}>
                <div>
                    <h2>{queue.name}</h2>
                </div>
                <div className='queue-info'>
                    <div>
                        {queue.description}
                    </div>
                    <div>
                        date created: {queue.date.slice(0, 9)}
                    </div>
                    <div>
                        id: {queue.id}
                    </div>
                </div>
                
                <div>
                    Share <input className='share' type='text' value={window.location.href} readOnly id='link'></input>
                    <Button variant='secondary' onClick={copyQueueLink}>Copy link</Button>
                </div>   
            </div>

            <div className='queue-card' style={{marginTop: '0px'}}>
                
                <form onSubmit={updateQueue}>
                    <h2>Join queue</h2>
                    <div>
                        Name <input className='join-input' type='text' value={name} onChange={handleNameChange} required></input>
                    </div>
                    <div>
                        Location <input className='join-input' type='text' value={location} onChange={handleLocationChange} placeholder='optional'></input>
                    </div>
                    {/* <button type='submit'>Join queue</button> */}
                    <Button type='submit' variant='primary'>Join queue</Button>
                </form>
            </div>

            <div>
                {
                        queue.queue.length === 0 ? <h3>Queue empty!</h3> :
                        <Table striped>
                        <tbody>
                            <tr>
                                <th>Position</th>
                                <th>Name</th>
                                <th>Location</th>
                            </tr>
                            {
                                queue.queue.map(item => 
                                    <tr key={item._id}>
                                        <td>
                                            {queue.queue.indexOf(item) + 1}
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.location}
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </Table>
                    }
            </div>
        </div>
    )  
  }

export default Queue