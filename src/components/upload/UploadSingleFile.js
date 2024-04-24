import PropTypes from "prop-types";
import isString from "lodash/isString";
import {useDropzone} from "react-dropzone";
// @mui
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
//
import Image from "../Image";
import RejectionFiles from "./RejectionFiles";
import BlockContent from "./BlockContent";
import {FileView} from "./FileView";
import formatBytes from "src/utils/formatBytes";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({theme}) => ({
	outline: "none",
	overflow: "hidden",
	position: "relative",
	padding: theme.spacing(5, 1),
	borderRadius: theme.shape.borderRadius,
	transition: theme.transitions.create("padding"),
	backgroundColor: theme.palette.background.neutral,
	border: `1px dashed ${theme.palette.grey[500_32]}`,
	"&:hover": {opacity: 0.72, cursor: "pointer"},
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
	error: PropTypes.bool,
	showPreview: PropTypes.bool,
	file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	helperText: PropTypes.node,
	sx: PropTypes.object,
	onRemove: PropTypes.func,
};

function fileSizeValidator(file) {
	if (file?.size > 3145729) {
		return {
			code: "upload-limit",
			message: `File is larger than ${formatBytes(3145728)}`,
		};
	}

	return null;
}

export default function UploadSingleFile({
	error = false,
	file,
	helperText,
	sx,
	onRemove,
	showPreview,
	...other
}) {
	const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections} = useDropzone({
		multiple: false,
		validator: fileSizeValidator,
		...other,
	});

	return (
		<Box sx={{width: "100%", ...sx}}>
			<DropZoneStyle
				{...getRootProps()}
				sx={{
					...(isDragActive && {opacity: 0.72}),
					...((isDragReject || error) && {
						color: "error.main",
						borderColor: "error.light",
						bgcolor: "error.lighter",
					}),
					...(file && {
						padding: "12% 0",
					}),
				}}>
				<input {...getInputProps()} />

				<BlockContent />

				{file && (
					<Box sx={{position: "relative"}}>
						<Image
							alt="file preview"
							src={isString(file) ? file : file.preview}
							sx={{
								top: 8,
								left: 8,
								borderRadius: 1,
								position: "absolute",
								width: "calc(100% - 16px)",
								height: "calc(100% - 16px)",
							}}
						/>
					</Box>
				)}
			</DropZoneStyle>

			{fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

			{showPreview && file && <FileView file={file} onRemove={onRemove} />}

			{helperText && helperText}
		</Box>
	);
}
