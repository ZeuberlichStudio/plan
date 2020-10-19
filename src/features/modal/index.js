import React, { Children } from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

import './modal.scss';

export default function Modal({ borderColor, children, headerContent }) {

    const history = useHistory();

    React.useEffect(() => {
        document.getElementById('root').ariaHidden = 'true';
    }, []);

    function close() {
        document.getElementById('root').ariaHidden = 'false';
        history.goBack();
    }

    return createPortal(
        <div id="new-modal" style={{ "--borderColor": borderColor }}>
            <div className="new-modal-content">
                <div className={ `new-modal-header ${ headerContent ? 'has-content' : '' }` }>
                    { headerContent }
                    <button id="new-modal-close" onClick={ close }/>
                </div>
                { children }
            </div>
        </div>,
        document.body
    );
}