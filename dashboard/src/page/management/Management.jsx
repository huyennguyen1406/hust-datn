import React from 'react';
import { useState } from 'react';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, InputBase } from '@mui/material';
import MultiSelectFields from './component/MultiSelectFields';
import Pagination from './component/Pagination';
import StatusBadge from './component/StatusBadge';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/** Sample data */
const rows = [
	{ id: '#1024', name: 'Project Alpha', category: 'Web Development', status: 'Active', date: '2023-10-26' },
	{ id: '#1025', name: 'Marketing Campaign Q4', category: 'Marketing', status: 'Pending', date: '2023-10-25' },
	{ id: '#1026', name: 'Mobile App Redesign', category: 'Design', status: 'Active', date: '2023-10-22' },
	{ id: '#1027', name: 'API Integration', category: 'Backend', status: 'Archived', date: '2023-09-15' },
	{ id: '#1028', name: 'Server Migration', category: 'Infrastructure', status: 'Active', date: '2023-10-28' },
];

export default function Management({ title, description }) {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<main className='flex-1 flex flex-col overflow-hidden'>
			<header className='flex justify-between items-center p-8 pb-0'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
					<p className='text-gray-600 mt-1'>{description}</p>
				</div>

				<div className='flex items-center gap-4'>
					<button className='flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors'>
						<span className='material-symbols-outlined'>add</span>
						<span className='text-white font-semibold'>New Entity</span>
					</button>
					<button className='flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors'>
						<span className='material-symbols-outlined'>add</span>
						<span className='text-white font-semibold'>Import from csv</span>
					</button>
				</div>
			</header>

			<div className='p-8 flex-1 overflow-y-auto'>
				<div className='bg-white rounded-lg shadow-md overflow-hidden'>
					<div className='p-4 bg-white border-b border-gray-200'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-start'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='select-fields'>
									Select Fields
								</label>
								<div className='gap-2'>
									<MultiSelectFields />
								</div>
								<button className='mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition'>
									<span>Apply</span>
								</button>
							</div>

							<div className='md:col-span-2'>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Filter by Field</label>
								<div className='space-y-3 mb-2'>
									<div className='flex items-center gap-2'>
										<select className='w-1/4 h-8 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'>
											<option>Name</option>
											<option>Category</option>
											<option>Status</option>
											<option>ID</option>
										</select>
										<select className='w-1/4 h-8 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'>
											<option>equals</option>
											<option>contains</option>
										</select>
										<input
											className='w-1/2 h-8  px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
											placeholder='Enter value...'
										/>

										<button className='h-8 w-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-500'>
											<span className='material-symbols-outlined text-lg'>remove</span>
										</button>
									</div>
								</div>
								<div className='space-y-3 mb-2'>
									<div className='flex items-center gap-2'>
										<select className='w-1/4 h-8 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'>
											<option>Name</option>
											<option>Category</option>
											<option>Status</option>
											<option>ID</option>
										</select>
										<select className='w-1/4 h-8 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'>
											<option>equals</option>
											<option>contains</option>
										</select>
										<input
											className='w-1/2 h-8 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
											placeholder='Enter value...'
										/>

										<button className='h-8 w-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-500'>
											<span className='material-symbols-outlined text-lg'>remove</span>
										</button>
									</div>
								</div>
								<button className='mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700'>
									<span className='material-symbols-outlined text-lg'>add_circle</span>
									<span>Add Filter</span>
								</button>
							</div>
						</div>
					</div>

					{/* Table: use MUI Table components but style via Tailwind (light) */}
					<TableContainer component={Box}>
						<Table className='min-w-full text-sm text-left text-gray-600' aria-label='entities table'>
							<TableHead>
								<TableRow className='text-xs text-gray-700 uppercase bg-gray-50'>
									<TableCell className='px-6 py-3'>
										<div className='flex items-center'>
											ID
											<button className='ml-1 text-gray-400 hover:text-gray-600'>
												<span className='material-symbols-outlined text-sm'>unfold_more</span>
											</button>
										</div>
									</TableCell>
									<TableCell className='px-6 py-3'>
										<div className='flex items-center'>
											Name
											<button className='ml-1 text-gray-400 hover:text-gray-600'>
												<span className='material-symbols-outlined text-sm'>unfold_more</span>
											</button>
										</div>
									</TableCell>
									<TableCell className='px-6 py-3'>
										<div className='flex items-center'>
											Category
											<button className='ml-1 text-gray-400 hover:text-gray-600'>
												<span className='material-symbols-outlined text-sm'>unfold_more</span>
											</button>
										</div>
									</TableCell>
									<TableCell className='px-6 py-3'>
										<div className='flex items-center'>
											Status
											<button className='ml-1 text-gray-400 hover:text-gray-600'>
												<span className='material-symbols-outlined text-sm'>unfold_more</span>
											</button>
										</div>
									</TableCell>
									<TableCell className='px-6 py-3'>
										<div className='flex items-center'>
											Last Updated
											<button className='ml-1 text-gray-400 hover:text-gray-600'>
												<span className='material-symbols-outlined text-sm'>unfold_more</span>
											</button>
										</div>
									</TableCell>
									<TableCell className='px-6 py-3 text-right'>Actions</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{rows.map((r, idx) => {
									const last = idx === rows.length - 1;
									return (
										<TableRow key={r.id} hover className={`${last ? '' : 'border-b'} bg-white hover:bg-gray-50`}>
											<TableCell component='th' scope='row' className='px-6 py-4 font-medium text-gray-900'>
												{r.id}
											</TableCell>
											<TableCell className='px-6 py-4 text-gray-800'>{r.name}</TableCell>
											<TableCell className='px-6 py-4 text-gray-800'>{r.category}</TableCell>
											<TableCell className='px-6 py-4'>
												<StatusBadge status={r.status} />
											</TableCell>
											<TableCell className='px-6 py-4 text-gray-600'>{r.date}</TableCell>
											<TableCell className='px-6 py-4 text-right'>
												<button className='text-indigo-600 hover:underline'>Edit</button>
												<button className='text-red-600 hover:underline ml-4'>Delete</button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>

					<nav aria-label='Table navigation' className='flex items-center justify-between p-4 bg-white border-t border-gray-200'>
						<div className='text-sm font-normal text-gray-600'>
							<span>Size: </span>
							<select
								className='h-8 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
								id='select-fields'
							>
								<option>10</option>
								<option>20</option>
								<option>30</option>
								<option>40</option>
							</select>
						</div>
						<div className='text-sm font-normal text-gray-600'>
							Showing <span className='font-semibold text-gray-900'>1-5</span> of{' '}
							<span className='font-semibold text-gray-900'>100</span>
						</div>
						<Pagination totalPages={10} page={currentPage} onChange={setCurrentPage} />
					</nav>
				</div>
			</div>
		</main>
	);
}
