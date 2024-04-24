import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider as ReduxProvider} from 'react-redux';

// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// editor
import 'react-quill/dist/quill.snow.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// @mui
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

// redux
import {store} from './redux/store';

// contexts
import {AuthProvider} from './contexts/NodeAuthContext';
import {SettingsProvider} from './contexts/SettingsContext';
import {CollapseDrawerProvider} from './contexts/CollapseDrawerContext';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvider>
		<HelmetProvider>
			<ReduxProvider store={store}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<SettingsProvider>
						<CollapseDrawerProvider>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</CollapseDrawerProvider>
					</SettingsProvider>
				</LocalizationProvider>
			</ReduxProvider>
		</HelmetProvider>
	</AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
