import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

// MUI
import {Button, Typography} from "@mui/material";

// redux
import {useDispatch} from "src/redux/store";
import {updateStatus} from "src/redux/slices/orders/orderSlice";

// FORMS

// utils
import status_constants from "src/utils/order_status";

export const ActionButtons = ({
	status,
	orderId,
	placedAt,
	view,
	showView,
	kitStatus,
	hasReport,
	linkedId,
}) => {
	const cancellationTimeInHrs = process.env.ORDER_CANCELLATION_TIME_HRS || 0.01;
	const dispatch = useDispatch();

	const getActionBtn = () => {
		switch (status) {
			case status_constants.ORDER_STATUS_INIT:
			case status_constants.ORDER_STATUS_ACCEPTED:
			case status_constants.ORDER_STATUS_CANCELLED:
			case status_constants.ORDER_STATUS_COMPLETE:
				// if Accpected show VIEW BUTTON
				return (
					<>
						{showView ? (
							<ViewButton orderId={orderId} view={view} />
						) : (
							<Typography variant="caption" sx={{fontWeight: 700, color: "text.disabled"}}>
								NO ACTIONS
							</Typography>
						)}
					</>
				);

			case status_constants.ORDER_STATUS_REVIEW:
				// Check for 24 hrs, if passed show approve button
				// onClick show modal(collect linked kit id)
				// on Modal Click call update status api(PUT)

				const currentDate = new Date(Date.now());
				const placedDate = new Date(placedAt); // 86400000;
				const diff = (currentDate.getTime() - placedDate.getTime()) / (60 * 60 * 1000);

				if (diff > cancellationTimeInHrs) {
					// if (diff > 24) {
					return (
						<Button
							variant="contained"
							onClick={() =>
								dispatch(
									updateStatus({
										data: {
											status: status_constants.ORDER_STATUS_ACCEPTED,
											updateMandates: {
												kitId: 1234,
											},
										},
										id: orderId,
									})
								)
							}>
							Accpect
						</Button>
					);
				} else {
					return (
						<>
							{showView ? (
								<ViewButton orderId={orderId} view={view} />
							) : (
								<Typography variant="caption" sx={{fontWeight: 700, color: "text.disabled"}}>
									NO ACTIONS
								</Typography>
							)}
						</>
					);
				}

			case status_constants.ORDER_STATUS_ACTIVATED:
				// Show START PROCESSING BUTTON
				if (kitStatus === status_constants.KIT_STATUS_SHIPPED) {
					return (
						<>
							{showView ? (
								<ViewButton orderId={orderId} view={view} />
							) : (
								<Typography variant="caption" sx={{fontWeight: 700, color: "text.disabled"}}>
									NO ACTIONS
								</Typography>
							)}
						</>
					);
				} else if (kitStatus === status_constants.KIT_STATUS_SAMPLE_RECIEVED) {
					return (
						<Button
							variant="contained"
							onClick={() =>
								dispatch(
									updateStatus({
										data: {
											status: status_constants.ORDER_STATUS_INPROCESS,
										},
										id: orderId,
									})
								)
							}>
							Process
						</Button>
					);
				}
				break;

			case status_constants.ORDER_STATUS_INPROCESS:
				// TODO => DISPATCH COMPLETE STATUS
				if (!hasReport) {
					return <ViewButton orderId={orderId} view={view} />;
				} else {
					return (
						<Button
							variant="contained"
							onClick={() => {
								dispatch(
									updateStatus({
										data: {
											status: status_constants.ORDER_STATUS_COMPLETE,
										},
										id: orderId,
									})
								);
							}}>
							Complete
						</Button>
					);
				}

			default:
				return <Typography>No Actions Available</Typography>;
		}
	};

	return getActionBtn();
};

ActionButtons.propTypes = {
	status: PropTypes.string,
	orderId: PropTypes.string,
	placedAt: PropTypes.string,
};

const ViewButton = ({orderId, view}) => {
	const navigate = useNavigate();
	return (
		<Button
			variant="contained"
			onClick={() => {
				view();
				navigate(`/dashboard/orders/${orderId}`);
			}}>
			View
		</Button>
	);
};

ViewButton.propTypes = {
	orderId: PropTypes.string,
	view: PropTypes.func,
};
