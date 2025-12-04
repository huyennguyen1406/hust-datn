import React, { useState, useEffect } from 'react';

const Pagination = ({ page, totalPages, onChange }) => {
	const [input, setInput] = useState(String(page));

	useEffect(() => {
		// keep input in sync when parent changes page externally
		setInput(String(page));
	}, [page]);

	const goTo = (p) => {
		const next = Math.max(1, Math.min(totalPages, Math.floor(p) || 1));
		if (next !== page) onChange(next);
	};

	// compute visible pages: only pages in [page-2, page+2] clamped
	const start = Math.max(1, page - 2);
	const end = Math.min(totalPages, page + 2);
	const visiblePages = [];
	for (let i = start; i <= end; i++) visiblePages.push(i);

	const handleInputChange = (e) => {
		// allow empty string while typing
		setInput(e.target.value.replace(/[^\d]/g, ''));
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const num = Number(input);
			if (!Number.isNaN(num)) goTo(num);
		}
	};

	return (
		<div className='flex items-center gap-4'>
			<ul className='inline-flex items-center -space-x-px'>
				{/* Previous */}
				<li>
					<button
						aria-label='Previous page'
						disabled={page === 1}
						onClick={() => onChange(Math.max(1, page - 1))}
						className={`px-3 py-2 ml-0 leading-tight border rounded-l-lg 
            ${
				page === 1
					? 'text-gray-300 bg-gray-100 cursor-default'
					: 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
			}`}
					>
						Previous
					</button>
				</li>

				{/* Visible page numbers */}
				{visiblePages.map((p) => (
					<li key={p}>
						<button
							onClick={() => onChange(p)}
							aria-current={p === page ? 'page' : undefined}
							className={
								p === page
									? 'z-10 px-3 py-2 leading-tight text-indigo-700 bg-indigo-100 border border-indigo-300'
									: 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
							}
						>
							{p}
						</button>
					</li>
				))}

				{/* Next */}
				<li>
					<button
						aria-label='Next page'
						disabled={page === totalPages}
						onClick={() => onChange(Math.min(totalPages, page + 1))}
						className={`px-3 py-2 leading-tight border rounded-r-lg 
            ${
				page === totalPages
					? 'text-gray-300 bg-gray-100 cursor-default'
					: 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
			}`}
					>
						Next
					</button>
				</li>
			</ul>

			{/* Optional page jump control */}
			<div className='flex items-center gap-2'>
				<label htmlFor='pagination-jump' className='sr-only'>
					Go to page
				</label>

				<input
					id='pagination-jump'
					type='text'
					inputMode='numeric'
					pattern='[0-9]*'
					value={input}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					className='w-20 h-8 px-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
				/>

				<button
					type='button'
					onClick={() => {
						const num = Number(input);
						if (!Number.isNaN(num)) goTo(num);
					}}
					className='px-3 py-1 h-8 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition'
				>
					Go
				</button>

				<div className='text-sm text-gray-500 ml-2'>
					/ <span className='font-medium text-gray-700'>{totalPages}</span>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
