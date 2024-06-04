// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/auth.context'; // Adjust the import path as necessary

// const API_URL = "http://localhost:5005";

// function UserComments() {
//     const [comments, setComments] = useState([]);
//     const [errorMessage, setErrorMessage] = useState(null);
//     const { user } = useContext(AuthContext); // Access the user from the context

//     useEffect(() => {
//         if (user) {
//             axios.get(`${API_URL}/api/comments/user/${user._id}`)
//                 .then(response => {
//                     setComments(response.data);
//                 })
//                 .catch(error => {
//                     setErrorMessage("Failed to fetch comments");
//                 });
//         }
//     }, [user]);

//     const handleDeleteComment = (commentId) => {
//         axios.delete(`${API_URL}/api/comments/${commentId}`)
//             .then(response => {
//                 setComments(comments.filter(comment => comment._id !== commentId));
//             })
//             .catch(error => {
//                 setErrorMessage("Failed to delete comment");
//             });
//     };

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>User Comments</h2>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <ul>
//                 {comments.map(comment => (
//                     <li key={comment._id}>
//                         <p>{comment.content}</p>
//                         <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default UserComments;
