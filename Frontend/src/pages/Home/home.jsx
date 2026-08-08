import Stats from "../../components/stats/Stats.jsx";
import MaintenanceCard from "../../components/actions/MaintenanceCard.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
function Home() {

    return (
        <>
            <Sidebar />

            <Stats />

            <MaintenanceCard />
        </>
    );
}

export default Home;