import CollapsibleCard from "../../components/ui/CollapsibleCard/CollapsibleCard";
import Update from "../../components/ui/server/update/update.jsx"
import Reboot from "../../components/ui/server/reboot/reboot.jsx";
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

            

        </div>
    );
}

export default Processes;