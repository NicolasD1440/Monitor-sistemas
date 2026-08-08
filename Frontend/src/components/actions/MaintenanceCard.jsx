import { useState } from "react";
import { getSpaceDisk } from "../../services/space_disk.js";
import { getFilesToClean} from "../../services/cleanFiles.js"
import { cleanFiles } from "../../services/cleanFiles.js";
import { getProcesses } from "../../services/processes.js";
import "./MaintenanceCard.css";

function MaintenanceCard() {

    const [modalOpen, setModalOpen] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const [filesToClean, setFilesToClean] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [modalType, setModalType] = useState("");

    const handleSpaceDisk = async () => {
        setModalOpen(true);
        setLoading(true);
        setModalType("space");
        setResult("Comprobando espacio...");

        try {
            const data = await getSpaceDisk();

            setResult(data);
        } catch (error) {
            console.error(error);

            setResult(
                "Error al obtener la información del servidor."
            );
        } finally {
            setLoading(false);
        }
    };
const handleCleanFiles = async () => {
    setModalOpen(true);
    setLoading(true);
    setModalType("clean");
    setFilesToClean([]);

    setResult("Comprobando archivos temporales...");

    try {
        const data = await getFilesToClean();

        const files = data.files;

        // IMPORTANTE
        setFilesToClean(files);

        if (files.length === 0) {
            setResult(
                "✓ No hay archivos temporales con más de 30 días para limpiar."
            );
            return;
        }

        const fileList = files
            .map(
                file => `${file.name} - ${file.age_days} días`
            )
            .join("\n");

        setResult(
            `Se encontraron ${files.length} archivos:\n\n` +
            fileList
        );

    } catch (error) {

        console.error(
            "ERROR COMPROBANDO ARCHIVOS:",
            error
        );

        setResult(
            error.response?.data?.error ||
            error.message ||
            "Error al comprobar los archivos."
        );

    } finally {
        setLoading(false);
    }
};
const handleConfirmCleanFiles = async () => {
    setLoading(true);
    setResult("Eliminando archivos temporales...");

    try {
        const data = await cleanFiles();

        const deletedCount = data.deleted.length;
        const errorCount = data.errors.length;

        if (deletedCount === 0) {
            setResult(
                "No se pudo eliminar ningún archivo."
            );
            return;
        }

        const deletedList = data.deleted
            .map(
                file => `${file.name} - ${file.age_days} días`
            )
            .join("\n");

        setResult(
            `✓ Limpieza completada.\n\n` +
            `Archivos eliminados: ${deletedCount}\n\n` +
            deletedList +
            `\n\nErrores: ${errorCount}`
        );

        // Ya no hay archivos pendientes de borrar
        setFilesToClean([]);

    } catch (error) {

        console.error(
            "ERROR ELIMINANDO ARCHIVOS:",
            error
        );

        setResult(
            error.response?.data?.error ||
            error.message ||
            "Error al eliminar los archivos."
        );

    } finally {
        setLoading(false);
    }
};
const handleProcesses = async () => {

    setModalOpen(true);
    setLoading(true);
    setModalType("processes");

    setResult("Obteniendo procesos...");

    try {

        const data = await getProcesses();

        console.log("PROCESOS RECIBIDOS:", data);

        setProcesses(data.processes);

    } catch (error) {

        console.error(
            "ERROR OBTENIENDO PROCESOS:",
            error
        );

        setResult(
            error.response?.data?.error ||
            error.message ||
            "Error al obtener los procesos."
        );

    } finally {

        setLoading(false);

    }
};
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>

            {/* Card de mantenimiento */}

            <div className="maintenance-card">

                <div className="maintenance-header">
                    <h2>Mantenimiento</h2>
                    <p>Herramientas del servidor</p>
                </div>

                <div className="maintenance-buttons">

                    <button
                        className="maintenance-button"
                        onClick={handleSpaceDisk}
                    >
                        Comprobar espacio
                    </button>

                    <button
                        className="maintenance-button"
                        onClick={handleCleanFiles}
                    >
                        Limpiar archivos
                    </button>

                    <button
                        className="maintenance-button"
                        onClick={handleProcesses}
                    >
                        Ver procesos
                    </button>

                </div>

            </div>


            {/* Modal */}

            {modalOpen && (

                <div className="command-modal-overlay">

                    <div className="command-modal">

                        <div className="command-modal-header">

                            <h2>Comprobar espacio</h2>

                            <button
                                className="modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                        </div>


                        <div className="command-modal-body">

                        {loading ? (

                            <p className="loading">
                                Comprobando...
                            </p>

                        ) : modalType === "processes" ? (

                            <table className="process-table">

                                <thead>
                                    <tr>
                                        <th>PID</th>
                                        <th>Proceso</th>
                                        <th>CPU</th>
                                        <th>RAM</th>
                                        <th>Usuario</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {processes.map((process) => (
                                        <tr key={process.pid}>
                                            <td>{process.pid}</td>
                                            <td>{process.name}</td>
                                            <td>{process.cpu_percent}%</td>
                                            <td>{process.memory_percent}%</td>
                                            <td>{process.username}</td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        ) : (

                            <pre>{result}</pre>

                        )}

                    </div>


                        <div className="command-modal-footer">

                            <button
                                className="modal-button"
                                onClick={closeModal}
                            >
                                Cerrar
                            </button>
                              {filesToClean.length > 0 && (
                                <button className="modal-button" 
                                onClick={handleConfirmCleanFiles}>
                                    Eliminar archivos
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default MaintenanceCard;