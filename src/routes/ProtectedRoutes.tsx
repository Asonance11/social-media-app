import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
	children: JSX.Element;
}

function ProtectedRoutes({ children }: Props): JSX.Element {
	const { user } = useAuth();

	return !user ? <Navigate to="/login" /> : children;
}

export default ProtectedRoutes;
