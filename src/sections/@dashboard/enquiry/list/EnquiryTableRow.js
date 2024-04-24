import PropTypes from "prop-types";
import {useState} from "react";
// @mui
import {useTheme} from "@mui/material/styles";
import {Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Button} from "@mui/material";
// components
import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import {TableMoreMenu} from "../../../../components/table";
import createAvatar from "src/utils/createAvatar";

// ----------------------------------------------------------------------

EnquiryTableRow.propTypes = {
	row: PropTypes.object,
	selected: PropTypes.bool,
	onSelectRow: PropTypes.func,
	onDeleteRow: PropTypes.func,
	onViewRow: PropTypes.func,
};

export default function EnquiryTableRow({row, selected, onSelectRow, onDeleteRow, onViewRow}) {
	const theme = useTheme();

	const {firstName, lastName, email, phone, isClosed} = row;

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
				<Avatar alt={firstName} color={createAvatar(firstName).color} sx={{mr: 2}}>
					{createAvatar(firstName).name}
				</Avatar>

				<Typography variant="subtitle2" noWrap sx={{textTransform: "capitalize"}}>
					{firstName} {lastName}
				</Typography>
			</TableCell>

			<TableCell align="left">{email}</TableCell>

			<TableCell align="left">+91 {phone}</TableCell>

			{/* <TableCell align='left' sx={{textTransform: 'capitalize'}}>
				<Button>Resend Mail</Button>
			</TableCell> */}

			<TableCell align="left">
				<Label
					variant={theme.palette.mode === "light" ? "ghost" : "filled"}
					color={isClosed ? "warning" : "success"}
					sx={{textTransform: "capitalize"}}>
					{isClosed ? "Closed" : "Open"}
				</Label>
			</TableCell>

			<TableCell align="center">
				<Button variant="contained" onClick={onViewRow}>
					View
				</Button>
			</TableCell>

			<TableCell align="right">
				<TableMoreMenu
					open={openMenu}
					onOpen={handleOpenMenu}
					onClose={handleCloseMenu}
					actions={
						<>
							<MenuItem
								onClick={() => {
									onDeleteRow();
									handleCloseMenu();
								}}
								sx={{color: "error.main"}}>
								<Iconify icon={"eva:trash-2-outline"} />
								Delete
							</MenuItem>
							{/* <MenuItem
								onClick={() => {
									onEditRow();
									handleCloseMenu();
								}}>
								<Iconify icon={"eva:edit-fill"} />
								Edit
							</MenuItem> */}
						</>
					}
				/>
			</TableCell>
		</TableRow>
	);
}
