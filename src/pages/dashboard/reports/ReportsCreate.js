// @mui
import {Container} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import UploadReportForm from 'src/sections/@dashboard/reports/UploadReportForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
	const {themeStretch} = useSettings();

	return (
		<Page title='Reports: Upload Reports'>
			<Container maxWidth={themeStretch ? false : 'lg'}>
				<HeaderBreadcrumbs
					heading={'Upload Reports'}
					links={[
						{name: 'Dashboard', href: PATH_DASHBOARD.root},
						{name: 'Report', href: PATH_DASHBOARD.report.root},
						{name: 'Upload'},
					]}
				/>

				<UploadReportForm />
			</Container>
		</Page>
	);
}
