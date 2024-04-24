import React from "react";
import {Button, Stack, Typography} from "@mui/material";
import {fgetDate} from "src/utils/formatTime";
import CopyClipboard from "src/components/CopyClipboard";
import status_constants from "src/utils/order_status";
import {useDispatch} from "src/redux/store";
import {updateKitStatus} from "src/redux/slices/orders/orderSlice";

const KIT_STATUS = {
	shipped: {description: "The kit has been Shipped to the customer", color: "#0c4a6e"},
	sample_recieved: {description: "The kit(sample) has been received at the lab", color: "#14532d"},
};

export default function OrderKitDetails({linkedId, kitStatus, sampleCollectionDate, orderId}) {
	const dispatch = useDispatch();
	const renderDate = (dateString) => {
		const date = fgetDate(dateString, true);

		return (
			<>
				<span style={{fontWeight: 700}}>
					{date.split("at")[0]}{" "}
					<span style={{fontWeight: 700, color: "#979797"}}>{`(${date.split("at")[1]})`}</span>
				</span>
			</>
		);
	};

	const handleUpdateKitStatus = () => {
		const data = {
			status: status_constants.KIT_STATUS_SAMPLE_RECIEVED,
			id: orderId,
		};

		dispatch(updateKitStatus(data));
	};

	return (
		<Stack
			spacing={2}
			direction={{xs: "column", sm: "row"}}
			alignItems="center"
			justifyContent="space-between"
			sx={{p: 3, bgcolor: "background.neutral"}}>
			<Stack sx={{width: 1}}>
				<Stack
					direction={{xs: "column", sm: "row"}}
					alignItems="center"
					justifyContent="space-between"
					mb={2}>
					<Typography variant="h6" sx={{color: "#333", mb: 2}}>
						KIT DETAILS
					</Typography>
					{kitStatus === status_constants.KIT_STATUS_SAMPLE_RECIEVED ? (
						<Typography
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
								fontWeight: 700,
								fontStyle: "italic",
								color: "text.disabled",
							}}>
							Kit is Receivied.
						</Typography>
					) : (
						<Typography
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
								fontWeight: 700,
								fontStyle: "italic",
								color: "text.disabled",
							}}>
							Kit Receivied?{" "}
							<Button variant="contained" onClick={handleUpdateKitStatus}>
								Yes
							</Button>
						</Typography>
					)}
				</Stack>
				<Stack
					direction={{xs: "column", sm: "row"}}
					alignItems="center"
					justifyContent="space-between">
					<Stack sx={{width: 1}}>
						<Typography variant="caption" sx={{color: "text.disabled"}}>
							Linked ID
						</Typography>
						{linkedId ? <CopyClipboard value={linkedId} /> : <span>-</span>}
					</Stack>
					<Stack sx={{width: 1}}>
						<Typography variant="caption" sx={{color: "text.disabled"}}>
							Kit Status
						</Typography>
						<Typography
							sx={{
								color: KIT_STATUS[kitStatus]?.color,
								mb: 1,
								fontSize: "1.2rem",
								textTransform: "uppercase",
								fontWeight: 700,
							}}>
							{kitStatus.replaceAll("_", " ")}
						</Typography>
					</Stack>
					{Boolean(sampleCollectionDate) && (
						<Stack sx={{width: 1}}>
							<Typography variant="caption" sx={{color: "text.disabled"}}>
								Sample Collection Date
							</Typography>
							<Typography sx={{color: "#000", mb: 1, fontSize: "1.2rem"}}>
								{renderDate(sampleCollectionDate)}
							</Typography>
						</Stack>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
}
