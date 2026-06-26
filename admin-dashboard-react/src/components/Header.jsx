import {Link} from 'react-router-dom';
import amazonLogo from '../assets/amazon-logo.png'
import './header.css';

export function Header() {
    return (
        <>
            <div className="amazon-header">
                <img src={amazonLogo} className="amazon-logo" />
                
                <Link to="/" className="logout-link">Logout</Link>
                
            </div>

            
        </>
    )
}