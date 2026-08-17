import "./docker.css";
import {
    getContainers,
    restartAllContainers,
    restartContainer
} from "../../../services/docker.js";

import Modal from "../Modal/modal.jsx";
import { useState } from "react";

function Docker() {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [containers, setContainers] = useState([]);
    const [result, setResult] = useState("");

    const handleGetContainers = async () => {
        setModalOpen(true);
        setLoading(true);
        setResult("");

        try {
            const response = await getContainers();

            console.log("contenedores:", response);

            setContainers(response);
        } catch (error) {
            console.error("Error al traer la información:", error);
            setResult("No se pudo acceder a los contenedores.");
        } finally {
            setLoading(false);
        }
    };

    const handleRestartContainer = async (containerName) => {
        try {
            setLoading(true);
            setResult("");

            await restartContainer(containerName);

            setResult(
                `El contenedor "${containerName}" fue reiniciado correctamente.`
            );

            const updatedContainers = await getContainers();
            setContainers(updatedContainers);
        } catch (error) {
            console.error("Error reiniciando contenedor:", error);

            setResult(
                `No se pudo reiniciar el contenedor "${containerName}".`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRestartAll = async () => {
        try {
            setLoading(true);
            setResult("");

            await restartAllContainers();

            setResult(
                "Todos los contenedores fueron reiniciados correctamente."
            );

            const updatedContainers = await getContainers();
            setContainers(updatedContainers);
        } catch (error) {
            console.error("Error reiniciando contenedores:", error);

            setResult("No se pudieron reiniciar los contenedores.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        if (loading) return;

        setModalOpen(false);
    };

    return (
        <>
            <button
                className="update-system"
                onClick={handleGetContainers}
                disabled={loading}
            >
                Consultar contenedores Docker
            </button>

            <Modal
                isOpen={modalOpen}
                title="Contenedores Docker"
                onClose={handleCloseModal}
            >
                <div className="containers-panel">

                    {loading && containers.length === 0 ? (
                        <div className="containers-loading">
                            <div className="loading-spinner"></div>
                            <p>Consultando contenedores...</p>
                        </div>
                    ) : (
                        <>
                            {containers.length > 0 && (
                                <div className="containers-header">
                                    <div>
                                        <h3>Contenedores</h3>
                                        <span>
                                            {containers.length} contenedores encontrados
                                        </span>
                                    </div>

                                    <button
                                        className="restart-all-button"
                                        onClick={handleRestartAll}
                                        disabled={loading}
                                    >
                                        ↻ Reiniciar todos
                                    </button>
                                </div>
                            )}

                            {result && (
                                <div className="container-result">
                                    {result}
                                </div>
                            )}

                            <div className="containers-list">
                                {containers.map((container) => (
                                    <div
                                        className="container-card"
                                        key={container.id}
                                    >
                                        <div className="container-info">

                                            <div className="container-icon">
                                                🐳
                                            </div>

                                            <div className="container-details">
                                                <h4>
                                                    {container.name}
                                                </h4>

                                                <p>
                                                    {container.image}
                                                </p>

                                                <span
                                                    className={`container-status ${
                                                        container.status === "running"
                                                            ? "status-running"
                                                            : "status-stopped"
                                                    }`}
                                                >
                                                    <span className="status-dot"></span>

                                                    {container.status}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            className="restart-container-button"
                                            onClick={() =>
                                                handleRestartContainer(
                                                    container.name
                                                )
                                            }
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "..."
                                                : "↻ Reiniciar"}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {!result && containers.length === 0 && (
                                <div className="empty-containers">
                                    <span>🐳</span>
                                    <p>No hay contenedores disponibles.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default Docker;