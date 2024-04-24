import React from 'react';
import PropTypes from 'prop-types';
// mui
import {Stack, Typography} from '@mui/material';
//utils
import {fCurrency} from 'src/utils/formatNumber';
//components
import Image from 'src/components/Image';

export const OrderProductView = ({product, quantity}) => {
	return (
		<Stack
			spacing={2}
			direction={{xs: 'column', sm: 'row'}}
			alignItems='center'
			justifyContent='space-between'
			sx={{p: 3, bgcolor: 'background.neutral'}}
		>
			<Stack direction={'row'} alignItems='center'>
				<Image
					alt='product image'
					src={product?.imageKey}
					sx={{width: 64, height: 64, borderRadius: 1.5, mr: 2}}
				/>
				<Stack>
					<Typography noWrap variant='subtitle2' sx={{maxWidth: 240, fontSize: '1.2rem'}}>
						{product?.name}
					</Typography>
					<Typography variant='caption'>Quantity: {quantity}</Typography>
				</Stack>
			</Stack>

			<Stack>
				<Typography noWrap variant='subtitle2' sx={{maxWidth: 240, fontSize: '1.2rem'}}>
					&#8377;{fCurrency(product?.price)}
				</Typography>
			</Stack>
		</Stack>
	);
};

OrderProductView.propTypes = {
	product: PropTypes.object,
	quantity: PropTypes.number,
};
