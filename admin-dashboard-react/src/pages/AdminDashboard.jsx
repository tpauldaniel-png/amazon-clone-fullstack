import {Sidebar} from '../components/Sidebar';
import {Outlet} from 'react-router-dom';
import '../styles/adminDashboard.css'
import {Header} from '../components/Header';

export function AdminDashboard() {
    return (
        <div className="background">
            <div className="admin-page">
                <Header />

                <div className="admin-body">
                    <Sidebar />

                    <main className="main-content">
                        <Outlet />
                    </main>
                </div>
                
            </div>
        </div>
    )
}