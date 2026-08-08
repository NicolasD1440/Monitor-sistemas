import { useState } from "react";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

    const [active, setActive] = useState("home");
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
        {
            id: "home",
            label: "Inicio",
            path: "/",
            icon: (
                <svg viewBox="0 0 24 24">
                    <path d="M3 11.5L12 4l9 7.5" />
                    <path d="M5 10v10h14V10" />
                    <path d="M9 20v-6h6v6" />
                </svg>
            )
        },
        {
            id: "maintenance",
            label: "Mantenimiento",
            path: "/processes",
            icon: (
                <svg viewBox="0 0 24 24">
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                    <circle cx="8" cy="7" r="2" />
                    <circle cx="15" cy="12" r="2" />
                    <circle cx="10" cy="17" r="2" />
                </svg>
            )
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-menu">

                {menuItems.map((item) => (

                <button
                    key={item.id}
                    className={`sidebar-item ${
                        location.pathname === item.path ? "active" : ""
                    }`}
                    onClick={() => navigate(item.path)}
                    title={item.label}
                >
                    {item.icon}
                </button>

            ))}

            </div>

        </aside>
    );
}

export default Sidebar;