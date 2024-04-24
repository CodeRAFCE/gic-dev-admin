import {Suspense, lazy} from "react";
import {Navigate, useRoutes, useLocation} from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";

// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

// config
import {PATH_AFTER_LOGIN} from "../config";

// components
import LoadingScreen from "../components/LoadingScreen";
import SuperAdminGuard from "src/guards/SuperAdminGuard";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const {pathname} = useLocation();

	return (
		<Suspense fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}>
			<Component {...props} />
		</Suspense>
	);
};

export default function Router() {
	return useRoutes([
		{
			path: "/",
			element: (
				<GuestGuard>
					<Navigate to="/auth/login" replace />,
				</GuestGuard>
			),
		},

		{
			path: "auth",
			children: [
				{
					path: "login",
					element: (
						<GuestGuard>
							<Login />
						</GuestGuard>
					),
				},
				{path: "verify/:token", element: <CreatePassword />},
				{path: "reset-password", element: <ResetPassword />},
				{path: "reset-password/:token", element: <CreatePassword />},
			],
		},

		// Dashboard Routes
		{
			path: "dashboard",
			element: (
				// <AuthGuard>
					<DashboardLayout />
				// </AuthGuard>
			),

			children: [
				// DASHBOARD
				{element: <Navigate to={PATH_AFTER_LOGIN} replace />},
				{index: true, element: <GeneralAnalytics />},

				// PRODUCTS
				{
					path: "products",
					children: [
						{element: <Navigate to="/dashboard/products/list" replace />, index: true},
						{path: "new", element: <ProductCreate />},
						{path: "list", element: <ProductList />},
						{path: ":productId/edit", element: <ProductCreate />},
					],
				},

				// CUSTOMERS
				{
					path: "customers",
					children: [
						{element: <Navigate to="/dashboard/customers/list" replace />, index: true},
						{path: "new", element: <UserCreate />},
						{path: "list", element: <UserList />},
						{path: ":userId/edit", element: <UserCreate />},
					],
				},

				// ORDERS
				{
					path: "orders",
					children: [
						{element: <Navigate to="/dashboard/orders/list" replace />, index: true},
						{path: "list", element: <OrderList />},
						{path: ":orderId", element: <OrderView />},
					],
				},

				// BLOG
				{
					path: "blog",
					children: [
						{element: <Navigate to="/dashboard/blog/posts" replace />, index: true},
						{path: "posts", element: <ComingSoon />},
						{path: "post/:title", element: <ComingSoon />},
						{path: "new-post", element: <ComingSoon />},
					],
				},

				// ENQUIRY
				{
					path: "enquiry",
					children: [
						{element: <Navigate to="/dashboard/enquiry/list" replace />, index: true},
						{path: "list", element: <EnquiryList />},
						{path: ":enquiryId", element: <EnquiryView />},
					],
				},

				// SUBSCRIBE
				{
					path: "subscribers",
					children: [
						{element: <Navigate to="/dashboard/subscribers/list" replace />, index: true},
						{path: "list", element: <SubscribersList />},
					],
				},

				// PROMOCODES
				{
					path: "promocodes",
					children: [
						{element: <Navigate to="/dashboard/promocodes/list" replace />, index: true},
						{path: "list", element: <PromoCodeList />},
						{path: "new", element: <PromoCodeCreate />},
					],
				},

				// REPORTS
				{
					path: "reports",
					children: [
						{element: <Navigate to="/dashboard/reports/upload" replace />, index: true},
						{path: "upload", element: <ReportsCreate />},
						{path: "new", element: <ComingSoon />},
					],
				},

				// ADMIN ROUTES
				{
					path: "admin",
					children: [
						{element: <Navigate to="/dashboard/admin/list" replace />, index: true},
						{
							path: "new",
							element: (
								<SuperAdminGuard>
									<AdminCreate />
								</SuperAdminGuard>
							),
						},
						{
							path: ":adminId/edit",
							element: (
								<SuperAdminGuard>
									<AdminCreate />
								</SuperAdminGuard>
							),
						},
						{
							path: "list",
							element: (
								<SuperAdminGuard>
									<AdminList />
								</SuperAdminGuard>
							),
						},
					],
				},
			],
		},

		// Main Routes
		{
			path: "*",
			element: <LogoOnlyLayout />,
			children: [
				{path: "coming-soon", element: <ComingSoon />},
				{path: "maintenance", element: <Maintenance />},
				{path: "500", element: <Page500 />},
				{path: "404", element: <NotFound />},
				{path: "403", element: <Forbidden />},
				{path: "*", element: <Navigate to="/404" replace />},
			],
		},

		{path: "*", element: <Navigate to="/404" replace />},
	]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const ResetPassword = Loadable(lazy(() => import("../pages/auth/ResetPassword")));
const CreatePassword = Loadable(lazy(() => import("../pages/auth/CreatePassword")));

// Dashboard - General
// DASHBOARD
const GeneralAnalytics = Loadable(lazy(() => import("../pages/dashboard/GeneralAnalytics")));

// Dashboard - Management
// PRODUCTS
const ProductCreate = Loadable(lazy(() => import("../pages/dashboard/products/ProductCreate")));
const ProductList = Loadable(lazy(() => import("../pages/dashboard/products/ProductList")));

// BLOGS
// const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USERS
const UserList = Loadable(lazy(() => import("../pages/dashboard/user/UserList")));
const UserCreate = Loadable(lazy(() => import("../pages/dashboard/user/UserCreate")));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/user/UserAccount')));

// ORDERS
const OrderList = Loadable(lazy(() => import("../pages/dashboard/orders/OrderList")));
const OrderView = Loadable(lazy(() => import("../pages/dashboard/orders/OrderView")));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// REPORTS
const ReportsCreate = Loadable(lazy(() => import("../pages/dashboard/reports/ReportsCreate")));

// ENQUIRY
const EnquiryList = Loadable(lazy(() => import("../pages/dashboard/enquiry/EnquiryList")));
const EnquiryView = Loadable(lazy(() => import("../pages/dashboard/enquiry/EnquiryView")));

// SUBSCRIBERS
const SubscribersList = Loadable(
	lazy(() => import("../pages/dashboard/subscribers/SubscribersList"))
);

// PROMO CODES
const PromoCodeList = Loadable(lazy(() => import("../pages/dashboard/promocodes/PromoCodeList")));
const PromoCodeCreate = Loadable(
	lazy(() => import("../pages/dashboard/promocodes/PromoCodeCreate"))
);

const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const Forbidden = Loadable(lazy(() => import("../pages/Page403")));

// ADMIN
const AdminList = Loadable(lazy(() => import("../pages/dashboard/admin/AdminList")));
const AdminCreate = Loadable(lazy(() => import("../pages/dashboard/admin/AdminCreate")));
