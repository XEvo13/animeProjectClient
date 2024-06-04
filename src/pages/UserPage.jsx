import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import FriendsList from "../components/FriendsList";
import AllUsersList from "../components/AllUsersList";
import FriendsActions from "../components/FriendsActions";

const API_URL = "http://localhost:5005";

export default function UserPage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`${API_URL}/api/${userId}`)
                .then(response => {
                    console.log(response.data)
                    setUser(response.data);
                })
                .catch(error => {
                    setErrorMessage("Failed to fetch user data");
                });

            axios.get(`${API_URL}/api/users/all`)
                .then(response => {
                    setAllUsers(response.data);
                })
                .catch(error => {
                    setErrorMessage("Failed to fetch all users");
                });
        }
    }, [userId, isLoggedIn]);

    const handleAddFriend = (friendId) => {
        axios.put(`${API_URL}/api/${userId}/friend/${friendId}`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                // console.error("Failed to add friend");
                setErrorMessage("Failed to add friend");
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            
            <div className="UserPage">
                <h1>{user.name}'s Page</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Email: {user.email}</p>
                <p>Friends: {user.friends.length}</p>
                <p>Animes: {user.animes.length}</p>

                
                <FriendsList friends={user.friends} />
                <AllUsersList allUsers={allUsers} userFriends={user.friends} addFriend={handleAddFriend} />
                <FriendsActions userId={userId}/>
            </div>
        </>
    );
}
