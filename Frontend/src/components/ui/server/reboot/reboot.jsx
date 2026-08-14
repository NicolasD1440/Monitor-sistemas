import "./reboot.css";
import { rebootSystem } from "../../../../services/reboot.js";
import Modal from "../../Modal/modal.jsx";
import { useState } from "react";

function Reboot() {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleReboot = async () => {
        setModalOpen(true);
        setLoading(true);
        setResult("");

        try {
            const data = await rebootSystem();

            if (!data.success) {
                setResult(
                    data.message ||
                    "No se pudo reiniciar el sistema."
                );
                return;
            }

            setResult(
                data.message ||
                "El servidor se está reiniciando."
            );

        } catch (error) {
            console.error("ERROR REINICIANDO:", error);

            setResult(
                error.response?.data?.error ||
                error.message ||
                "Error durante el reinicio."
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
                onClick={handleReboot}
                disabled={loading}
            >
                Reiniciar sistema
            </button>

            <Modal
                isOpen={modalOpen}
                title="Reiniciar el sistema"
                onClose={handleCloseModal}
            >
                {loading ? (
                    <p>Reiniciando el servidor...</p>
                ) : (
                    <p>{result}</p>
                )}
            </Modal>
        </>
    );
}

export default Reboot;