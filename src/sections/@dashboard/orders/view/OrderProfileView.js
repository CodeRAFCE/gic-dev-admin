import React from 'react';
import PropTypes from 'prop-types';

// MUI
import {Divider, Stack, Typography} from '@mui/material';
// Hooks
import useResponsive from 'src/hooks/useResponsive';
// utils
import {fgetDate} from 'src/utils/formatTime';
import {getAge} from 'src/utils/calculateAge';

OrderProfileView.propTypes = {
	person: PropTypes.object,
	address: PropTypes.object,
};

export default function OrderProfileView({address, person}) {
	const upMd = useResponsive('up', 'md');

	return (
		<Stack
			spacing={{xs: 2, md: 5}}
			direction={{xs: 'column', md: 'row'}}
			divider={
				<Divider
					flexItem
					orientation={upMd ? 'vertical' : 'horizontal'}
					sx={{borderStyle: 'dashed'}}
				/>
			}
			sx={{p: 3}}
		>
			<Stack sx={{width: 1}}>
				<Typography variant='h6' sx={{color: 'text.disabled', mb: 1}}>
					PERSON DETAILS
				</Typography>

				<PersonInfo
					name={`${person?.firstName} ${person?.lastName}`}
					dob={fgetDate(person?.dob)}
					age={getAge(person?.dob)}
					gender={person?.gender}
					height={person?.height}
					weight={person?.weight}
				/>
			</Stack>

			<Stack sx={{width: 1}}>
				<Typography variant='h6' sx={{color: 'text.disabled', mb: 1}}>
					ADDRESS DETAILS
				</Typography>

				<AddressInfo
					name={address?.alias}
					address={`${address?.line1} ${address?.line2}, ${address?.state}, ${address?.city} ${address?.pincode} `}
					phone={address?.phone}
				/>
			</Stack>
		</Stack>
	);
}

AddressInfo.propTypes = {
	address: PropTypes.string,
	name: PropTypes.string,
	phone: PropTypes.number,
};

PersonInfo.propTypes = {
	name: PropTypes.string,
	gender: PropTypes.string,
	age: PropTypes.number,
	dob: PropTypes.string,
	weight: PropTypes.number,
	height: PropTypes.number,
};

function AddressInfo({name, address, phone}) {
	return (
		<>
			<Typography variant='subtitle2' sx={{textTransform: 'capitalize'}}>
				{name}
			</Typography>
			<Typography variant='body2' sx={{mt: 1, mb: 0.5}}>
				{address}
			</Typography>
			<Typography variant='body2'>Phone: {phone}</Typography>
		</>
	);
}

function PersonInfo({name, gender, age, dob, weight, height}) {
	return (
		<Stack spacing={{xs: 2, md: 5}} direction={{xs: 'column', md: 'row'}}>
			<Stack sx={{width: 1}}>
				<Typography variant='subtitle2' sx={{textTransform: 'capitalize'}}>
					{name}
				</Typography>
				<Typography variant='caption'>
					{gender}, {age} years
				</Typography>
			</Stack>
			<Stack sx={{width: 1}}>
				<Typography variant='subtitle2'>{dob}</Typography>
				<Typography variant='caption'>
					{weight} kg, {height} cm
				</Typography>
			</Stack>
		</Stack>
	);
}
