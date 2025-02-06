import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
};

export default UserProfile;
