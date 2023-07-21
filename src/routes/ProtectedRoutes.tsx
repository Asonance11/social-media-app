import { Navigate } from 'react-router-dom';
import UserAuth from '../context/AuthContext';

interface Props {
	children: JSX.Element;
}

function ProtectedRoutes({ children }: Props): JSX.Element {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
}

export default ProtectedRoutes;
