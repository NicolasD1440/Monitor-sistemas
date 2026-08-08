import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getDiskUsage } from "../../services/disk";

function DiskGauge() {
    const [disk, setDisk] = useState(0);

    useEffect(() => {
        const loadDisk = async () => {
            const data = await getDiskUsage();
            setDisk(data.disk);
        };

        loadDisk();
    }, []);

    const options = {
        chart: {
            type: "radialBar"
        },

        labels: ["DISK"]
    };

    const series = [disk];

    return (
        <Chart
            options={options}
            series={series}
            type="radialBar"
            width={350}
        />
    );
}

export default DiskGauge;