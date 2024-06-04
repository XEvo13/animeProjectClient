function EditUser({ user, setUser }) {
    const [name, setName] = useState(user.name);

    const handleEdit = () => {
        axios.put(`${API_URL}/api/users/${user._id}/edit`, { name })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Failed to edit user");
            });
    };

    return (
        <div>
            <h2>Edit User</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleEdit}>Save</button>
        </div>
    );
}