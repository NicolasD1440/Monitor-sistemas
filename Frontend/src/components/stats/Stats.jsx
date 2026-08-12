import "./Stats.css";
import CpuGauge from "../hardware/cpu";
import RamGauge from "../hardware/ram";
import DiskGauge from "../hardware/disk";

function Stats() {
    return (
        <div className="main-container-stats">

            <div className="card">
                <h2 className="card-title">CPU</h2>

                <div className="card-content">
                    <CpuGauge />
                </div>

                <p className="card-description">
                    Uso actual del procesador.
                </p>
            </div>

            <div className="card">
                <h2 className="card-title">RAM</h2>

                <div className="card-content">
                    <RamGauge />
                </div>

                <p className="card-description">
                    Memoria utilizada.
                </p>
            </div>

            <div className="card">
                <h2 className="card-title">Disco</h2>

                <div className="card-content">
                    <DiskGauge />
                </div>

                <p className="card-description">
                    Espacio disponible.
                </p>
            </div>

        </div>
    );
}

export default Stats;