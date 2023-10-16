import {
	Auth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
	UserCredential,
} from 'firebase/auth';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { auth } from '../config/firebase';

interface AuthProviderProps {
	children?: ReactNode;
}

interface AuthContextValue {
	auth: Auth;
	user: User | null;
	signUp: (email: string, password: string) => Promise<UserCredential>;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
	undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	const signUp = async (
		email: string,
		password: string
	): Promise<UserCredential> => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = async (
		email: string,
		password: string
	): Promise<UserCredential> => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async (): Promise<void> => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const contextValue: AuthContextValue = {
		auth,
		user,
		signUp,
		signIn,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
