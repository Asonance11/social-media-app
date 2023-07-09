import {
	User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { auth } from '../config/firebase';

interface Props {
	children?: ReactNode;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	function signup(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function signin(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const value = {
		signup,
		signin,
		logout,
		user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function UserAuth() {
	return useContext(AuthContext);
}
