import { Button } from 'react-bootstrap'

const Home = ({ user, navigate }) => {

    const handleCreate = () => {
        if (user) {
            navigate('/create')
        } else {
            navigate('/login-create')
        }
    }

    const handleJoin = () => {
        navigate('/join')
    }

    return (
        <div>
            <div className='card'>
                <h1>Easy Queue</h1>
                <p>
                    A free online queue maker that allows you to create and join queues.
                </p>
                <div>
                    <Button variant='primary' size='lg' className='home-button' onClick={handleCreate}>Create Queue</Button>
                </div>
                <div>
                    <Button variant='secondary' size='lg' className='home-button' onClick={handleJoin}>Join Queue</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Home