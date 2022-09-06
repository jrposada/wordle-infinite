import classNames from 'classnames';
import { CommonProps } from '../common-props';

import './app-header.scss';

function AppHeader({ className, ...restProps }: CommonProps) {
    const cssClasses = classNames('app-header', className);

    return (
        <div className={cssClasses} {...restProps}>
            <div>WORDLE Infinite</div>
        </div>
    );
}

export default AppHeader;
