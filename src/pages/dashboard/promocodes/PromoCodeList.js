import {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
// @mui
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
	Button,
} from "@mui/material";
// routes
import {PATH_DASHBOARD} from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
import useTable, {getComparator, emptyRows} from "../../../hooks/useTable";
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
import {
	PromocodeTableRow,
	PromocodeTableToolbar,
} from "../../../sections/@dashboard/promocodes/list";

//redux
import {useDispatch, useSelector} from "src/redux/store";
import {getPromoCodes} from "src/redux/slices/promocodes/promocodeSlice";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{id: "code", label: "Code", align: "left"},
	{id: "type", label: "Type", align: "left"},
	{id: "startDate", label: "Start Date", align: "left"},
	{id: "endDate", label: "End Date", align: "left"},
	{id: "isActive", label: "Status", align: "left"},
	{id: ""},
];

// ----------------------------------------------------------------------

export default function PromoCodeList() {
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

	const {themeStretch} = useSettings();
	// const navigate = useNavigate();

	const {promocodes, isPromocodeLoading} = useSelector((state) => state.promocode);
	const dispatch = useDispatch();

	const [tableData, setTableData] = useState([]);
	const [filterName, setFilterName] = useState("");
	const [filterEmail, setFilterEmail] = useState("");

	useEffect(() => {
		dispatch(getPromoCodes());
	}, [dispatch]);

	useEffect(() => {
		if (promocodes?.length) {
			setTableData(promocodes);
		}
	}, [promocodes]);

	const handleFilterName = (filterName) => {
		setFilterName(filterName);
		setPage(0);
	};

	const handleFilterEmail = (event) => {
		setFilterEmail(event.target.value);
	};

	const handleDeleteRow = (id) => {};

	const handleDeleteRows = (selected) => {
		const deleteRows = tableData.filter((row) => !selected.includes(row?._id));
		setSelected([]);
		setTableData(deleteRows);
	};

	const handleEditRow = (id) => {};

	const dataFiltered = applySortFilter({
		tableData,
		comparator: getComparator(order, orderBy),
		filterName,
		filterEmail,
	});

	const denseHeight = dense ? 52 : 72;

	const isNotFound =
		(!dataFiltered?.length && !!filterName) ||
		(!dataFiltered?.length && !!filterEmail) ||
		(!isPromocodeLoading && !dataFiltered?.length);

	return (
		<Page title="Promo Codes: List">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading="Promo Code List"
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{name: "Promo Codes", href: PATH_DASHBOARD.promocode.root},
						{name: "List"},
					]}
					action={
						<Button
							variant="contained"
							component={RouterLink}
							to={PATH_DASHBOARD.promocode.new}
							startIcon={<Iconify icon={"eva:plus-fill"} />}
						>
							New Promocode
						</Button>
					}
				/>

				<Card>
					<PromocodeTableToolbar
						filterName={filterName}
						filterRole={filterEmail}
						onFilterName={handleFilterName}
						onFilterEmail={handleFilterEmail}
					/>

					<Scrollbar>
						<TableContainer sx={{minWidth: 800, position: "relative"}}>
							{selected.length > 0 && (
								<TableSelectedActions
									dense={dense}
									numSelected={selected.length}
									rowCount={tableData?.length}
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
											<PromocodeTableRow
												key={row._id}
												row={row}
												selected={selected.includes(row?._id)}
												onSelectRow={() => onSelectRow(row?._id)}
												onDeleteRow={() => handleDeleteRow(row?._id)}
												onEditRow={() => handleEditRow(row?._id)}
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

function applySortFilter({tableData, comparator, filterName, filterEmail}) {
	const stabilizedThis = tableData?.map((el, index) => [el, index]);

	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	tableData = stabilizedThis?.map((el) => el[0]);

	if (filterName) {
		tableData = tableData?.filter(
			(item) => item.userName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
		);
	}

	if (filterEmail) {
		tableData = tableData?.filter((item) => item?.email === filterEmail);
	}

	return tableData;
}
