import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// @mui
import {useTheme} from "@mui/material/styles";
import {
	Box,
	Card,
	Table,
	Switch,
	Tooltip,
	TableBody,
	Container,
	IconButton,
	TableContainer,
	TablePagination,
	FormControlLabel,
	Divider,
	Tabs,
	Tab,
	Stack,
	Typography,
} from "@mui/material";
// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
import useTable, {getComparator, emptyRows} from "../../../hooks/useTable";
import useTabs from "src/hooks/useTabs";

// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {
	TableEmptyRows,
	TableHeadCustom,
	TableNoData,
	TableSelectedActions,
} from "../../../components/table";

// sections
import {EnquiryTableRow, EnquiryTableToolbar} from "src/sections/@dashboard/enquiry/list";

//redux
import {useDispatch, useSelector} from "src/redux/store";
import {getEnquiries} from "src/redux/slices/enquiry/enquirySlice";

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = ['all', 'active', 'banned'];

const TABLE_HEAD = [
	{id: "name", label: "Name", align: "left"},
	{id: "email", label: "Email", align: "left"},
	{id: "phone", label: "Phone", align: "left"},
	{id: "status", label: "Status", align: "left"},
	{id: "actions", label: "Actions", align: "left"},
	{id: ""},
];

// ----------------------------------------------------------------------

export default function EnquiryList() {
	const {
		dense,
		page,
		order,
		orderBy,
		rowsPerPage,
		setPage,
		//
		selected,
		setSelected,
		onSelectRow,
		onSelectAllRows,
		//
		onSort,
		onChangeDense,
		onChangePage,
		onChangeRowsPerPage,
	} = useTable();
	const theme = useTheme();
	const {themeStretch} = useSettings();
	const navigate = useNavigate();

	const {isEnquiryLoading, enquiries} = useSelector((state) => state.enquiry);
	const dispatch = useDispatch();

	const [tableData, setTableData] = useState([]);
	const [filterName, setFilterName] = useState("");
	const [filterEmail, setFilterEmail] = useState("");
	const {currentTab: filterStatus, onChangeTab: onFilterStatus} = useTabs("all");

	useEffect(() => {
		dispatch(getEnquiries());
	}, [dispatch]);

	useEffect(() => {
		if (enquiries?.length) {
			setTableData(enquiries);
		}
	}, [enquiries]);

	const handleFilterName = (filterName) => {
		setFilterName(filterName);
		setPage(0);
	};

	const handleFilterEmail = (event) => {
		setFilterEmail(event.target.value);
	};

	const handleViewRow = (id) => {
		navigate(PATH_DASHBOARD.enquiry.view(id));
	};

	const handleDeleteRow = (id) => {
		// dispatch(removeAdmin({id}));
	};

	const handleDeleteRows = (selected) => {
		const deleteRows = tableData?.filter((row) => !selected.includes(row?._id));
		setSelected([]);
		setTableData(deleteRows);
	};

	const handleEditRow = (id) => {
		navigate(PATH_DASHBOARD.admin.edit(id));
	};

	const dataFiltered = applySortFilter({
		tableData,
		comparator: getComparator(order, orderBy),
		filterName,
		filterEmail,
		filterStatus,
	});

	const denseHeight = dense ? 52 : 72;

	const isNotFound =
		(!dataFiltered?.length && !!filterName) ||
		(!dataFiltered?.length && !!filterStatus) ||
		(!dataFiltered?.length && !!filterEmail) ||
		(!isEnquiryLoading && !dataFiltered?.length);

	const getLengthByStatus = (status) =>
		tableData?.filter((item) => item?.isClosed === status)?.length;

	const TABS = [
		{
			value: "all",
			label: "All",
			color: theme.palette.mode === "dark" ? "#fff" : "#0C53B7",
			bgColor: theme.palette.mode === "dark" ? "#0C53B7" : "rgba(24, 144, 255, 0.1)",
			count: tableData?.length,
		},
		{
			value: "open",
			label: "Open",
			count: getLengthByStatus(false),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.order_placed.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.order_placed.main
					: theme.palette.status.order_placed.light,
		},
		{
			value: "closed",
			label: "Closed",
			count: getLengthByStatus(true),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.accepted.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.accepted.main
					: theme.palette.status.accepted.light,
		},
	];

	return (
		<Page title="Enquiry: List">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading="Enquiry List"
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Enquiry", href: PATH_DASHBOARD.enquiry.root},
						{name: "List"},
					]}
					// action={
					// 	<Button
					// 		variant="contained"
					// 		component={RouterLink}
					// 		to={PATH_DASHBOARD.admin.create}
					// 		startIcon={<Iconify icon={"eva:plus-fill"} />}>
					// 		New Admin
					// 	</Button>
					// }
				/>

				<Card>
					<Tabs
						allowScrollButtonsMobile
						variant="scrollable"
						scrollButtons="auto"
						value={filterStatus}
						onChange={onFilterStatus}
						sx={{px: 2, bgcolor: "background.neutral"}}>
						{TABS.map((tab) => {
							const label = tab.label;
							return (
								<Tab
									disableRipple
									key={tab.value}
									value={tab.value}
									label={
										<Stack spacing={1} direction="row" alignItems="center">
											<div>{label.replace("_", " ")}</div>
											<Typography
												variant="caption"
												component={"span"}
												sx={{
													px: 1,
													py: 0.5,
													color: tab.color,
													borderRadius: 30,
													fontWeight: 700,
													backgroundColor: tab.bgColor,
													textTransform: "capitalize",
												}}>
												{tab?.count || 0}
											</Typography>
										</Stack>
									}
								/>
							);
						})}
					</Tabs>

					<Divider />

					<EnquiryTableToolbar
						filterName={filterName}
						filterEmail={filterEmail}
						onFilterName={handleFilterName}
						onFilterEmail={handleFilterEmail}
					/>

					<Scrollbar>
						<TableContainer sx={{minWidth: 800, position: "relative"}}>
							{selected.length > 0 && (
								<TableSelectedActions
									dense={dense}
									numSelected={selected.length}
									rowCount={tableData.length}
									onSelectAllRows={(checked) =>
										onSelectAllRows(
											checked,
											tableData?.map((row) => row?._id)
										)
									}
									actions={
										<Tooltip title="Delete">
											<IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
												<Iconify icon={"eva:trash-2-outline"} />
											</IconButton>
										</Tooltip>
									}
								/>
							)}

							<Table size={dense ? "small" : "medium"}>
								<TableHeadCustom
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={tableData?.length}
									numSelected={selected?.length}
									onSort={onSort}
									onSelectAllRows={(checked) =>
										onSelectAllRows(
											checked,
											tableData?.map((row) => row?._id)
										)
									}
								/>

								<TableBody>
									{dataFiltered
										?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										?.map((row) => (
											<EnquiryTableRow
												key={row?._id}
												row={row}
												selected={selected?.includes(row?._id)}
												onSelectRow={() => onSelectRow(row?._id)}
												onDeleteRow={() => handleDeleteRow(row?._id)}
												onViewRow={() => handleViewRow(row?._id)}
											/>
										))}

									<TableEmptyRows
										height={denseHeight}
										emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
									/>

									<TableNoData isNotFound={isNotFound} />
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Box sx={{position: "relative"}}>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={dataFiltered?.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={onChangePage}
							onRowsPerPageChange={onChangeRowsPerPage}
						/>

						<FormControlLabel
							control={<Switch checked={dense} onChange={onChangeDense} />}
							label="Dense"
							sx={{px: 3, py: 1.5, top: 0, position: {md: "absolute"}}}
						/>
					</Box>
				</Card>
			</Container>
		</Page>
	);
}

// ----------------------------------------------------------------------

function applySortFilter({
	tableData,
	comparator,
	filterName,
	filterEmail,
	filterPhone,
	filterStatus,
}) {
	const stabilizedThis = tableData?.map((el, index) => [el, index]);

	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	tableData = stabilizedThis?.map((el) => el[0]);

	if (filterName) {
		tableData = tableData?.filter((item) => {
			const name = `${item.firstName} ${item.lastName}`;
			return name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
		});
	}

	if (filterStatus !== "all") {
		tableData = tableData?.filter((item) => item?.isClosed === false);
	}

	if (filterEmail) {
		tableData = tableData?.filter((item) => item.email === filterEmail);
	}

	if (filterPhone) {
		tableData = tableData?.filter((item) => item.phone === filterPhone);
	}

	return tableData;
}
