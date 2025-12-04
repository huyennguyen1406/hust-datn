import React from 'react';

const map = {
	Active: 'bg-green-100 text-green-800',
	Pending: 'bg-yellow-100 text-yellow-800',
	Archived: 'bg-red-100 text-red-800',
};

const StatusBadge = ({ status }) => {
	const cls = map[status] || 'bg-gray-100 text-gray-800';
	return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>{status}</span>;
};

export default StatusBadge;
