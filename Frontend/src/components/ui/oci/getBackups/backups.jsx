import { getBackups } from "../../../../services/backup.js";
import Modal from "../../Modal/modal.jsx";
import { useState } from "react";

function Backups() {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [backups, setBackups] = useState([]);
    const [error, setError] = useState("");

    const showBackups = async () => {
        setModalOpen(true);
        setLoading(true);
        setBackups([]);
        setError("");

        try {
            const response = await getBackups();

            console.log("Copias de seguridad:", response);

            setBackups(response.backups || []);

        } catch (error) {
            console.error("Error obteniendo backups:", error);

            setError(
                "No se pudieron obtener las copias de seguridad."
            );
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
                onClick={showBackups}
                disabled={loading}
            >
                Ver copias de seguridad
            </button>

            <Modal
                isOpen={modalOpen}
                title="Copias de seguridad"
                onClose={handleCloseModal}
            >
                {loading ? (
                    <p>Cargando copias de seguridad...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : backups.length === 0 ? (
                    <p>No hay copias de seguridad.</p>
                ) : (
                    <div className="backup-list">
                        {backups.map((backup) => (
                            <div
                                className="backup-item"
                                key={backup.id}
                            >
                                <p>
                                    <strong>{backup.name}</strong>
                                </p>

                                <p>
                                    Estado: {backup.status}
                                </p>

                                <p>
                                    Tamaño: {backup.size_gb} GB
                                </p>

                                <p>
                                    Fecha: {backup.time_created}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </>
    );
}

export default Backups;