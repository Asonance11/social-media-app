import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UserAuth from '../context/AuthContext';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');

	const navigate = useNavigate();

	const { signUp } = UserAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const thisUser: any = await signUp(email, password);
			await updateProfile(thisUser.user, {
				displayName: userName,
			});
			toast.success('User signed in succesfully');
			navigate('/');
		} catch (error) {
			console.error(error);
			toast.error(`${error}`);
		}
	};

	return (
		<>
			<div className="w-full h-screen bg-white flex items-center justify-center">
				<div className="bg-gray-700 rounded min-w-[300px]">
					<form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
						action=""
						className="flex flex-col gap-2 p-4"
					>
						<input
							type="email"
							required
							placeholder="Email"
							autoComplete="email"
							className="p-2 border-[#333333] rounded w-full outline-none"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
							id="user-email"
						/>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							required
							className="p-2 border-[#333333] rounded w-full outline-none"
							onChange={(e) => {
								setUserName(e.target.value);
							}}
							value={userName}
						/>
						<input
							type="password"
							placeholder="Password"
							required
							autoComplete="current-password"
							className="p-2 border-[#333333] rounded w-full outline-none"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}
							id="password"
						/>
						<button type="submit" className="bg-green-500 rounded p-2">
							Signup
						</button>
					</form>
					<div>
						<p className="text-center">
							<span>Already created an account?</span>
							{''}
							<Link to="/login" className="hover:underline">
								{' '}
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
