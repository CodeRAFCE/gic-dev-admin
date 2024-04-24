import React from 'react';

//routes
import Router from './routes';

//theme
import ThemeProvider from './theme';

//components
import ScrollToTop from './components/ScrollToTop';
import ThemeColorPresets from './components/ThemeColorPresets';
import RtlLayout from './components/RtlLayout';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import NotistackProvider from './components/NotistackProvider';
import Settings from './components/settings';
import {ChartStyle} from './components/chart';
import {ProgressBarStyle} from './components/ProgressBar';

function App() {
	return (
		<ThemeProvider>
			<ThemeColorPresets>
				<RtlLayout>
					<NotistackProvider>
						<MotionLazyContainer>
							<ProgressBarStyle />
							<Settings />
							<ChartStyle />
							<ScrollToTop />
							<Router />
						</MotionLazyContainer>
					</NotistackProvider>
				</RtlLayout>
			</ThemeColorPresets>
		</ThemeProvider>
	);
}

export default App;
