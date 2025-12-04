import React, { useState, useRef, useEffect } from 'react';

const MultiSelectFields = ({ fields = ['ID', 'Name', 'Category', 'Status', 'Last Updated'] }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(fields.slice()); // default: all selected (Show All Fields)
	const rootRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (rootRef.current && !rootRef.current.contains(e.target)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleOption = (opt) => {
		setSelected((prev) => {
			if (prev.includes(opt)) return prev.filter((p) => p !== opt);
			return [...prev, opt];
		});
	};

	const toggleAll = () => {
		if (selected.length === fields.length) setSelected([]);
		else setSelected(fields.slice());
	};

	const label = selected.length === fields.length ? 'Show All Fields' : selected.join(', ');

	return (
		<div className='relative' ref={rootRef}>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				className='w-full text-left h-8 px-3 rounded-lg border border-gray-300 bg-white flex items-center justify-between focus:ring-indigo-500 focus:border-indigo-500'
				aria-haspopup='listbox'
				aria-expanded={open}
			>
				<span className='text-sm text-gray-700'>{label}</span>
				<span className='material-symbols-outlined text-gray-500'>{open ? 'expand_less' : 'expand_more'}</span>
			</button>

			{open && (
				<div className='absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg'>
					<div className='p-3 border-b border-gray-100'>
						<label className='inline-flex items-center gap-2 text-sm'>
							<input
								type='checkbox'
								checked={selected.length === fields.length}
								onChange={toggleAll}
								className='h-4 w-4 rounded border-gray-300'
							/>
							<span className='text-gray-700'>Select all</span>
						</label>
					</div>

					<ul className='max-h-48 overflow-auto p-2 space-y-1'>
						{fields.map((opt) => (
							<li key={opt}>
								<label className='flex items-center justify-between gap-3 rounded px-2 py-2 hover:bg-gray-50 cursor-pointer'>
									<div className='flex items-center gap-3'>
										<input
											type='checkbox'
											checked={selected.includes(opt)}
											onChange={() => toggleOption(opt)}
											className='h-4 w-4 rounded border-gray-300'
										/>
										<span className='text-sm text-gray-700'>{opt}</span>
									</div>
									{/* show small tick when selected (optional) */}
									{selected.includes(opt) && <span className='text-xs text-green-600'>selected</span>}
								</label>
							</li>
						))}
					</ul>

					<div className='flex items-center justify-end gap-2 p-2 border-t border-gray-100'>
						<button
							type='button'
							onClick={() => {
								setOpen(false);
							}}
							className='px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-50'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MultiSelectFields;
