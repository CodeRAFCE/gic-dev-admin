import PropTypes from 'prop-types';
import {Stack, InputAdornment, TextField} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

AdminTableToolbar.propTypes = {
	filterName: PropTypes.string,
	filterRole: PropTypes.string,
	onFilterName: PropTypes.func,
	onFilterRole: PropTypes.func,
};

export default function AdminTableToolbar({filterName, filterEmail, onFilterName, onFilterEmail}) {
	return (
		<Stack spacing={2} direction={{xs: 'column', sm: 'row'}} sx={{py: 2.5, px: 3}}>
			<TextField
				value={filterName}
				onChange={(event) => onFilterName(event.target.value)}
				placeholder='Search user...'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Iconify
								icon={'eva:search-fill'}
								sx={{color: 'text.disabled', width: 20, height: 20}}
							/>
						</InputAdornment>
					),
				}}
			/>
		</Stack>
	);
}
