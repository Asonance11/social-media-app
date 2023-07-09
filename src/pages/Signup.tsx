import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserAuth from '../context/AuthContext';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const { signup } = UserAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await signup(email, password);
			navigate('/');
		} catch (error) {
			console.error(error);
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
