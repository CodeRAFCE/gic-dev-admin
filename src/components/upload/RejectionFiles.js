import PropTypes from "prop-types";
// @mui
import {alpha} from "@mui/material/styles";
import {Box, Paper, Typography} from "@mui/material";
// utils
// import {fData} from "../../utils/formatNumber";
import formatBytes from "src/utils/formatBytes";

// ----------------------------------------------------------------------

RejectionFiles.propTypes = {
	fileRejections: PropTypes.array,
};

export default function RejectionFiles({fileRejections}) {
	return (
		<Paper
			variant="outlined"
			sx={{
				py: 1,
				px: 2,
				mt: 3,
				borderColor: "error.light",
				bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
			}}>
			{fileRejections.map(({file, errors}) => {
				const {path, size} = file;

				console.log(errors);

				return (
					<Box key={path} sx={{my: 1}}>
						<Typography variant="subtitle2" noWrap>
							{path} - {formatBytes(size)} (Upload limit is 3.1MB)
						</Typography>

						{errors.map((error) => (
							<Typography key={error.code} variant="caption" component="p">
								- {error.message}
							</Typography>
						))}
					</Box>
				);
			})}
		</Paper>
	);
}
