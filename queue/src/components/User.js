const User = ({ user }) => {

    if (!user) {
        return (
            <div>
                not logged in!
            </div>
        )
    } else {
        return (
            <div>
                <h2>{user.name}</h2>
                <h3>{user.username}</h3>
                My queues:
                <ul>
                    {user.queues.map(queue => <li key={queue.id}>{queue.name}</li>)}
                </ul>
            </div>
        )
    }   
}

export default User