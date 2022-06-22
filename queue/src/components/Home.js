const Home = ({ user, navigate }) => {

    const handleCreate = () => {
        if (user) {
            navigate('/create')
        } else {
            navigate('/login-create')
        }
    }

    return (
        <div>
            <button onClick={handleCreate}>Create</button>
            <button onClick={console.log('join')}>Join</button>
        </div>
    )
}

export default Home