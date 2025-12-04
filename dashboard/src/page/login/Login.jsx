// src/components/Login.jsx
import React from 'react';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from '@tanstack/react-router';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate(); // <-- call hook at top-level

	const togglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('auth_token', 'auth_token');
		navigate({ to: '/products' });
	};

	return (
		<div className='min-h-screen font-display bg-[#071021] text-slate-200 flex items-center justify-center px-6'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl items-center py-12'>
				{/* LEFT SIDE */}
				<aside className='lg:col-span-7 flex items-center lg:justify-start justify-center lg:text-left text-center'>
					<div className='max-w-lg pl-4 lg:pl-12'>
						<div className='flex items-center gap-4 mb-6 lg:justify-start justify-center lg:text-left text-center'>
							<div className='h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md'>
								<GppGoodOutlinedIcon fontSize='large' />
							</div>
							<span className='text-2xl lg:text-4xl ext-slate-200 font-bold'>System Admin</span>
						</div>

						<h1 className='text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4'>Admin Dashboard</h1>
						<p className='text-slate-400 text-lg'>Secure access for authorized personnel.</p>
					</div>
				</aside>

				{/* RIGHT SIDE - LOGIN CARD */}
				<main className='lg:col-span-5 flex items-center justify-center'>
					<div className='w-full max-w-md'>
						<div className='bg-[#0f232f] border border-[#17313b] rounded-2xl p-8 shadow-lg'>
							<h2 className='text-3xl font-bold text-white mb-2'>Sign In</h2>
							<p className='text-slate-400 mb-6'>Welcome back, please enter your details.</p>

							<form className='space-y-5' onSubmit={handleOnSubmit}>
								<div>
									<label className='block text-sm font-medium text-slate-300 mb-2'>Username</label>
									<input
										type='text'
										placeholder='Enter your username'
										className='w-full bg-[#071928] border border-[#19303a] rounded-lg px-4 py-3 placeholder:text-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-slate-300 mb-2'>Password</label>
									<div className='relative'>
										<input
											type={showPassword ? 'text' : 'password'}
											placeholder='Enter your password'
											className='w-full bg-[#071928] border border-[#19303a] rounded-lg px-4 py-3 placeholder:text-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 pr-12'
										/>
										<button
											type='button'
											aria-label={showPassword ? 'Hide password' : 'Show password'}
											className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400'
											onClick={() => togglePassword()}
										>
											{showPassword ? <VisibilityOffIcon fontSize='large' /> : <VisibilityIcon fontSize='large' />}
										</button>
									</div>
								</div>

								<button
									type='submit'
									className='w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md'
								>
									Login
								</button>
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
