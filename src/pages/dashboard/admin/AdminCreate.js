import {useParams, useLocation} from 'react-router-dom';

// REDUX
import {useDispatch, useSelector} from 'src/redux/store';
import {getAdminById} from 'src/redux/slices/admin/adminSlice';

// @mui
import {Container} from '@mui/material';

// routes
import {PATH_DASHBOARD} from '../../../routes/paths';

// hooks
import useSettings from '../../../hooks/useSettings';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// sections
import AdminNewEditForm from '../../../sections/@dashboard/admin/AdminNewEditForm';
import {useEffect} from 'react';

// ----------------------------------------------------------------------

export default function AdminCreate() {
	const {themeStretch} = useSettings();
	const {pathname} = useLocation();
	const {adminId} = useParams();

	const {currentAdmin} = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const isEdit = pathname.includes('edit');

	useEffect(() => {
		if (isEdit) {
			dispatch(getAdminById({id: adminId}));
		}
		return;
	}, [adminId, dispatch, isEdit]);

	return (
		<Page title='User: Create a new admin'>
			<Container maxWidth={themeStretch ? false : 'lg'}>
				<HeaderBreadcrumbs
					heading={!isEdit ? 'Create a new admin' : 'Edit admin'}
					links={[
						{name: 'Dashboard', href: PATH_DASHBOARD.root},
						{name: 'Admin', href: PATH_DASHBOARD.admin.list},
						{name: !isEdit ? 'New admin' : adminId},
					]}
				/>
				<AdminNewEditForm isEdit={isEdit} currentAdmin={currentAdmin} />
			</Container>
		</Page>
	);
}
