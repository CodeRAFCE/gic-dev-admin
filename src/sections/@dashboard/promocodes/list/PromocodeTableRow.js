import PropTypes from "prop-types";
import {useState} from "react";
// @mui
// import {useTheme} from "@mui/material/styles";
import {Checkbox, TableRow, TableCell, Typography, MenuItem} from "@mui/material";
// components
// import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import {TableMoreMenu} from "../../../../components/table";
import {fgetDate} from "src/utils/formatTime";
import useAuthorize from "src/hooks/useAuthorize";

// ----------------------------------------------------------------------

PromocodeTableRow.propTypes = {
	row: PropTypes.object,
	selected: PropTypes.bool,
	onEditRow: PropTypes.func,
	onSelectRow: PropTypes.func,
	onDeleteRow: PropTypes.func,
};

export default function PromocodeTableRow({row, selected, onEditRow, onSelectRow, onDeleteRow}) {
	// const theme = useTheme();
	const isAuthorize = useAuthorize();

	const {code, type, isActive, startDate, endDate} = row;

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

			<TableCell align="left">
				<Typography variant="subtitle2" sx={{cursor: "pointer"}} noWrap onClick={onEditRow}>
					{code}
				</Typography>
			</TableCell>

			<TableCell align="left" sx={{textTransform: "capitalize"}}>
				{type}
			</TableCell>

			<TableCell align="left" sx={{textTransform: "capitalize"}}>
				{fgetDate(startDate)}
			</TableCell>

			<TableCell align="left" sx={{textTransform: "capitalize"}}>
				{fgetDate(endDate)}
			</TableCell>

			<TableCell align="center">
				<Iconify
					icon={isActive ? "eva:checkmark-circle-fill" : "eva:clock-outline"}
					sx={{
						width: 20,
						height: 20,
						color: "success.main",
						...(!isActive && {color: "warning.main"}),
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
