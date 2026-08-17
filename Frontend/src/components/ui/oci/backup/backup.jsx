import "./backup.css";
import { backupOCI } from "../../../../services/backup.js";
import Modal from "../../Modal/modal.jsx";
import { useState } from "react";

function Backup() {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const createBackup = async () => {
        setModalOpen(true);
        setLoading(true);
        setResult("");

        try {
            const response = await backupOCI();

            console.log("Respuesta backup:", response);

            setResult(
                `Backup iniciado correctamente. Estado: ${
                    response.backup?.status || "REQUEST_RECEIVED"
                }`
            );

        } catch (error) {
            console.error("Error creando backup:", error);

            setResult(
                "No se pudo iniciar la copia de seguridad."
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
                onClick={createBackup}
                disabled={loading}
            >
                Crear copia de seguridad
            </button>

            <Modal
                isOpen={modalOpen}
                title="Copia de seguridad"
                onClose={handleCloseModal}
            >
                {loading ? (
                    <p>Creando copia de seguridad...</p>
                ) : (
                    <p>{result}</p>
                )}
            </Modal>
        </>
    );
}

export default Backup;