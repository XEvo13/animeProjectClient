function RemoveFriend({ userId, setUser }) {
    const [friendId, setFriendId] = useState("");

    const handleRemoveFriend = () => {
        axios.put(`${API_URL}/api/users/${userId}/unfriend/${friendId}`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error("Failed to remove friend");
            });
    };

    return (
        <div>
            <h2>Remove Friend</h2>
            <input
                type="text"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                placeholder="Friend ID"
            />
            <button onClick={handleRemoveFriend}>Remove Friend</button>
        </div>
    );
}