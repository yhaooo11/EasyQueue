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
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleJoin}>Join</button>
        </div>
    )
}

export default Home