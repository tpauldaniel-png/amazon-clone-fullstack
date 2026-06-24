import {useState} from 'react';
import amazonLogo from '../assets/amazon-logo.png';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/login.css';



export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:8000/login/", {
            method : "POST",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body : new URLSearchParams({
                username : email,
                password : password
            })
        });

        if (!response.ok) {
            alert("Invalid credentials");
            return;
        }


        const data = await response.json();

      

        if (data.role !== "admin") {
            alert("Only admin can access this dashboard");
            return;
        }

        localStorage.setItem("adminToken", data.access_token);
        localStorage.setItem("role", data.role);

        navigate("/admin");


    }



    return (
        <>
            <div className="amazon-header">
                <img src={amazonLogo} className="amazon-logo" />
            </div>

            <div className="form-container">

                <form id="custom-login-form" onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>

                    <div>
                        <label htmlFor="username">Email</label>
                    </div>
                    <div>
                        <input type="email" name="username" id="username" placeholder="Enter your email here" autoFocus required 
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Enter your password here" required 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <br />

                    <div>
                        <button type="submit" className="button">Login</button>
                    </div>
                    <br />

                    
                </form>
            </div>
        </>
    );
}


