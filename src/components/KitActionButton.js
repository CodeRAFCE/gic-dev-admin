import React from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import status_constants from "src/utils/order_status";

const KitActionButton = ({kitStatus, view, showView, orderId}) => {
	const navigate = useNavigate();

	const getStatusAction = () => {
		if (kitStatus === status_constants.KIT_STATUS_SHIPPED) {
			return (
				<Button
					variant="contained"
					onClick={() => {
						// DISPATCH SMAPLE RECIVIED STATUS
					}}>
					Sample Recivied
				</Button>
			);
		} else if (kitStatus === status_constants.KIT_STATUS_SAMPLE_RECIEVED) {
			return (
				<>
					{showView ? (
						<Button
							variant="contained"
							onClick={() => {
								view();
								navigate(`/dashboard/orders/${orderId}`);
							}}>
							View
						</Button>
					) : (
						<Typography variant="caption" sx={{fontWeight: 700, color: "text.disabled"}}>
							NO ACTIONS
						</Typography>
					)}
				</>
			);
		}
	};

	return getStatusAction();
};

export default KitActionButton;
