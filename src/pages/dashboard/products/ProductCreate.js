// import {useEffect} from 'react';
import {useParams, useLocation} from "react-router-dom";
// @mui
import {Container} from "@mui/material";
// redux
import {useDispatch, useSelector} from "src/redux/store";
import {getProduct} from "src/redux/slices/products/productSlice";

// routes
import {PATH_DASHBOARD} from "src/routes/paths";
// hooks
import useSettings from "src/hooks/useSettings";
// components
import Page from "src/components/Page";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import ProductNewEditForm from "src/sections/@dashboard/products/ProductNewEditForm";
import {useEffect} from "react";
import LoadingScreen from "src/components/LoadingScreen";

// ----------------------------------------------------------------------

export default function ProductCreate() {
	const {themeStretch} = useSettings();
	const {pathname} = useLocation();
	const {productId} = useParams();

	const {currentProduct, isProductLoading} = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const isEdit = pathname.includes("edit");

	useEffect(() => {
		if (isEdit) {
			dispatch(getProduct({id: productId}));
		}
		return;
	}, [dispatch, isEdit, productId]);

	if (isProductLoading) {
		return <LoadingScreen />;
	}

	return (
		<Page title="Products: Create a new product">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading={!isEdit ? "Create a new product" : "Edit product"}
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{
							name: "Products",
							href: PATH_DASHBOARD.product.root,
						},
						{name: !isEdit ? "New product" : productId},
					]}
				/>

				<ProductNewEditForm isEdit={isEdit} currentProduct={currentProduct} />
			</Container>
		</Page>
	);
}
