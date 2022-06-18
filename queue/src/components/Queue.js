import { useState, useEffect } from 'react'
import {
  useParams
} from 'react-router-dom'

const Queue = ({ queueService, user }) => {
    const [queue, setQueue] = useState(null)
    const id = useParams().id
    
    useEffect(() => {
        queueService.getOne(id).then(queue => {
            console.log(queue)
            setQueue(queue)
        })
    }, [id, queueService])

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
        <ul>
            {queue.queue.map(item => <li key={item._id}>{item.name}</li>)}
        </ul>
      </div>
    )
  }

export default Queue