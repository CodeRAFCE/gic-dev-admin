import {useEffect} from "react";
import {useParams} from "react-router-dom";
// @mui
import {Container} from "@mui/material";
// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// redux
import {useDispatch, useSelector} from "src/redux/store";
import {getOrderById} from "src/redux/slices/orders/orderSlice";
// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// sections
import {OrderDetailView} from "src/sections/@dashboard/orders/view";
import LoadingScreen from "src/components/LoadingScreen";

// ----------------------------------------------------------------------

export default function OrderView() {
	const {themeStretch} = useSettings();
	const {orderId} = useParams();

	const dispatch = useDispatch();
	const {currentOrder, isOrderLoading} = useSelector((state) => state.order);

	useEffect(() => {
		dispatch(getOrderById({id: orderId}));
	}, [dispatch, orderId]);

	if (isOrderLoading) {
		return <LoadingScreen />;
	}

	return (
		<Page title="Orders: View">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading="View order"
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Orders", href: PATH_DASHBOARD.order.list},
						{name: orderId || ""},
					]}
				/>
				<OrderDetailView currentOrder={Boolean(currentOrder) && currentOrder} />
			</Container>
		</Page>
	);
}
