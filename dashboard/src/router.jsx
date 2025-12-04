// router.jsx
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

import Login from './page/login/Login.jsx';
import RequireAuth from './RequireAuth.jsx';
import Management from './page/management/Management.jsx';
import Statistic from './page/statistic/Satistic.jsx';
import Sidebar from './Sidebar.jsx';
import { Outlet } from '@tanstack/react-router';
import NotFound from './page/notfound/NotFound.jsx';

function PublicLayout() {
	return (
		<div className='min-h-screen'>
			<Outlet />
		</div>
	);
}

function AppLayout() {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<main className='flex-1 overflow-auto'>
				<Outlet />
			</main>
		</div>
	);
}

export const rootRoute = createRootRoute({
	component: () => <Outlet />,
	notFoundComponent: () => <NotFound />,
});

export const publicLayoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'public',
	component: () => <PublicLayout />,
});

export const appLayoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'app',
	component: () => (
		<RequireAuth>
			<AppLayout />
		</RequireAuth>
	),
});

export const loginRoute = createRoute({
	getParentRoute: () => publicLayoutRoute,
	path: '/',
	component: () => <Login />,
});

export const categoryRoute = createRoute({
	getParentRoute: () => appLayoutRoute,
	path: '/categories',
	component: () => <Management title={'Category'} description={'Manage all categories'} />,
});

export const productRoute = createRoute({
	getParentRoute: () => appLayoutRoute,
	path: '/products',
	component: () => <Management title={'Product'} description={'Manage all products'} />,
});

export const statisticRoute = createRoute({
	getParentRoute: () => appLayoutRoute,
	path: '/statistic',
	component: () => <Statistic />,
});

const routeTree = rootRoute.addChildren([
	publicLayoutRoute.addChildren([loginRoute]),
	appLayoutRoute.addChildren([categoryRoute, productRoute, statisticRoute]),
]);

export const router = createRouter({ routeTree });
