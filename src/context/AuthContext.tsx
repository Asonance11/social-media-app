import {
	Auth,
	User,
	UserCredential,
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

export interface AuthContextModel {
	auth: Auth;
	user: User | null;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	signUp: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextModel>(
	{} as AuthContextModel
);
export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	function signUp(email: string, password: string): Promise<UserCredential> {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function signIn(email: string, password: string): Promise<UserCredential> {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout(): Promise<void> {
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
		signUp,
		signIn,
		logout,
		user,
		auth,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function UserAuth(): AuthContextModel {
	return useContext(AuthContext);
}
