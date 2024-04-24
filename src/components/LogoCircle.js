import React from "react";

// mui
import {Box} from "@mui/material";

//router
import {Link} from "react-router-dom";

// config
import {PATH_AFTER_LOGIN} from "src/config";

// utils
import image_constants from "src/utils/image_contants";

const LogoCircle = ({sx}) => {
	return (
		<Box
			sx={{
				width: "50px",
				maxWidth: "50px",
				overflow: "hidden",
			}}
			component={Link}
			to={PATH_AFTER_LOGIN}>
			<img
				src={image_constants.LOGO_CIRCLE}
				alt="logo"
				style={{
					height: "auto",
					width: "50px",
					objectFit: "cover",
				}}
				loading="lazy"
			/>
		</Box>
	);
};

export default LogoCircle;
