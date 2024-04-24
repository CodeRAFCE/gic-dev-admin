import * as Yup from "yup";
import {useCallback, useMemo} from "react";

// form
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// @mui
import {styled} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import {Card, Grid, Stack, Typography} from "@mui/material";

//redux
// import {useDispatch} from "src/redux/store";
// import {uploadReport} from "src/redux/slices/reports/reportSlice";

// components
import {FormProvider, RHFUploadSingleFile} from "src/components/hook-form";

// file formats
import {SPREADSHEET_ONLY} from "src/utils/fileFormats";
import {HOST_API} from "src/config";
import axios from "axios";

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({theme}) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
	marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

// UploadReportForm.propTypes = {};

export default function UploadReportForm() {
	// const dispatch = useDispatch();

	const ReportSchema = Yup.object().shape({
		uploadReports: Yup.mixed().required("Upload a Excel file to continue"),
	});

	const defaultValues = useMemo(
		() => ({
			uploadReports: null,
		}),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const methods = useForm({
		resolver: yupResolver(ReportSchema),
		defaultValues,
	});

	const {
		reset,
		setValue,
		handleSubmit,

		formState: {isSubmitting},
	} = methods;

	const onSubmit = async (values) => {
		// const data = {
		// 	report: values.uploadReports,
		// };

		// console.log(values.uploadReports);
		try {
			const url = `${HOST_API}/api/admin/reports`;
			const file = values?.uploadReports;

			const data = new FormData();
			data.append("file", file);

			console.log("file", file);
			console.log("formData", data);
			const token = localStorage.getItem("token");

			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.post(url, data, config);

			console.log(response);
			reset();
		} catch (error) {
			console.log(error.response.data);
		}

		// console.log(data);
		// dispatch(uploadReport(data));
	};

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (Boolean(file)) {
				setValue(
					"uploadReports",
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				);
			}
		},
		[setValue]
	);

	const handleRemove = () => {
		setValue("uploadReports", null);
	};

	return (
		<>
			<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Card sx={{p: 3}}>
							<Stack spacing={3}>
								<div>
									<LabelStyle>Upload Report</LabelStyle>
									<RHFUploadSingleFile
										name="uploadReports"
										showPreview
										accept={SPREADSHEET_ONLY}
										maxSize={3145728}
										onDrop={handleDrop}
										onRemove={handleRemove}
									/>
								</div>

								<LoadingButton
									type="submit"
									variant="contained"
									size="large"
									loading={isSubmitting}>
									Upload File
								</LoadingButton>
							</Stack>
						</Card>
					</Grid>
				</Grid>
			</FormProvider>
			{/* <Box
				component="form"
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						const url = `${HOST_API}/api/admin/reports`;
						const formData = new FormData();
						console.log(selectedFile);
						formData.append("file", selectedFile);

						for (var key of formData.entries()) {
							console.log(key[0] + ", " + key[1]);
						}

						const token = localStorage.getItem("token");

						const config = {
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${token}`,
							},
						};
						const response = await axios.post(url, formData, config);

						console.log(response);
					} catch (error) {
						console.error(error);
					}
				}}>
				<input
					type="file"
					onChange={(e) => {
						setSelectedFile(e.target.files[0]);
					}}
				/>
				<Button type="submit">sumbit</Button>
			</Box> */}
		</>
	);
}
