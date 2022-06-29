import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {

    if (!user) {
        return (
            <div>
                not logged in!
            </div>
        )
    } else {
        return (
            <div className='mt'>
                {user.name && <h2>Welcome {user.name}!</h2>}
                <h4>Username: {user.username}</h4>
                <div className='mt'>
                    My queues:
                    <div>
                        <Table striped>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Date created</th>
                                
                            </tr>
                            {
                                user.queues.map(item => 
                                    <tr key={item._id}>
                                        <td>
                                            <Link to={`/queue/${item.id}`}>{item.name}</Link>
                                        </td>
                                        <td>
                                            {item.date.slice(0, 9)}
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }   
}

export default User