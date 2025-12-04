// src/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IncompleteCircleIcon from '@mui/icons-material/IncompleteCircle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from '@tanstack/react-router';

export default function Sidebar() {
	// select current pathname from router state
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();

	// helpers
	const isActive = (path) => pathname === path;
	const anyActiveIn = (paths = []) => paths.some((p) => pathname === p);

	// If a route inside the group is active, force group to be expanded
	const managementPaths = ['/categories', '/products'];
	const statisticPaths = ['/statistic'];

	const [managementOpen, setManagementOpen] = useState(() => anyActiveIn(managementPaths));
	const [statisticOpen, setStatisticOpen] = useState(() => anyActiveIn(statisticPaths));

	const sideBarData = [
		{
			name: 'management',
			icon: <TableRowsIcon fontSize='small' className='text-indigo-700' />,
			state: managementOpen,
			stateHook: setManagementOpen,
			paths: managementPaths,
			children: [
				{ label: 'Category', to: '/categories', icon: <FolderIcon fontSize='small' className='text-gray-500' /> },
				{ label: 'Product', to: '/products', icon: <FolderIcon fontSize='small' className='text-gray-500' /> },
			],
		},
		{
			name: 'statistic',
			icon: <IncompleteCircleIcon fontSize='small' className='text-indigo-700' />,
			state: statisticOpen,
			stateHook: setStatisticOpen,
			paths: statisticPaths,
			children: [{ label: 'Overview', to: '/statistic', icon: <FolderIcon fontSize='small' className='text-gray-500' /> }],
		},
	];

	const handleOnLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('auth_token');
		navigate({ to: '/' });
	};

	return (
		<aside className='w-64 bg-white flex flex-col flex-shrink-0 border-r border-gray-200'>
			<div className='px-6 py-4 flex items-start gap-3 border-b border-gray-200'>
				<div className='flex flex-col'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center'>
							<span className='material-symbols-outlined text-white text-lg'>admin_panel_settings</span>
						</div>
						<h1 className='text-xl font-bold text-gray-900'>Admin Panel</h1>
					</div>

					<div className='flex items-center gap-2 mt-2'>
						<button className='flex items-center gap-2 p-2 rounded-full text-gray-500 hover:bg-gray-100'>
							<img
								alt='ENG Flag'
								className='w-5 h-5 rounded-full object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuCUosZnNLDtaiG0d2auEk2OTWohEjyh4LdfvlG4H9J4rhypfPfK-I8k4_A61PoOP-8Io2vucNZPKp0xUTtL-qNUusJ7IyaDMFl-GkludP3gwrcX51gMF_NlFyoB6dKvxFywCBfqsrmxMuEhrSR6cqitzaNUr5QpiIRiymbADw8YjLx00KmftG7yBtY3R3w1Yqkot2oUQcB0EHaGYU1GilI0LPOnrW5BNAo9Stb3MuThhM1Sh-nYwR9Z7QWIeZZniL1Lctf1SKoLlQBr'
							/>
						</button>
					</div>
				</div>
			</div>

			<nav className='flex-1 px-4 py-4 space-y-2'>
				{sideBarData.map((section) => {
					const isExpanded = section.state;

					return (
						<div key={section.name} className='mb-2'>
							{/* Header */}
							<div
								className='flex items-center justify-start pl-1 pr-2 py-2 cursor-pointer'
								onClick={() => section.stateHook((s) => !s)}
							>
								<KeyboardArrowDownIcon
									className={`
						mr-2 transform transition-transform duration-300
						${isExpanded ? 'rotate-0 text-indigo-700' : 'rotate-180 text-gray-400'}
					`}
								/>

								{section.icon}

								<span className='ml-2 text-lg font-semibold text-indigo-700 uppercase'>{section.name}</span>
							</div>

							{/* Children */}
							{isExpanded && (
								<>
									{section.children.map((child) => (
										<Link
											key={child.to}
											to={child.to}
											className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
												isActive(child.to) ? 'bg-indigo-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
											}`}
										>
											{child.icon}

											<span>{child.label}</span>
										</Link>
									))}
								</>
							)}
						</div>
					);
				})}
			</nav>

			<div className='px-4 py-4 border-t border-gray-200'>
				<div className='flex items-center gap-3'>
					<img
						alt='User avatar'
						className='h-10 w-10 rounded-full object-cover'
						src='https://lh3.googleusercontent.com/aida-public/AB6AXuAa0Pw-zeDBa5teSCOmHBpM-kchB9C1W9lE4HpMTnONGDCb8wpaWtjrxwnwXoc53zXo-RaGz5e6s2nTHxSVExlOGr9CCVvckNlLFIxY9u5BW5iRAzmMKQG1MD55nO2-SEFCmKFA43Z3sn9ybeFTGAwYxldxo41MFDdL4_sxd45jOTxaf70Ab32xCPJriZcyZi37T2tgV9JuF6Kd1SAGvk35bOFEqg_w1kh-EeM-XcjU_EADfblRZQX7RMpgPJ-EjZfXaXL5Ibxtf6CR'
					/>
					<div>
						<p className='text-sm font-semibold text-gray-900'>Alex Johnson</p>
						<p className='text-xs text-gray-500'>alex.j@example.com</p>
					</div>
					<button className='ml-auto text-gray-500 hover:text-gray-700' onClick={handleOnLogout}>
						<span className='material-symbols-outlined'>logout</span>
					</button>
				</div>
			</div>
		</aside>
	);
}
