import classNames from 'classnames';

import { CommonProps } from '../common-props';
import Game from '../ui/game';

import './app-body.scss';

function AppBody({ className, ...restProps }: CommonProps) {
    const cssClasses = classNames('app-body', className);

    return (
        <div className={cssClasses} {...restProps}>
            <Game />
        </div>
    );
}

export default AppBody;
