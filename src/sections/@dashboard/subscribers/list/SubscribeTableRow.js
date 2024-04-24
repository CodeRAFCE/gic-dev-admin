import PropTypes from "prop-types";
import {useState} from "react";
// @mui
// import {useTheme} from "@mui/material/styles";
import {Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem} from "@mui/material";
// components
// import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import {TableMoreMenu} from "../../../../components/table";
import {fgetDate} from "src/utils/formatTime";
import createAvatar from "src/utils/createAvatar";
import useAuthorize from "src/hooks/useAuthorize";

// ----------------------------------------------------------------------

SubscribeTableRow.propTypes = {
	row: PropTypes.object,
	selected: PropTypes.bool,
	onEditRow: PropTypes.func,
	onSelectRow: PropTypes.func,
	onDeleteRow: PropTypes.func,
};

export default function SubscribeTableRow({row, selected, onEditRow, onSelectRow, onDeleteRow}) {
	// const theme = useTheme();
	const isAuthorize = useAuthorize();

	const {email, createdAt, isSubscribed} = row;

	const [openMenu, setOpenMenuActions] = useState(null);

	const handleOpenMenu = (event) => {
		setOpenMenuActions(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpenMenuActions(null);
	};

	return (
		<TableRow hover selected={selected}>
			<TableCell padding="checkbox">
				<Checkbox checked={selected} onClick={onSelectRow} />
			</TableCell>

			<TableCell sx={{display: "flex", alignItems: "center"}}>
				<Avatar
					alt={email}
					color={createAvatar(email).color}
					// src={avatarUrl}
					sx={{mr: 2, cursor: "pointer"}}
					onClick={onEditRow}
				>
					{createAvatar(email).name}
				</Avatar>
				<Typography variant="subtitle2" sx={{cursor: "pointer"}} noWrap onClick={onEditRow}>
					{email}
				</Typography>
			</TableCell>

			<TableCell align="left" sx={{textTransform: "capitalize"}}>
				{fgetDate(createdAt)}
			</TableCell>

			<TableCell align="center">
				<Iconify
					icon={isSubscribed ? "eva:checkmark-circle-fill" : "eva:clock-outline"}
					sx={{
						width: 20,
						height: 20,
						color: "success.main",
						...(!isSubscribed && {color: "warning.main"}),
					}}
				/>
			</TableCell>

			<TableCell align="right">
				<TableMoreMenu
					open={openMenu}
					onOpen={handleOpenMenu}
					onClose={handleCloseMenu}
					actions={
						<>
							{isAuthorize && (
								<MenuItem
									onClick={() => {
										onDeleteRow();
										handleCloseMenu();
									}}
									sx={{color: "error.main"}}
								>
									<Iconify icon={"eva:trash-2-outline"} />
									Delete
								</MenuItem>
							)}
						</>
					}
				/>
			</TableCell>
		</TableRow>
	);
}
