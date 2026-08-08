import { useState } from "react";

import {
    checkUpdates,
    updateSystem
} from "../../../services/updates";

import Modal from "../Modal/modal.jsx";

function Update() {

    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [updatesAvailable, setUpdatesAvailable] = useState(false);


    // COMPROBAR ACTUALIZACIONES

    const handleCheckUpdates = async () => {

        setModalOpen(true);
        setLoading(true);
        setUpdatesAvailable(false);

        setResult("Comprobando actualizaciones...");

        try {

            const data = await checkUpdates();

            if (!data.success) {

                setResult(
                    data.message ||
                    "No se pudieron comprobar las actualizaciones."
                );

                return;
            }


            // NO HAY ACTUALIZACIONES

            if (!data.updates_available) {

                setResult(
                    "✓ El sistema está actualizado.\n\n" +
                    "No hay actualizaciones disponibles."
                );

                setUpdatesAvailable(false);

                return;
            }


            // HAY ACTUALIZACIONES

            setUpdatesAvailable(true);

            setResult(
                "⚠ Hay actualizaciones disponibles.\n\n" +
                data.updates
            );

        } catch (error) {

            console.error(
                "ERROR COMPROBANDO ACTUALIZACIONES:",
                error
            );

            setResult(
                error.response?.data?.error ||
                error.message ||
                "Error al comprobar las actualizaciones."
            );

        } finally {

            setLoading(false);

        }
    };


    // ACTUALIZAR SISTEMA

    const handleUpdateSystem = async () => {

        setLoading(true);

        setResult(
            "Actualizando el sistema...\n\n" +
            "Esto puede tardar unos minutos."
        );

        try {

            const data = await updateSystem();

            if (!data.success) {

                setResult(
                    data.message ||
                    "No se pudo actualizar el sistema."
                );

                return;
            }

            setUpdatesAvailable(false);

            setResult(
                "✓ Sistema actualizado correctamente."
            );

        } catch (error) {

            console.error(
                "ERROR ACTUALIZANDO:",
                error
            );

            setResult(
                error.response?.data?.error ||
                error.message ||
                "Error durante la actualización."
            );

        } finally {

            setLoading(false);

        }
    };


    // CERRAR MODAL

    const handleCloseModal = () => {

        if (loading) {
            return;
        }

        setModalOpen(false);

    };


    return (

        <>

            {/* BOTÓN */}

            <button
                onClick={handleCheckUpdates}
                disabled={loading}
            >
                Actualizar sistema
            </button>


            {/* MODAL */}

            <Modal
                isOpen={modalOpen}
                title="Actualizaciones del sistema"
                onClose={handleCloseModal}

                footer={

                    <>

                        <button
                            className="modal-button"
                            onClick={handleCloseModal}
                            disabled={loading}
                        >
                            Cerrar
                        </button>


                        {updatesAvailable && !loading && (

                            <button
                                className="modal-button primary"
                                onClick={handleUpdateSystem}
                            >
                                Actualizar
                            </button>

                        )}

                    </>

                }
            >

                {loading ? (

                    <p>
                        {result}
                    </p>

                ) : (

                    <pre>
                        {result}
                    </pre>

                )}

            </Modal>

        </>

    );
}

export default Update;