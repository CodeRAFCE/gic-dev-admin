import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// @mui
import {
	Box,
	Card,
	Table,
	Switch,
	Button,
	Tooltip,
	TableBody,
	Container,
	IconButton,
	TableContainer,
	TablePagination,
	FormControlLabel,
} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, {getComparator, emptyRows} from '../../../hooks/useTable';

// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
	TableEmptyRows,
	TableHeadCustom,
	TableNoData,
	TableSelectedActions,
} from '../../../components/table';
// sections
import {AdminTableRow, AdminTableToolbar} from '../../../sections/@dashboard/admin/list';

//redux
import {useDispatch, useSelector} from 'src/redux/store';
import {getAdmins, removeAdmin} from 'src/redux/slices/admin/adminSlice';

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = ['all', 'active', 'banned'];

const TABLE_HEAD = [
	{id: 'name', label: 'Name', align: 'left'},
	{id: 'email', label: 'Email', align: 'left'},
	{id: 'phone', label: 'Phone', align: 'left'},
	{id: 'isVerified', label: 'Verified', align: 'center'},
	{id: 'status', label: 'Status', align: 'left'},
	{id: ''},
];

// ----------------------------------------------------------------------

export default function AdminList() {
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
	const navigate = useNavigate();

	const {admins, isAdminLoading} = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const [tableData, setTableData] = useState([]);
	const [filterName, setFilterName] = useState('');
	const [filterEmail, setFilterEmail] = useState('');
	// const {currentTab: filterStatus, onChangeTab: onChangeFilterStatus} = useTabs('all');

	useEffect(() => {
		dispatch(getAdmins());
	}, [dispatch]);

	useEffect(() => {
		if (admins?.length) {
			setTableData(admins);
		}
	}, [admins]);

	const handleFilterName = (filterName) => {
		setFilterName(filterName);
		setPage(0);
	};

	const handleFilterEmail = (event) => {
		setFilterEmail(event.target.value);
	};

	const handleDeleteRow = (id) => {
		dispatch(removeAdmin({id}));
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
	});

	const denseHeight = dense ? 52 : 72;

	const isNotFound =
		(!dataFiltered?.length && !!filterName) ||
		(!dataFiltered?.length && !!filterEmail) ||
		(!isAdminLoading && !dataFiltered?.length);

	return (
		<Page title='Admin: List'>
			<Container maxWidth={themeStretch ? false : 'lg'}>
				<HeaderBreadcrumbs
					heading='Admin List'
					links={[
						{name: 'Dashboard', href: PATH_DASHBOARD.root},
						{name: 'Admin', href: PATH_DASHBOARD.admin.root},
						{name: 'List'},
					]}
					action={
						<Button
							variant='contained'
							component={RouterLink}
							to={PATH_DASHBOARD.admin.create}
							startIcon={<Iconify icon={'eva:plus-fill'} />}
						>
							New Admin
						</Button>
					}
				/>

				<Card>
					{/* <Tabs
						allowScrollButtonsMobile
						variant='scrollable'
						scrollButtons='auto'
						value={filterStatus}
						onChange={onChangeFilterStatus}
						sx={{px: 2, bgcolor: 'background.neutral'}}
					>
						{STATUS_OPTIONS.map((tab) => (
							<Tab disableRipple key={tab} label={tab} value={tab} />
						))}
					</Tabs> */}

					{/* <Divider /> */}

					<AdminTableToolbar
						filterName={filterName}
						filterEmail={filterEmail}
						onFilterName={handleFilterName}
						onFilterEmail={handleFilterEmail}
					/>

					<Scrollbar>
						<TableContainer sx={{minWidth: 800, position: 'relative'}}>
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
										<Tooltip title='Delete'>
											<IconButton color='primary' onClick={() => handleDeleteRows(selected)}>
												<Iconify icon={'eva:trash-2-outline'} />
											</IconButton>
										</Tooltip>
									}
								/>
							)}

							<Table size={dense ? 'small' : 'medium'}>
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
											<AdminTableRow
												key={row?._id}
												row={row}
												selected={selected?.includes(row?._id)}
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

					<Box sx={{position: 'relative'}}>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={dataFiltered?.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={onChangePage}
							onRowsPerPageChange={onChangeRowsPerPage}
						/>

						<FormControlLabel
							control={<Switch checked={dense} onChange={onChangeDense} />}
							label='Dense'
							sx={{px: 3, py: 1.5, top: 0, position: {md: 'absolute'}}}
						/>
					</Box>
				</Card>
			</Container>
		</Page>
	);
}

// ----------------------------------------------------------------------

function applySortFilter({tableData, comparator, filterName, filterEmail, filterPhone}) {
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

	if (filterEmail) {
		tableData = tableData?.filter((item) => item.email === filterEmail);
	}

	if (filterPhone) {
		tableData = tableData?.filter((item) => item.phone === filterPhone);
	}

	return tableData;
}
