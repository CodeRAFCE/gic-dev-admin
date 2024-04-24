import PropTypes from "prop-types";
import {useState} from "react";
// @mui
import {useTheme} from "@mui/material/styles";
import {
	Checkbox,
	TableRow,
	TableCell,
	Typography,
	MenuItem,
	Box,
	// Chip,
} from "@mui/material";
// utils
import {fgetDate} from "../../../../utils/formatTime";
// import createAvatar from "../../../../utils/createAvatar";
// import {fCurrency} from '../../../../utils/formatNumber';

// components
// import Label from '../../../../components/Label';
// import Avatar from "../../../../components/Avatar";
import Iconify from "../../../../components/Iconify";
import {TableMoreMenu} from "../../../../components/table";
import {ActionButtons} from "src/components/ActionButtons";

// guards
import SuperAdminGuard from "src/guards/SuperAdminGuard";
import CopyClipboard from "src/components/CopyClipboard";

// ----------------------------------------------------------------------

OrderTableRow.propTypes = {
	row: PropTypes.object.isRequired,
	selected: PropTypes.bool,
	onSelectRow: PropTypes.func,
	onViewRow: PropTypes.func,
	onEditRow: PropTypes.func,
	onDeleteRow: PropTypes.func,
};

export default function OrderTableRow({
	row,
	selected,
	onSelectRow,
	onViewRow,
	onEditRow,
	onDeleteRow,
}) {
	const theme = useTheme();

	const {_id, placedAt, order_status, kit} = row;

	const [openMenu, setOpenMenuActions] = useState(null);

	const handleOpenMenu = (event) => {
		setOpenMenuActions(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpenMenuActions(null);
	};

	const renderDate = (dateString) => {
		const date = fgetDate(dateString, true);

		return (
			<Box
				sx={{display: {xs: "flex", md: "inherit"}, justifyContent: {xs: "center", md: "inherit"}}}>
				<Typography sx={{fontWeight: 700}}>{date.split("at")[0]}</Typography>
				<Typography variant="caption" sx={{fontWeight: 700, color: "text.disabled"}}>{`(${
					date.split("at")[1]
				})`}</Typography>
			</Box>
		);
	};

	return (
		<TableRow hover selected={selected}>
			<TableCell padding="checkbox">
				<Checkbox checked={selected} onClick={onSelectRow} />
			</TableCell>

			<TableCell align="left">
				<Typography
					variant="body2"
					noWrap
					onClick={onViewRow}
					sx={{
						cursor: "pointer",
						fontWeight: 700,
						color: theme.palette.primary.main,
						"&:hover": {color: theme.palette.primary.dark, transition: "0.2s ease-out"},
					}}>
					{_id}
				</Typography>
			</TableCell>

			{/* <TableCell sx={{display: "flex", alignItems: "center"}}>
				<Avatar
					alt={person?.firstName}
					color={createAvatar(person?.firstName).color}
					sx={{mr: 2, cursor: "pointer"}}
					onClick={onViewRow}>
					{createAvatar(person?.firstName).name}
				</Avatar>

				<Stack>
					<Typography variant="subtitle2" noWrap onClick={onViewRow} sx={{cursor: "pointer"}}>
						{person?.firstName} {person?.lastName}
					</Typography>


				</Stack>
			</TableCell> */}

			<TableCell align="left">{renderDate(placedAt)}</TableCell>

			<TableCell align="left">
				<Typography
					variant="caption"
					sx={{
						p: 0.8,
						px: 1.4,
						borderRadius: 30,
						fontWeight: 700,
						color:
							theme.palette.mode === "dark" ? "#fff" : theme.palette.status[order_status]?.main,
						backgroundColor:
							theme.palette.mode === "dark"
								? theme.palette.status[order_status]?.main
								: theme.palette.status[order_status]?.light,
					}}>
					{order_status.replaceAll("_", " ")}
				</Typography>
			</TableCell>

			<TableCell>
				{kit?.linkedId ? (
					<CopyClipboard value={kit?.linkedId} />
				) : (
					<Box textAlign="center">
						<span>-</span>
					</Box>
				)}
			</TableCell>

			<TableCell>
				<ActionButtons
					status={order_status}
					hasReport={Boolean(kit?.report)}
					kitStatus={kit?.kit_status}
					orderId={_id}
					placedAt={placedAt}
					view={onViewRow}
					linkedId={kit?.linkedId}
					showView
				/>
			</TableCell>

			<TableCell align="right">
				<TableMoreMenu
					open={openMenu}
					onOpen={handleOpenMenu}
					onClose={handleCloseMenu}
					actions={
						<>
							<SuperAdminGuard>
								<MenuItem
									onClick={() => {
										onDeleteRow();
										handleCloseMenu();
									}}
									sx={{color: "error.main"}}>
									<Iconify icon={"eva:trash-2-outline"} />
									Delete
								</MenuItem>
							</SuperAdminGuard>

							<MenuItem
								onClick={() => {
									onViewRow();
									handleCloseMenu();
								}}>
								<Iconify icon={"eva:eye-fill"} />
								View
							</MenuItem>

							<SuperAdminGuard>
								<MenuItem
									onClick={() => {
										onEditRow();
										handleCloseMenu();
									}}>
									<Iconify icon={"eva:edit-fill"} />
									Edit
								</MenuItem>
							</SuperAdminGuard>
						</>
					}
				/>
			</TableCell>
		</TableRow>
	);
}
