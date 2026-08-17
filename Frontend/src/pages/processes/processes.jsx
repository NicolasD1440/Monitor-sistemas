import CollapsibleCard from "../../components/ui/CollapsibleCard/CollapsibleCard";
import Update from "../../components/ui/server/update/update.jsx";
import Reboot from "../../components/ui/server/reboot/reboot.jsx";
import Backup from "../../components/ui/oci/backup/backup.jsx";
import Backups from "../../components/ui/oci/getBackups/backups.jsx";
import Docker from "../../components/ui/Docker/docker.jsx";

import {
    Server,
    Cloud,
    Container
} from "lucide-react";

import "./processes.css";

function Processes() {

    return (
        <div className="page">

            <CollapsibleCard
                title="Servidor"
                description="Acciones sobre el servidor"
                icon={<Server size={22} strokeWidth={1.8} />}
            >
                <Update />
                <Reboot />
            </CollapsibleCard>

            <CollapsibleCard
                title="OCI (Oracle Cloud Infrastructure)"
                description="Acciones sobre OCI"
                icon={<Cloud size={22} strokeWidth={1.8} />}
            >
                <Backup />
                <Backups />
            </CollapsibleCard>

            <CollapsibleCard
                title="Docker"
                description="Acciones sobre Docker"
                icon={<Container size={22} strokeWidth={1.8} />}
            >
                <Docker />
            </CollapsibleCard>

        </div>
    );
}

export default Processes;