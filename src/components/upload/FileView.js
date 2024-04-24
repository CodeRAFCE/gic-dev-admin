import React from "react";

// @mui
import {alpha, Box, IconButton, Stack, Typography, useTheme} from "@mui/material";

// icons
import Iconify from "../Iconify";
import formatBytes from "src/utils/formatBytes";

export const FileView = ({onRemove, file}) => {
	const theme = useTheme();
	return (
		<Stack
			sx={{
				my: 2,
				border: `1px solid ${theme.palette.grey[400]}`,
				borderRadius: 1,
				py: 1.5,
				px: 2,
			}}
			direction={{xs: "column", sm: "row"}}
			justifyContent="space-between">
			<Stack sx={{width: 1}} direction={"row"} alignItems="center" spacing={2}>
				<Iconify
					icon="teenyicons:xls-solid"
					sx={{color: theme.palette.primary.main, height: "100%", width: "3%"}}
				/>

				{/* NAME AND SIZE */}
				<Box>
					<Typography sx={{fontWeight: 700}}>{file?.name}</Typography>
					<Typography variant="caption">{formatBytes(file?.size)}</Typography>
				</Box>
			</Stack>

			<Stack justifyContent={"center"}>
				<IconButton
					size="small"
					onClick={(e) => {
						e.stopPropagation();
						onRemove(file);
					}}
					sx={{
						p: "2px",
						color: "common.white",
						bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
						"&:hover": {
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
						},
					}}>
					<Iconify icon={"eva:close-fill"} />
				</IconButton>
			</Stack>
		</Stack>
	);
};
