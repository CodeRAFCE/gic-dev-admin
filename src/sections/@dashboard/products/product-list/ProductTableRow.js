import PropTypes from "prop-types";
import {useState} from "react";
// import {sentenceCase} from 'change-case';

// @mui
import {useTheme} from "@mui/material/styles";
import {TableRow, Checkbox, TableCell, Typography, MenuItem} from "@mui/material";
// utils
import {fgetDate} from "../../../../utils/formatTime";
import {fCurrency} from "../../../../utils/formatNumber";
// components
import Label from "../../../../components/Label";
import Image from "../../../../components/Image";
import Iconify from "../../../../components/Iconify";
import {TableMoreMenu} from "../../../../components/table";
//

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
	row: PropTypes.object,
	selected: PropTypes.bool,
	onEditRow: PropTypes.func,
	onSelectRow: PropTypes.func,
	onDeleteRow: PropTypes.func,
};

export default function ProductTableRow({row, selected, onEditRow, onSelectRow, onDeleteRow}) {
	const theme = useTheme();

	const {name, imageKey, createdAt, inventoryType, price} = row;

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
				<Image
					disabledEffect
					alt={name}
					src={imageKey}
					sx={{borderRadius: 1.5, width: 48, height: 48, mr: 2}}
					onClick={onEditRow}
				/>
				<Typography variant="subtitle2" noWrap onClick={onEditRow}>
					{name}
				</Typography>
			</TableCell>

			<TableCell>{fgetDate(createdAt)}</TableCell>

			<TableCell align="center">
				<Label
					variant={theme.palette.mode === "light" ? "ghost" : "filled"}
					color={
						(inventoryType === "out_of_stock" && "error") ||
						(inventoryType === "low_stock" && "warning") ||
						"success"
					}
					sx={{textTransform: "capitalize"}}>
					{/* {inventoryType ? sentenceCase(inventoryType) : ''} */}
					In Stock
				</Label>
			</TableCell>

			<TableCell align="right">&#8377;{fCurrency(price)}</TableCell>

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
							<MenuItem
								onClick={() => {
									onEditRow();
									handleCloseMenu();
								}}>
								<Iconify icon={"eva:edit-fill"} />
								Edit
							</MenuItem>
						</>
					}
				/>
			</TableCell>
		</TableRow>
	);
}
