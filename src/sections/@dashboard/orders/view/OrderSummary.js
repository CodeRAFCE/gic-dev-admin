import React from "react";
import PropTypes from "prop-types";

//mui
import {Box, Divider, Stack, Typography} from "@mui/material";

// hooks
import useResponsive from "src/hooks/useResponsive";

//utils
import {fgetDate} from "src/utils/formatTime";
import {fCurrency} from "src/utils/formatNumber";

export default function OrderSummary({payment, activeOrder}) {
	const upMd = useResponsive("up", "md");
	return (
		<Stack
			spacing={{xs: 2, md: 5}}
			direction={{xs: "column", md: "row"}}
			divider={
				<Divider
					flexItem
					orientation={upMd ? "vertical" : "horizontal"}
					sx={{borderStyle: "dashed"}}
				/>
			}
			sx={{p: 3}}>
			<Stack sx={{width: 1}}>
				<Typography variant="h6" sx={{color: "text.disabled", mb: 2}}>
					PAYMENT DETAILS
				</Typography>
				<Stack>
					<Typography variant="caption">Transaction ID</Typography>
					<Typography sx={{color: "text.disabled", mb: 1, fontSize: "1.2rem"}}>
						{payment?.paymentId}
					</Typography>
				</Stack>
				<Stack>
					<Typography variant="caption">Payment Status</Typography>
					<Typography
						sx={{color: "text.disabled", mb: 1, textTransform: "capitalize", fontSize: "1.2rem"}}>
						{payment?.paymentStatus}
					</Typography>
				</Stack>
				<Stack>
					<Typography variant="caption">Payment Date</Typography>
					<Typography sx={{color: "text.disabled", mb: 1, fontSize: "1.2rem"}}>
						{fgetDate(payment?.createdAt)}
					</Typography>
				</Stack>
			</Stack>

			<Stack sx={{width: 1}}>
				<Typography variant="h6" sx={{color: "text.disabled", mb: 2}}>
					PAYMENT SUMMARY
				</Typography>
				<Stack spacing={2}>
					<PricingInfo title={"Sub Total"} value={`₹${activeOrder?.product?.price}`} />
					<PricingInfo title={"Tax"} value={activeOrder?.product?.tax} />
					<PricingInfo title={"Shipping"} value={activeOrder?.shipmentPrice} />

					<Divider />

					<Stack direction="row" justifyContent="space-between">
						<Typography variant="subtitle1">Total</Typography>
						<Box sx={{textAlign: "right"}}>
							<Typography variant="subtitle1" sx={{color: "#000"}}>
								&#8377;{fCurrency(activeOrder?.product?.price + activeOrder?.product?.tax)}
							</Typography>
							<Typography variant="caption" sx={{fontStyle: "italic"}}>
								(VAT included if applicable)
							</Typography>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
}

OrderSummary.propTypes = {
	payment: PropTypes.object,
	activeOrder: PropTypes.object,
};

PricingInfo.propTypes = {
	title: PropTypes.string,
};

function PricingInfo({title, value}) {
	return (
		<Stack direction="row" justifyContent="space-between">
			<Typography variant="body2" sx={{color: "text.secondary"}}>
				{title}
			</Typography>
			<Typography variant="subtitle2">{value}</Typography>
		</Stack>
	);
}
