import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
	children: JSX.Element;
}

function ProtectedRoutes({ children }: Props): JSX.Element {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
}

export default ProtectedRoutes;
