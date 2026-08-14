import CollapsibleCard from "../../components/ui/CollapsibleCard/CollapsibleCard";
import Update from "../../components/ui/update/update.jsx"


function Processes() {

    return (
        <div className="page">
         
            <CollapsibleCard
                title="Servidor"
                description="Acciones sobre el servidor"
                icon="📊"
            >

               <Update />
                

            </CollapsibleCard>

            

        </div>
    );
}

export default Processes;