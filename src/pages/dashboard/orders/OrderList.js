// import sumBy from 'lodash/sumBy';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// @mui
import {useTheme} from "@mui/material/styles";
import {
	Box,
	Tab,
	Tabs,
	Card,
	Table,
	Stack,
	Switch,
	Tooltip,
	Divider,
	TableBody,
	Container,
	IconButton,
	TableContainer,
	TablePagination,
	FormControlLabel,
	Typography,
} from "@mui/material";

// routes
import {PATH_DASHBOARD} from "src/routes/paths";

// hooks
import useTabs from "src/hooks/useTabs";
import useSettings from "src/hooks/useSettings";
import useTable, {getComparator, emptyRows} from "src/hooks/useTable";

// components
import Page from "src/components/Page";
// import Label from 'src/components/Label';
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import {
	TableEmptyRows,
	TableHeadCustom,
	TableNoData,
	TableSelectedActions,
} from "src/components/table";

// sections
// import InvoiceAnalytic from 'src/sections/@dashboard/orders/InvoiceAnalytic';
import {OrderTableRow, OrderTableToolbar} from "src/sections/@dashboard/orders/list";
import {useDispatch, useSelector} from "src/redux/store";
import {getAllOrders} from "src/redux/slices/orders/orderSlice";

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
	"all",
	"full stack development",
	"backend development",
	"ui design",
	"ui/ux design",
	"front end development",
];

const TABLE_HEAD = [
	{id: "orderId", label: "Order ID", align: "left"},
	{id: "placedDate", label: "Placed At", align: "left"},
	// {id: 'price', label: 'Amount', align: 'center', width: 140},
	// {id: 'sent', label: 'Sent', align: 'center', width: 140},
	{id: "status", label: "Status", align: "left"},
	{id: "linkedId", label: "Linked Kit Id", align: "left"},
	{id: "statusButtons", label: "Actions", align: "left"},
	{id: ""},
];

// ----------------------------------------------------------------------

export default function OrderList() {
	const theme = useTheme();
	const {themeStretch} = useSettings();
	const navigate = useNavigate();

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
	} = useTable({defaultOrderBy: "placedDate"});

	const {orders} = useSelector((state) => state.order);
	const dispatch = useDispatch();

	const [tableData, setTableData] = useState([]);
	const [filterName, setFilterName] = useState("");
	const [filterService, setFilterService] = useState("all");
	const [filterStartDate, setFilterStartDate] = useState(null);
	const [filterEndDate, setFilterEndDate] = useState(null);

	const {currentTab: filterStatus, onChangeTab: onFilterStatus} = useTabs("all");

	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);

	useEffect(() => {
		if (orders?.length !== 0) {
			setTableData(orders);
		}
	}, [orders]);

	const handleFilterName = (filterName) => {
		setFilterName(filterName);
		setPage(0);
	};

	const handleFilterService = (event) => {
		setFilterService(event.target.value);
	};

	const handleDeleteRow = (id) => {
		const deleteRow = tableData.filter((row) => row._id !== id);
		setSelected([]);
		setTableData(deleteRow);
	};

	const handleDeleteRows = (selected) => {
		const deleteRows = tableData.filter((row) => !selected.includes(row.id));
		setSelected([]);
		setTableData(deleteRows);
	};

	const handleEditRow = (id) => {
		navigate(PATH_DASHBOARD.order.editById(id));
	};

	const handleViewRow = (id) => {
		navigate(PATH_DASHBOARD.order.view(id));
	};

	const dataFiltered = applySortFilter({
		tableData,
		comparator: getComparator(order, orderBy),
		filterName,
		filterStatus,
	});

	const denseHeight = dense ? 56 : 76;

	const isNotFound =
		(!dataFiltered?.length && !!filterName) ||
		(!dataFiltered?.length && !!filterStatus) ||
		(!dataFiltered?.length && !!filterService) ||
		(!dataFiltered?.length && !!filterEndDate) ||
		(!dataFiltered?.length && !!filterStartDate);

	const getLengthByStatus = (status) =>
		tableData?.filter((item) => item?.order_status === status)?.length;

	const TABS = [
		{
			value: "all",
			label: "All",
			color: theme.palette.mode === "dark" ? "#fff" : "#0C53B7",
			bgColor: theme.palette.mode === "dark" ? "#0C53B7" : "rgba(24, 144, 255, 0.1)",
			count: tableData?.length,
		},
		{
			value: "order_placed",
			label: "order_placed",
			count: getLengthByStatus("order_placed"),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.order_placed.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.order_placed.main
					: theme.palette.status.order_placed.light,
		},
		{
			value: "accepted",
			label: "accepted",
			count: getLengthByStatus("accepted"),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.accepted.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.accepted.main
					: theme.palette.status.accepted.light,
		},
		{
			value: "cancelled",
			label: "cancelled",
			count: getLengthByStatus("cancelled"),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.cancelled.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.cancelled.main
					: theme.palette.status.cancelled.light,
		},
		{
			value: "kit_activated",
			label: "kit_activated",
			count: getLengthByStatus("kit_activated"),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.kit_activated.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.kit_activated.main
					: theme.palette.status.kit_activated.light,
		},
		{
			value: "processing",
			label: "processing",
			count: getLengthByStatus("processing"),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.processing.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.processing.main
					: theme.palette.status.processing.light,
		},
		{
			value: "completed",
			label: "completed",
			count: getLengthByStatus("completed"),
			color: theme.palette.mode === "dark" ? "#fff" : theme.palette.status.completed.main,
			bgColor:
				theme.palette.mode === "dark"
					? theme.palette.status.completed.main
					: theme.palette.status.completed.light,
		},
	];

	return (
		<Page title="Orders: List">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading="Orders List"
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Orders", href: PATH_DASHBOARD.order.root},
						{name: "List"},
					]}
					// action={
					// 	<Button
					// 		variant='contained'
					// 		component={RouterLink}
					// 		to={PATH_DASHBOARD.order.newOrder}
					// 		startIcon={<Iconify icon={'eva:plus-fill'} />}
					// 	>
					// 		New Order
					// 	</Button>
					// }
				/>

				{/* <Card sx={{mb: 5}}>
					<Scrollbar>
						<Stack
							direction='row'
							divider={<Divider orientation='vertical' flexItem sx={{borderStyle: 'dashed'}} />}
							sx={{py: 2}}
						>
							<InvoiceAnalytic
								title='Total'
								total={tableData.length}
								percent={100}
								price={sumBy(tableData, 'totalPrice')}
								icon='ic:round-receipt'
								color={theme.palette.info.main}
							/>
							<InvoiceAnalytic
								title='Paid'
								total={getLengthByStatus('paid')}
								percent={getPercentByStatus('paid')}
								price={getTotalPriceByStatus('paid')}
								icon='eva:checkmark-circle-2-fill'
								color={theme.palette.success.main}
							/>
							<InvoiceAnalytic
								title='Unpaid'
								total={getLengthByStatus('unpaid')}
								percent={getPercentByStatus('unpaid')}
								price={getTotalPriceByStatus('unpaid')}
								icon='eva:clock-fill'
								color={theme.palette.warning.main}
							/>
							<InvoiceAnalytic
								title='Overdue'
								total={getLengthByStatus('overdue')}
								percent={getPercentByStatus('overdue')}
								price={getTotalPriceByStatus('overdue')}
								icon='eva:bell-fill'
								color={theme.palette.error.main}
							/>
							<InvoiceAnalytic
								title='Draft'
								total={getLengthByStatus('draft')}
								percent={getPercentByStatus('draft')}
								price={getTotalPriceByStatus('draft')}
								icon='eva:file-fill'
								color={theme.palette.text.secondary}
							/>
						</Stack>
					</Scrollbar>
				</Card> */}

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

					<OrderTableToolbar
						filterName={filterName}
						filterService={filterService}
						filterStartDate={filterStartDate}
						filterEndDate={filterEndDate}
						onFilterName={handleFilterName}
						onFilterService={handleFilterService}
						onFilterStartDate={(newValue) => {
							setFilterStartDate(newValue);
						}}
						onFilterEndDate={(newValue) => {
							setFilterEndDate(newValue);
						}}
						optionsService={SERVICE_OPTIONS}
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
											tableData.map((row) => row.id)
										)
									}
									actions={
										<Stack spacing={1} direction="row">
											<Tooltip title="Sent">
												<IconButton color="primary">
													<Iconify icon={"ic:round-send"} />
												</IconButton>
											</Tooltip>

											<Tooltip title="Download">
												<IconButton color="primary">
													<Iconify icon={"eva:download-outline"} />
												</IconButton>
											</Tooltip>

											<Tooltip title="Print">
												<IconButton color="primary">
													<Iconify icon={"eva:printer-fill"} />
												</IconButton>
											</Tooltip>

											<Tooltip title="Delete">
												<IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
													<Iconify icon={"eva:trash-2-outline"} />
												</IconButton>
											</Tooltip>
										</Stack>
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
											tableData.map((row) => row?._id)
										)
									}
									sx={{width: "100%"}}
								/>

								<TableBody>
									{dataFiltered
										?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										?.map((row) => (
											<OrderTableRow
												key={row?._id}
												row={row}
												selected={selected.includes(row?._id)}
												onSelectRow={() => onSelectRow(row?._id)}
												onViewRow={() => handleViewRow(row?._id)}
												onEditRow={() => handleEditRow(row?._id)}
												onDeleteRow={() => handleDeleteRow(row?._id)}
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
							count={dataFiltered?.length !== undefined ? dataFiltered?.length : -1}
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
	filterStatus,
	// filterService,
	filterStartDate,
	filterEndDate,
}) {
	const stabilizedThis = tableData?.map((el, index) => [el, index]);

	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	tableData = stabilizedThis?.map((el) => el[0]);

	if (filterName) {
		tableData = tableData?.filter(
			(item) =>
				item?._id.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
				item?.person?.firstName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
				item?.person?.lastName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
		);
	}

	if (filterStatus !== "all") {
		tableData = tableData?.filter((item) => item?.order_status === filterStatus);
	}

	// if (filterService !== 'all') {
	// 	tableData = tableData?.filter((item) => item.items.some((c) => c.service === filterService));
	// }

	if (filterStartDate && filterEndDate) {
		tableData = tableData?.filter(
			(item) =>
				item?.createdAt?.getTime() >= filterStartDate.getTime() &&
				item?.createdAt?.getTime() <= filterEndDate.getTime()
		);
	}

	return tableData;
}
