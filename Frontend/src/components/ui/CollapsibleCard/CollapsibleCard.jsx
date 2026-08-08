import { useState } from "react";
import "./CollapsibleCard.css";

function CollapsibleCard({
    title,
    description,
    icon,
    children,
    defaultOpen = true
}) {

    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        
        <section className={`collapsible-card ${isOpen ? "open" : "closed"}`}>
         

            {/* HEADER */}

            <button
                className="collapsible-header"
                onClick={() => setIsOpen(!isOpen)}
            >

                <div className="collapsible-title">

                    {icon && (
                        <div className="collapsible-icon">
                            {icon}
                        </div>
                    )}

                    <div>
                        <h2>{title}</h2>

                        {description && (
                            <p>{description}</p>
                        )}
                    </div>

                </div>


                <span className="collapse-arrow">
                    {isOpen ? "⌃" : "⌄"}
                </span>

            </button>


            {/* CONTENIDO */}

            <div className="collapsible-content">

                <div className="collapsible-content-inner">
                    {children}
                </div>

            </div>

        </section>
    );
}

export default CollapsibleCard;