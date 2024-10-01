import PanelCard from "@/components/PanelCard/PanelCard";
import { newsFetch } from "@/dataFetching/newsFetch";
import Link from "next/link";
import Badge from "@/components/Badge/Badge";

export default async function NewsSlot() {
    const newsFetched = await newsFetch();
    const newsLength = newsFetched.length;
    return(
        <PanelCard props={{title: "News"}}>
            <h3>News count: <Badge title={newsLength} /></h3>
                <Link href="/dashboard/add_new">add new</Link>
        </PanelCard>
    )
}