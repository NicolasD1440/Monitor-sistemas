import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getRamUsage } from "../../services/ram";

function RamGauge() {
    const [ram, setRam] = useState(0);

    useEffect(() => {
        const loadRam = async () => {
            const data = await getRamUsage();
            setRam(data.ram);
        };

        loadRam();
        const interval = setInterval(loadRam, 2000);
        return () => clearInterval(interval);
    }, []);

    const options = {
        chart: {
            type: "radialBar"
        },

        labels: ["RAM"]
    };

    const series = [ram];

    return (
        <Chart
            options={options}
            series={series}
            type="radialBar"
            width={350}
        />
    );
}

export default RamGauge;