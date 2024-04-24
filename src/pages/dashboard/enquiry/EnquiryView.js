import {useEffect} from "react";
import {useParams} from "react-router-dom";
// @mui
import {Button, Card, Container, Stack, Typography} from "@mui/material";
// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// redux
import {useDispatch, useSelector} from "src/redux/store";
import {getEnquiry} from "src/redux/slices/enquiry/enquirySlice";

// components
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// sections
import LoadingScreen from "src/components/LoadingScreen";
import EmptyContent from "src/components/EmptyContent";

// ----------------------------------------------------------------------

export default function EnquiryView() {
	const {themeStretch} = useSettings();
	const {enquiryId} = useParams();

	const dispatch = useDispatch();
	const {currentEnquiry, isEnquiryLoading} = useSelector((state) => state.enquiry);

	useEffect(() => {
		dispatch(getEnquiry({id: enquiryId}));
	}, [dispatch, enquiryId]);

	const handleCloseTicket = () => {};

	if (isEnquiryLoading) {
		return <LoadingScreen />;
	}

	return (
		<Page title="Enquiry: View">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading="View enquiry"
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Enquiry", href: PATH_DASHBOARD.enquiry.list},
						{name: enquiryId || ""},
					]}
					action={
						<Button variant="contained" onClick={handleCloseTicket}>
							Close Ticket
						</Button>
					}
				/>
				<Card>
					<Stack spacing={2} direction={{xs: "column", sm: "row"}} sx={{p: 3}}>
						<Stack sx={{width: 1}}>
							<Typography variant="caption" color="text.disabled">
								Name
							</Typography>
							<Typography variant="subtitle1">
								{currentEnquiry?.firstName} {currentEnquiry?.lastName}
							</Typography>
						</Stack>
						<Stack sx={{width: 1}}>
							<Typography variant="caption" color="text.disabled">
								Email
							</Typography>
							<Typography variant="subtitle1">{currentEnquiry?.email}</Typography>
						</Stack>
						<Stack sx={{width: 1}}>
							<Typography variant="caption" color="text.disabled">
								Phone
							</Typography>
							<Typography variant="subtitle1">{currentEnquiry?.phone}</Typography>
						</Stack>
					</Stack>
					<Stack sx={{p: 3}}>
						<Typography variant="caption" color="text.disabled">
							Message
						</Typography>
						<Typography variant="subtitle1">{currentEnquiry?.message}</Typography>
					</Stack>

					<Stack
						sx={{p: 3}}
						direction={{xs: "column", sm: "row"}}
						alignItems="center"
						justifyContent={"space-between"}>
						<Typography variant="h6" color="text.disabled">
							Admin Comments
						</Typography>
						<Button variant="contained">Add A Comment</Button>
					</Stack>

					{currentEnquiry?.adminComments && currentEnquiry?.adminComments?.length > 0 ? (
						<Stack sx={{p: 3}}>
							<Typography variant="caption" color="text.disabled">
								Admin Comments
							</Typography>
							{currentEnquiry?.adminComments?.map((comment, index) => (
								<Typography variant="subtitle1" key={index}>
									{comment}
								</Typography>
							))}
						</Stack>
					) : (
						<EmptyContent title={"No Comments added by the admin yet"} />
					)}
				</Card>
			</Container>
		</Page>
	);
}
