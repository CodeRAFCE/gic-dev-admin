import {useState, useEffect} from "react";
import {useNavigate, Link as RouterLink} from "react-router-dom";
// @mui
import {
	Box,
	Card,
	Table,
	Button,
	Switch,
	Tooltip,
	TableBody,
	Container,
	IconButton,
	TableContainer,
	TablePagination,
	FormControlLabel,
} from "@mui/material";
// redux
import {useDispatch, useSelector} from "../../../redux/store";
import {getAllProducts} from "../../../redux/slices/products/productSlice";

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
	TableNoData,
	TableSkeleton,
	TableEmptyRows,
	TableHeadCustom,
	TableSelectedActions,
} from "../../../components/table";
// sections
import {
	ProductTableRow,
	ProductTableToolbar,
} from "../../../sections/@dashboard/products/product-list";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{id: "name", label: "Product", align: "left"},
	{id: "createdAt", label: "Create at", align: "left"},
	{id: "inventoryType", label: "Status", align: "center", width: 180},
	{id: "price", label: "Price", align: "right"},
	{id: ""},
];

// ----------------------------------------------------------------------

export default function ProductList() {
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
	} = useTable({
		defaultOrderBy: "createdAt",
	});

	const {themeStretch} = useSettings();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const {products, isLoading} = useSelector((state) => state.product);

	const [tableData, setTableData] = useState([]);

	const [filterName, setFilterName] = useState("");

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	useEffect(() => {
		if (products?.length) {
			setTableData(products);
		}
	}, [products]);

	const handleFilterName = (filterName) => {
		setFilterName(filterName);
		setPage(0);
	};

	const handleDeleteRow = (id) => {
		const deleteRow = tableData?.filter((row) => row?._id !== id);
		setSelected([]);
		setTableData(deleteRow);
	};

	const handleDeleteRows = (selected) => {
		const deleteRows = tableData?.filter((row) => !selected?.includes(row?._id));
		setSelected([]);
		setTableData(deleteRows);
	};

	const handleEditRow = (id) => {
		navigate(PATH_DASHBOARD.product.editById(id));
	};

	const dataFiltered = applySortFilter({
		tableData,
		comparator: getComparator(order, orderBy),
		filterName,
	});

	const denseHeight = dense ? 60 : 80;

	const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

	return (
		<Page title="Ecommerce: Product List">
			<Container maxWidth={themeStretch ? false : "lg"}>
				<HeaderBreadcrumbs
					heading="Product List"
					links={[
						{name: "Dashboard", href: PATH_DASHBOARD.root},
						{
							name: "Products",
							href: PATH_DASHBOARD.product.root,
						},
						{name: "Product List"},
					]}
					action={
						<Button
							variant="contained"
							startIcon={<Iconify icon="eva:plus-fill" />}
							component={RouterLink}
							to={PATH_DASHBOARD.product.newProduct}>
							New Product
						</Button>
					}
				/>

				<Card>
					<ProductTableToolbar filterName={filterName} onFilterName={handleFilterName} />

					<Scrollbar>
						<TableContainer sx={{minWidth: 800}}>
							{selected.length > 0 && (
								<TableSelectedActions
									dense={dense}
									numSelected={selected?.length}
									rowCount={tableData?.length}
									onSelectAllRows={(checked) =>
										onSelectAllRows(
											checked,
											tableData.map((row) => row?._id)
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
									{(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
										?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										?.map((row, index) =>
											row ? (
												<ProductTableRow
													key={row?._id}
													row={row}
													selected={selected?.includes(row?._id)}
													onSelectRow={() => onSelectRow(row?._id)}
													onDeleteRow={() => handleDeleteRow(row?._id)}
													onEditRow={() => handleEditRow(row?._id)}
												/>
											) : (
												!isNotFound && <TableSkeleton key={index} sx={{height: denseHeight}} />
											)
										)}

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

function applySortFilter({tableData, comparator, filterName}) {
	const stabilizedThis = tableData?.map((el, index) => [el, index]);

	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	tableData = stabilizedThis?.map((el) => el[0]);

	if (filterName) {
		tableData = tableData?.filter(
			(item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
		);
	}

	return tableData;
}
