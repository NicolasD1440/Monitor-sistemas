import CollapsibleCard from "../../components/ui/CollapsibleCard/CollapsibleCard";
import Update from "../../components/ui/server/update/update.jsx"
import Reboot from "../../components/ui/server/reboot/reboot.jsx";
import Backup from "../../components/ui/oci/backup/backup.jsx"
import Backups from "../../components/ui/oci/getBackups/backups.jsx";
import "./processes.css"


function Processes() {

    return (
        <div className="page">
         
            <CollapsibleCard
                title="Servidor"
                description="Acciones sobre el servidor"
                icon="📊"
            >
               <Update />
               <Reboot />  
            </CollapsibleCard>
            <CollapsibleCard
            title="OCI (Oracle Cloud Infrastructure)"
            description="acciones sobre OCI"
            icon="📊"
            >
             <Backup />
             <Backups />
            </CollapsibleCard>
            <CollapsibleCard
            title="Docker"
            description="acciones sobre Docker"
            icon="📊"
            >
            
            </CollapsibleCard>
            

        </div>
    );
}

export default Processes;