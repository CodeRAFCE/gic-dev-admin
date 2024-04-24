// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// components
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{width: 1, height: 1}} />;

const ICONS = {
	blog: getIcon("ic_blog"),
	orders: getIcon("ic_orders"),
	products: getIcon("ic_products"),
	user: getIcon("ic_user"),
	dashboard: getIcon("ic_analytics"),
	report: getIcon("ic_dashboard"),
	admin: getIcon("ic_admin"),
	ticket: getIcon("ic_ticket"),
	subscribe: getIcon("ic_newspaper"),
	promocode: getIcon("ic_offer"),
};

const navConfig = [
	// GENERAL
	// ----------------------------------------------------------------------
	{
		subheader: "general",
		items: [{title: "dashboard", path: PATH_DASHBOARD.root, icon: ICONS.dashboard}],
	},

	// ADMIN MANAGMENT
	// ----------------------------------------------------------------------
	{
		subheader: "admin",
		allowSuperAdmin: true,
		items: [
			{
				title: "admin users",
				path: PATH_DASHBOARD.admin.list,
				icon: ICONS.admin,
				// children: [
				// 	{title: 'list', path: PATH_DASHBOARD.admin.list},
				// 	{title: 'create', path: PATH_DASHBOARD.admin.create},
				// ],
			},
		],
	},

	// MANAGEMENT
	// ----------------------------------------------------------------------
	{
		subheader: "management",
		items: [
			// MANAGEMENT : REPORTS
			{
				title: "reports",
				icon: ICONS.report,
				path: PATH_DASHBOARD.report.upload,
				// children: [{title: 'upload', path: PATH_DASHBOARD.report.upload}],
			},

			// MANAGEMENT : CUSTOMERS
			{
				title: "Customers",
				path: PATH_DASHBOARD.customer.root,
				icon: ICONS.user,
				// children: [
				// 	{title: 'list', path: PATH_DASHBOARD.customer.list},
				// 	{title: 'create', path: PATH_DASHBOARD.customer.new},
				// ],
			},

			// MANAGEMENT : PRODUCTS
			{
				title: "products",
				path: PATH_DASHBOARD.product.list,
				icon: ICONS.products,
				// children: [
				// 	{title: 'list', path: PATH_DASHBOARD.product.list},
				// 	{title: 'create', path: PATH_DASHBOARD.product.newProduct},
				// ],
			},

			// MANAGEMENT : ORDERS
			{
				title: "orders",
				path: PATH_DASHBOARD.order.list,
				icon: ICONS.orders,
				// children: [{title: 'list', path: PATH_DASHBOARD.order.list}],
			},

			// MANAGEMENT : ENQUIRY
			{
				title: "enquiry",
				path: PATH_DASHBOARD.enquiry.list,
				icon: ICONS.ticket,
				// children: [{title: 'list', path: PATH_DASHBOARD.order.list}],
			},

			// MANAGEMENT : SUBSCRIBE
			{
				title: "subscribers",
				path: PATH_DASHBOARD.subscriber.list,
				icon: ICONS.subscribe,
				// children: [{title: 'list', path: PATH_DASHBOARD.order.list}],
			},

			// MANAGEMENT : PROMO CODES
			{
				title: "promocodes",
				path: PATH_DASHBOARD.promocode.list,
				icon: ICONS.promocode,
				// children: [{title: 'list', path: PATH_DASHBOARD.order.list}],
			},

			// MANAGEMENT : BLOG
			// {
			// 	title: 'blog',
			// 	path: PATH_DASHBOARD.blog.root,
			// 	icon: ICONS.blog,
			// 	children: [
			// 		{title: 'posts', path: PATH_DASHBOARD.blog.posts},
			// 		{title: 'post', path: PATH_DASHBOARD.blog.postById},
			// 		{title: 'new post', path: PATH_DASHBOARD.blog.newPost},
			// 	],
			// },
		],
	},
];

export default navConfig;
