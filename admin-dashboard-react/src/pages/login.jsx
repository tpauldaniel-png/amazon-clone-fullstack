import amazonLogo from '../assets/amazon-logo.png';
import './login.css';



export function LoginPage() {
    return (
        <>
            <div className="amazon-header">
                <img src={amazonLogo} className="amazon-logo" />
            </div>

            <div className="form-container">

                <form id="custom-login-form">
                    <h1>Admin Login</h1>

                    <div>
                        <label for="username">Email</label>
                    </div>
                    <div>
                        <input type="email" name="username" id="username" placeholder="Enter your email here" autofocus required />
                    </div>
                    <br />

                    <div>
                        <label for="password">Password</label>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Enter your password here" required />
                    </div>
                    <br />

                    <div>
                        <button type="submit" className="button">Login</button>
                    </div>
                    <br />

                    <p>New to Amazon?</p>
                    <div>
                        <a href="/frontend/register.html">Create your Amazon Account</a>
                    </div>
                </form>
            </div>
        </>
    );
}


