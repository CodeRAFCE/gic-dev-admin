// ----------------------------------------------------------------------

function path(root, sublink) {
	return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
	root: ROOTS_AUTH,
	login: path(ROOTS_AUTH, "/login"),
	resetPassword: path(ROOTS_AUTH, "/reset-password"),
	verify: path(ROOTS_AUTH, "/verify"),
};

export const PATH_PAGE = {
	comingSoon: "/coming-soon",
	maintenance: "/maintenance",
	page404: "/404",
	page500: "/500",
};

export const PATH_DASHBOARD = {
	root: ROOTS_DASHBOARD,

	customer: {
		root: path(ROOTS_DASHBOARD, "/customers"),
		list: path(ROOTS_DASHBOARD, "/customers/list"),
		new: path(ROOTS_DASHBOARD, "/customers/new"),
		edit: (customerId) => path(ROOTS_DASHBOARD, `/customers/${customerId}/edit`),
	},

	product: {
		root: path(ROOTS_DASHBOARD, "/products"),
		list: path(ROOTS_DASHBOARD, "/products/list"),
		newProduct: path(ROOTS_DASHBOARD, "/products/new"),
		editById: (productId) => path(ROOTS_DASHBOARD, `/products/${productId}/edit`),
	},

	order: {
		root: path(ROOTS_DASHBOARD, "/orders"),
		list: path(ROOTS_DASHBOARD, "/orders/list"),
		view: (orderId) => path(ROOTS_DASHBOARD, `/orders/${orderId}`),
	},

	blog: {
		root: path(ROOTS_DASHBOARD, "/blog"),
		posts: path(ROOTS_DASHBOARD, "/blog/posts"),
		post: path(ROOTS_DASHBOARD, "/blog/post/:title"),
		postById: (postId) => path(ROOTS_DASHBOARD, `/blog/post/${postId}`),
		newPost: path(ROOTS_DASHBOARD, "/blog/new-post"),
	},

	report: {
		root: path(ROOTS_DASHBOARD, "/reports"),
		upload: path(ROOTS_DASHBOARD, "/reports/upload"),
	},

	enquiry: {
		root: path(ROOTS_DASHBOARD, "/enquiry"),
		list: path(ROOTS_DASHBOARD, "/enquiry/list"),
		view: (enquiryId) => path(ROOTS_DASHBOARD, `/enquiry/${enquiryId}`),
	},

	subscriber: {
		root: path(ROOTS_DASHBOARD, "/subscribers"),
		list: path(ROOTS_DASHBOARD, "/subscribers/list"),
	},

	promocode: {
		root: path(ROOTS_DASHBOARD, "/promocodes"),
		list: path(ROOTS_DASHBOARD, "/promocodes/list"),
		new: path(ROOTS_DASHBOARD, "/promocodes/new"),
		// view: (enquiryId) => path(ROOTS_DASHBOARD, `/newsletter/${enquiryId}`),
	},

	// ADMIN CONTROL
	admin: {
		root: path(ROOTS_DASHBOARD, "/admin"),
		list: path(ROOTS_DASHBOARD, "/admin/list"),
		create: path(ROOTS_DASHBOARD, "/admin/new"),
		edit: (adminId) => path(ROOTS_DASHBOARD, `/admin/${adminId}/edit`),
		account: path(ROOTS_DASHBOARD, "/admin/account"),
	},
};
