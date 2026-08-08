import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getCpuUsage } from "../../services/cpu";

function CpuGauge() {
    const [cpu, setCpu] = useState(0);

    useEffect(() => {
        const loadCpu = async () => {
            const data = await getCpuUsage();
            setCpu(Number(data.cpu));
        };

        loadCpu();

        const interval = setInterval(loadCpu, 2000);

        return () => clearInterval(interval);
    }, []);

    const options = {
        chart: {
            type: "radialBar"
        },
        labels: ["CPU"]
    };

    return (
        <Chart
            options={options}
            series={[cpu]}
            type="radialBar"
            width={350}
        />
    );
}

export default CpuGauge;