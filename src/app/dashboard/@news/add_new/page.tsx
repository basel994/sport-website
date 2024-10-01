import PanelCard from "@/components/PanelCard/PanelCard";
import styles from "./../../dashboard.module.css";
import NewForm from "@/clientComponents/NewForm/NewForm";
export default function AddNew() {
    return(
        <PanelCard props={{title: "News"}}>
            <NewForm />
        </PanelCard>
    )
}