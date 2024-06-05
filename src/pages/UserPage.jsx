import React, { useState, useEffect, useContext } from "react";
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
    const [recentComments, setRecentComments] = useState([]);
    const [recentRatings, setRecentRatings] = useState([]);
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

            axios.get(`${API_URL}/api/${userId}/feeds`)
                .then(response => {
                    setRecentComments(response.data.comments);
                    setRecentRatings(response.data.ratings);
                })
                .catch(error => {
                    setErrorMessage("Failed to fetch recent feeds");
                });
        }
    }, [userId, isLoggedIn]);

    const handleAddFriend = (friendId) => {
        axios.put(`${API_URL}/api/${userId}/friend/${friendId}`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                setErrorMessage("Failed to add friend");
            });
    };

    const handleFeeds = () => {
        // Combine comments and ratings by anime title and create a unique feed list
        const feeds = recentComments.map(comment => {
            const rating = recentRatings.find(rating => rating.anime.title === comment.anime.title);
            return {
                anime: comment.anime,
                comment: comment.content,
                rating: rating ? rating.score : null,
            };
        }).filter((feed, index, self) =>
            index === self.findIndex(f => f.anime.title === feed.anime.title)
        ).slice(0, 3); // Ensure unique animes and limit to 3

        return feeds;
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const feeds = handleFeeds();

    return (
        <div className="UserPage p-4">
            <h1 className="text-2xl font-bold mb-4">{user.name}'s Page</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex flex-col mb-8">
                <p>Email: {user.email}</p>
                <p>Friends: {user.friends.length}</p>
                <p>Animes: {user.animes.length}</p>
            </div>

            <div className="flex flex-col mb-8">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">User Feeds</h2>
                    {feeds.map(feed => (
                        <div key={feed.anime._id} className="mb-4">
                            <p><strong>Anime:</strong> {feed.anime.title}</p>
                            <p><strong>Comment:</strong> {feed.comment}</p>
                            {feed.rating && <p><strong>Rating:</strong> {feed.rating}</p>}
                        </div>
                    ))}
                </div>
            </div>



            <div className="flex flex-row justify-between">
                <div className="w-1/4">
                    <h2 className="text-xl font-semibold mb-2">Friends List</h2>
                    <FriendsList friends={user.friends} />
                </div>

                <div className="w-1/2 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-2">Friends Actions</h2>
                    <FriendsActions userId={userId} />
                </div>

                <div className="w-1/4">
                    <h2 className="text-xl font-semibold mb-2">Add Friends</h2>
                    <AllUsersList allUsers={allUsers} userFriends={user.friends} addFriend={handleAddFriend} />
                </div>
            </div>
        </div>
    );
}
