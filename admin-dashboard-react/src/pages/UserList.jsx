import {useState, useEffect} from 'react';
import defaultAvatar from '../assets/default-avatar.png';
import '../styles/userList.css';



export function UserList() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/admin/get_users", {
                    method: "GET",
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error("failed to fetch users");
                }

                const data = await response.json();

                setUsers(data.users);
            } catch (error) {
                console.log("Failed to load json", error);
            }
        }

        loadUserData();
    }, [])





    return (
        <>
            <div className="user-grid">
                {users.map((user) => {
                    return (
                        <>
                            {user.role !== 'admin' && (
                                <div key={user.id} className="user-container">
                                    <img src={defaultAvatar} alt="default-pic" className="user-pic"/>
                                    <div className="user-details">
                                        <div className="user-name"><span className="title">Username: </span>{user.first_name + " " + user.last_name}</div>
                                        <div className="user-email"><span className="title">Email: </span>{user.email}</div>
                                        <div className="user-phoneno"><span className="title">Phone no: </span>{user.phone_no}</div>
                                        <div className="user-address"><span className="title">Address: </span>{user.address}</div>
                                    </div>
                                </div>
                            )}
                        </>

                    )
                })}
            </div> 
        </>
    )
}
