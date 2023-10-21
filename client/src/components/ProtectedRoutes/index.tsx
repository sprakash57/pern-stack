import { useAuthContext } from 'globals/context/auth';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthUser } = useAuthContext();
    const location = useLocation();

    return isAuthUser ? children : <Navigate to='/' state={{ from: location }} />
}

export default ProtectedRoutes
