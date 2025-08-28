import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AlreadySignedRoute = ({ children }) => {
    const { token } = useAuth();
    return (
        <div>
            {!token ? children : <Navigate to="/" />}
        </div>
    )
}

export default AlreadySignedRoute
