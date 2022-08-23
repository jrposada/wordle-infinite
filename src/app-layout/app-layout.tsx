import AppBody from './app-body';
import AppFooter from './app-footer';
import AppHeader from './app-header';

import './app-layout.scss';

function AppLayout() {
    return (
        <div className="app-layout">
            <AppHeader className="app-layout__header" />
            <AppBody className="app-layout__body" />
            <AppFooter className="app-layout__footer" />
        </div>
    );
}

export default AppLayout;
