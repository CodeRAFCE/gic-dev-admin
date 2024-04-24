import PropTypes from "prop-types";
import * as Yup from "yup";
import {useCallback, useEffect, useMemo} from "react";

// form
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// file Formats
import {IMAGE_ONLY} from "src/utils/fileFormats";

// @mui
import {styled} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";
import {Card, Grid, Stack, Typography, InputAdornment} from "@mui/material";

// components
import {
	FormProvider,
	RHFSwitch,
	RHFEditor,
	RHFTextField,
	RHFUploadMultiFile,
	RHFUploadSingleFile,
} from "src/components/hook-form";
import {HOST_API} from "src/config";
import axios from "axios";

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({theme}) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
	marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewEditForm.propTypes = {
	isEdit: PropTypes.bool,
	currentProduct: PropTypes.object,
};

export default function ProductNewEditForm({isEdit, currentProduct}) {
	const NewProductSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		description: Yup.string().required("Description is required"),
		additionalInfo: Yup.string().required("Addtional Information is required"),
		imageTitle: Yup.mixed().required("Image Title is required"),
		mainImage: Yup.mixed().required("Main Image is required"),
		images: Yup.array().min(1, "Images is required"),
		price: Yup.number().moreThan(0, "Price should not be $0.00"),
	});

	const defaultValues = useMemo(
		() => ({
			name: "",
			description: "",
			additionalInfo: "",
			imageTitle: null,
			mainImage: null,
			images: [],
			sku: "",
			price: 0,
			priceSale: 0,
			inStock: true,
			taxes: true,
		}),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const methods = useForm({
		resolver: yupResolver(NewProductSchema),
		defaultValues,
	});

	const {
		reset,
		watch,
		setValue,
		getValues,
		handleSubmit,
		formState: {isSubmitting},
	} = methods;

	const values = watch();

	useEffect(() => {
		if (isEdit && currentProduct) {
			reset(defaultValues);
		}
		if (!isEdit) {
			reset(defaultValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, currentProduct]);

	const handlePostProducts = async (values) => {
		try {
			const url = `${HOST_API}/api/admin/products`;

			const productImages = values.images;
			const productImageTitle = values.imageTitle;
			const productImageKey = values.mainImage;

			const images = new FormData();
			images.append("images", productImages);

			const imageTitle = new FormData();
			imageTitle.append("imageTitle", productImageTitle);

			const imageKey = new FormData();
			imageKey.append("imageKey", productImageKey);

			const token = localStorage.getItem("token");

			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			};

			const newData = {
				name: values.name,
				description: values.description,
				additionalInfo: values.additionalInfo,
				price: values.price,
				sku: values.sku,
				inStock: values.inStock,
				taxes: values.taxes,
				imageKey,
				imageTitle,
				images,
			};

			const response = await axios.post(url, newData, config);

			console.log(response);

			reset();
		} catch (error) {
			console.log(error);
		}
	};

	// const handleEditProducts = async () => {};

	const onSubmit = async (values) => {
		// try {
		// 	await new Promise((resolve) => setTimeout(resolve, 500));
		// 	console.log(values);
		// 	const data = {
		// 		name: values.name,
		// 		imageTitle: values.imageTitle,
		// 		description: values.description,
		// 		additionalInfo: values.additionalInfo,
		// 		imageKey: values.mainImage,
		// 		price: values.price,
		// 		imageUrl: values.images,
		// 	};
		// 	dispatch(createProduct(data));
		// 	reset();
		// 	enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
		// 	navigate(PATH_DASHBOARD.product.list);
		// } catch (error) {
		// 	console.error(error);
		// }

		handlePostProducts(values);
	};

	const handleDrop = useCallback(
		(acceptedFiles) => {
			setValue(
				"images",
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
		[setValue]
	);

	const handleTitleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				setValue(
					"imageTitle",
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				);
			}
		},
		[setValue]
	);

	const handleMainImageDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				setValue(
					"mainImage",
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				);
			}
		},
		[setValue]
	);

	const handleRemoveAll = () => {
		setValue("images", []);
	};

	const handleRemove = (file) => {
		const filteredItems = values.images?.filter((_file) => _file !== file);
		setValue("images", filteredItems);
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card sx={{p: 3}}>
						<Stack spacing={3}>
							<RHFTextField name="name" label="Product Name" />

							<div>
								<LabelStyle>Image Title</LabelStyle>
								<RHFUploadSingleFile
									name="imageTitle"
									accept={IMAGE_ONLY}
									maxSize={3145728}
									onDrop={handleTitleDrop}
								/>
							</div>

							<div>
								<LabelStyle>Description</LabelStyle>
								<RHFEditor simple name="description" />
							</div>

							<div>
								<LabelStyle>Additional Information</LabelStyle>
								<RHFEditor simple name="additionalInfo" />
							</div>

							{/* <RHFTextField name="description" label="Description" multiline rows={4} /> */}

							<div>
								<LabelStyle>Main Image</LabelStyle>
								<RHFUploadSingleFile
									name="mainImage"
									accept={IMAGE_ONLY}
									maxSize={3145728}
									onDrop={handleMainImageDrop}
								/>
							</div>

							<div>
								<LabelStyle>Images</LabelStyle>
								<RHFUploadMultiFile
									name="images"
									showPreview
									accept={IMAGE_ONLY}
									maxSize={3145728}
									onDrop={handleDrop}
									onRemove={handleRemove}
									onRemoveAll={handleRemoveAll}
								/>
							</div>
						</Stack>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Stack spacing={3}>
						<Card sx={{p: 3}}>
							<RHFSwitch name="inStock" label="In stock" />

							<Stack spacing={3} mt={2}>
								<RHFTextField name="sku" label="Product SKU" />
							</Stack>
						</Card>

						<Card sx={{p: 3}}>
							<Stack spacing={3} mb={2}>
								<RHFTextField
									name="price"
									label="Regular Price"
									placeholder="0.00"
									value={getValues("price") === 0 ? "" : getValues("price")}
									onChange={(event) => setValue("price", Number(event.target.value))}
									InputLabelProps={{shrink: true}}
									InputProps={{
										startAdornment: <InputAdornment position="start">₹</InputAdornment>,
										type: "number",
									}}
								/>

								<RHFTextField
									name="priceSale"
									label="Sale Price"
									placeholder="0.00"
									value={getValues("priceSale") === 0 ? "" : getValues("priceSale")}
									onChange={(event) => setValue("price", Number(event.target.value))}
									InputLabelProps={{shrink: true}}
									InputProps={{
										startAdornment: <InputAdornment position="start">₹</InputAdornment>,
										type: "number",
									}}
								/>
							</Stack>

							<RHFSwitch name="taxes" label="Price includes taxes" />
						</Card>

						<LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
							{!isEdit ? "Create Product" : "Save Changes"}
						</LoadingButton>
					</Stack>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
