import {useState} from "react";
import PropTypes from "prop-types";
import {useSnackbar} from "notistack";
import {CopyToClipboard} from "react-copy-to-clipboard";
// @mui
import {Tooltip, TextField, IconButton, InputAdornment, styled} from "@mui/material";
//
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const TextFieldWrapper = styled(TextField)({
	"& .MuiOutlinedInput-root": {
		borderRadius: 3,
		// backgroundColor: "#fff",
		padding: 0,

		"& fieldset": {
			border: "none",
		},
		"& input[type=number]": {
			MozAppearance: "textfield",
		},
		"& input[type=number]::-webkit-outer-spin-button": {
			WebkitAppearance: "none",
			margin: 0,
		},
		"& input[type=number]::-webkit-inner-spin-button": {
			WebkitAppearance: "none",
			margin: 0,
		},

		"& .Mui-disabled": {
			WebkitTextFillColor: "#333",
			fontWeight: 700,
			padding: 0,
			cursor: "pointer",
		},
	},

	"& .MuiInputBase-input": {
		width: "auto",
	},

	"&: MuiInputBase-root": {
		padding: 0,
	},
});

CopyClipboard.propTypes = {
	value: PropTypes.string,
};

export default function CopyClipboard({value, ...other}) {
	const {enqueueSnackbar} = useSnackbar();
	const [state, setState] = useState({
		value,
		copied: false,
	});

	const handleChange = (event) => {
		setState({value: event.target.value, copied: false});
	};

	const onCopy = () => {
		setState({...state, copied: true});
		if (state.value) {
			enqueueSnackbar("Copied!");
		}
	};

	return (
		<TextFieldWrapper
			fullWidth={false}
			value={state.value}
			disabled
			onChange={handleChange}
			onClick={onCopy}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<CopyToClipboard text={state.value} onCopy={onCopy}>
							<Tooltip title="Copy">
								<IconButton>
									<Iconify icon={"eva:copy-fill"} width={24} height={24} />
								</IconButton>
							</Tooltip>
						</CopyToClipboard>
					</InputAdornment>
				),
			}}
			{...other}
		/>
	);
}
