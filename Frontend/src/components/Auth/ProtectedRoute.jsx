import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { token } = useAuth();
  return (
    <div>
      {token ? children : <Navigate to="/signin" />}
    </div>
  )
}

export default ProtectedRoute
