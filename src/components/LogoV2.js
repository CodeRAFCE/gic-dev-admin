import React from "react";

// mui
import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

// utils
import image_constants from "src/utils/image_contants";

const LogoV2 = () => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				width: "180px",
				maxWidth: "180px",
				overflow: "hidden",
			}}>
			<img
				src={theme.palette.mode === "light" ? image_constants.LOGO : image_constants.LOGO_ALT}
				alt="logo"
				style={{
					height: "auto",
					width: "180px",
					objectFit: "cover",
				}}
				loading="lazy"
			/>
		</Box>
	);
};

export default LogoV2;
