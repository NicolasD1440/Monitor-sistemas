import "./backup.css";
import {
    getContainers,
    restartAllContainers,
    restartContainer
} from "../../../../services/backup.js";

import Modal from "../../Modal/modal.jsx";
import { useState } from "react";

function Backup() {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [containers, setContainers] = useState([]);

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

            const response = await restartContainer(containerName);

            console.log("Contenedor reiniciado:", response);

            setResult(`El contenedor "${containerName}" fue reiniciado correctamente.`);

            // Volver a consultar el estado
            const updatedContainers = await getContainers();
            setContainers(updatedContainers);

        } catch (error) {
            console.error("Error reiniciando contenedor:", error);

            setResult(`No se pudo reiniciar "${containerName}".`);
        } finally {
            setLoading(false);
        }
    };

    const handleRestartAll = async () => {
        try {
            setLoading(true);
            setResult("");

            const response = await restartAllContainers();

            console.log("Contenedores reiniciados:", response);

            setResult("Todos los contenedores fueron reiniciados correctamente.");

            // Actualizar la lista
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
        if (loading) {
            return;
        }

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
                {loading ? (
                    <p>Procesando...</p>
                ) : (
                    <>
                        {result && (
                            <p>{result}</p>
                        )}

                        {containers.length > 0 && (
                            <>
                                <button
                                    onClick={handleRestartAll}
                                    disabled={loading}
                                >
                                    Reiniciar todos
                                </button>

                                {containers.map((container) => (
                                    <div key={container.id}>
                                        <p>
                                            <strong>{container.name}</strong>
                                        </p>

                                        <p>
                                            Imagen: {container.image}
                                        </p>

                                        <p>
                                            Estado: {container.status}
                                        </p>

                                        <button
                                            onClick={() =>
                                                handleRestartContainer(
                                                    container.name
                                                )
                                            }
                                            disabled={loading}
                                        >
                                            Reiniciar
                                        </button>

                                        <hr />
                                    </div>
                                ))}
                            </>
                        )}

                        {!result && containers.length === 0 && (
                            <p>No hay contenedores disponibles.</p>
                        )}
                    </>
                )}
            </Modal>
        </>
    );
}

export default Backup;