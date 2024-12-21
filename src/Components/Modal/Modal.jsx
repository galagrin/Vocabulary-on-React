import { ReactComponent as IconClose } from "./icon-close.svg";

import "./Modal.css";

export const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="modal active">
                    <div className="modal-wrapper">
                        <div className="modal-content">
                            <button
                                className="modal-closebtn"
                                onClick={() => onClose()}
                            >
                                <IconClose />
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
