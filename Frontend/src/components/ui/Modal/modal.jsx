import "./modal.css";

function Modal({
    isOpen,
    title,
    children,
    onClose,
    footer
}) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">

            <div className="modal">

                {/* HEADER */}

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* CONTENIDO */}

                <div className="modal-body">

                    {children}

                </div>


                {/* FOOTER */}

                {footer && (

                    <div className="modal-footer">
                        {footer}
                    </div>

                )}

            </div>

        </div>
    );
}

export default Modal;