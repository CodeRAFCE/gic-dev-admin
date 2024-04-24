import {useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
// @mui
import {Container} from "@mui/material";

// routes
import {PATH_DASHBOARD} from "../../../routes/paths";

// redux
import {useDispatch, useSelector} from "src/redux/store";
import {getCustomerById} from "src/redux/slices/customer/customerSlice";

// hooks
import useSettings from "../../../hooks/useSettings";

// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";

// sections
import PromoCodeNewEditForm from "src/sections/@dashboard/promocodes/PromoCodeNewEditForm";

// ----------------------------------------------------------------------

export default function PromoCodeCreate() {
	const {themeStretch} = useSettings();
	const {pathname} = useLocation();
	const {promocodeId} = useParams();

	const {currentPromocode} = useSelector((state) => state.promocode);
	const dispatch = useDispatch();

	const isEdit = pathname.includes("edit");

	useEffect(() => {
		if (isEdit) {
			dispatch(getCustomerById({id: promocodeId}));
		}
		return;
	}, [promocodeId, dispatch, isEdit]);

	return (
		<Page title="Promocode: Create a promocode">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading={!isEdit ? "Create a promocode" : "Edit promocode"}
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Promocode", href: PATH_DASHBOARD.promocode.list},
						{name: !isEdit ? "New promocode" : promocodeId},
					]}
				/>

				<PromoCodeNewEditForm isEdit={isEdit} currentPromocode={currentPromocode} />
			</Container>
		</Page>
	);
}
