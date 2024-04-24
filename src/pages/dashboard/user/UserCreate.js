import {useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
// @mui
import {Container} from "@mui/material";
// routes
import {PATH_DASHBOARD} from "../../../routes/paths";

// redux
import {useDispatch, useSelector} from "src/redux/store";

// hooks
import useSettings from "../../../hooks/useSettings";

// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// sections
import UserNewEditForm from "../../../sections/@dashboard/user/UserNewEditForm";
import {getCustomerById} from "src/redux/slices/customer/customerSlice";

// ----------------------------------------------------------------------

export default function UserCreate() {
	const {themeStretch} = useSettings();
	const {pathname} = useLocation();
	const {userId} = useParams();

	const {currentCustomer} = useSelector((state) => state.customer);
	const dispatch = useDispatch();

	const isEdit = pathname.includes("edit");

	useEffect(() => {
		if (isEdit) {
			dispatch(getCustomerById({id: userId}));
		}
		return;
	}, [userId, dispatch, isEdit]);

	return (
		<Page title="Customer: Create a customer">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading={!isEdit ? "Create a customer" : "Edit customer"}
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Customer", href: PATH_DASHBOARD.customer.list},
						{name: !isEdit ? "New customer" : userId},
					]}
				/>

				<UserNewEditForm isEdit={isEdit} currentCustomer={currentCustomer} />
			</Container>
		</Page>
	);
}
