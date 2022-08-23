import classNames from 'classnames';

import { CommonProps } from '../common-props';

import './app-footer.scss';

function AppFooter({ className, ...restProps }: CommonProps) {
    const cssClasses = classNames('app-footer', className);

    return (
        <div className={cssClasses} {...restProps}>
            <div className="app-footer__author">
                By{' '}
                <a href="https://github.com/jrposada">
                    Javier Rodríguez Posada
                </a>
            </div>
            <div className="app-footer__version">
                Version: {process.env.REACT_APP_VERSION}
            </div>
        </div>
    );
}

export default AppFooter;
