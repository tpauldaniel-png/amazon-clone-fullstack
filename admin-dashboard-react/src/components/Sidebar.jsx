import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './sidebar.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListIcon from '@mui/icons-material/List';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import ProfilePic from '../assets/emoji-man.avif';


export function Sidebar() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        async function loadUserData () {
            try {
                const response = await fetch("http://127.0.0.1:8000/users/me", {
                    method: "GET",
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    } 
                });

                if (!response.ok) {
                    throw new Error("failed to fetch user");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.log("Failed to load json", error);
            }
        }
        loadUserData();
    }, [])

    

    return (
        <div className="sidebar-container">
            <div className="admin-profile">
                <img src={ProfilePic} alt="admin profile pic"/>
                <h3>Hello {user?.first_name}</h3>
                <p>{user?.email}</p>

            </div>

            <ul className="sidebar-list">
                <li className="row"><AddCircleIcon /><Link to="/admin/addProduct" >Add Product</Link></li>
                <li className="row"><EditSharpIcon /><Link to="/admin/updateProduct">Update Product</Link></li>
                <li className="row"><DeleteForeverIcon /><Link to="/admin/deleteProduct">Delete Product</Link></li>
                <li className="row"><ListIcon /><Link to="/admin/productList">Product List</Link></li>
                <li className="row"><ShoppingBagIcon /><Link to="/admin/orderList">Order List</Link></li>
                <li className="row"><PeopleIcon /><Link to="/admin/userList">User List</Link></li>
            </ul>
        </div>
    )
}