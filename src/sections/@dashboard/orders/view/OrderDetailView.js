import React from "react";
import PropTypes from "prop-types";

// mui
import {useTheme} from "@mui/material/styles";
import {Card, Stack, Typography} from "@mui/material";

// View Details
import OrderProfileView from "./OrderProfileView";
import {OrderProductView} from "./OrderProductView";
import {ActionButtons} from "src/components/ActionButtons";
import OrderSummary from "./OrderSummary";
import OrderKitDetails from "./OrderKitDetails";
import OrderKitQuestions from "./OrderKitQuestions";

OrderDetailView.prototypes = {
	currentOrder: PropTypes.object,
};

export default function OrderDetailView({currentOrder}) {
	const theme = useTheme();

	const {person, address, product, quantity, order_status, _id, placedAt, payment, kit} =
		currentOrder;

	return (
		<Card>
			<OrderProfileView person={person} address={address} />
			<OrderProductView product={product} quantity={quantity} />

			<Stack
				spacing={2}
				direction={{xs: "column", sm: "row"}}
				sx={{p: 3}}
				alignItems="center"
				justifyContent="space-between">
				<Stack>
					<Typography variant="caption" sx={{color: "text.disabled"}}>
						ORDER STATUS
					</Typography>
					<Typography
						variant="h6"
						sx={{
							color:
								theme.palette.mode === "dark" ? "#fff" : theme.palette.status[order_status]?.main,
							textTransform: "uppercase",
						}}>
						{order_status?.replaceAll("_", " ")}
					</Typography>
				</Stack>
				<Stack>
					<ActionButtons
						status={order_status}
						orderId={_id}
						placedAt={placedAt}
						kitStatus={kit?.kit_status}
					/>
				</Stack>
			</Stack>

			<OrderSummary payment={payment} activeOrder={{...currentOrder}} />

			{Boolean(kit?._id) && (
				<OrderKitDetails
					orderId={_id}
					kitStatus={kit?.kit_status}
					linkedId={kit?.linkedId}
					sampleCollectionDate={kit?.sampleCollectionDate}
				/>
			)}

			{Boolean(kit?._id) && kit?.questionaries?.length > 0 && (
				<OrderKitQuestions questionaries={kit?.questionaries} />
			)}
		</Card>
	);
}
