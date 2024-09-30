import Link from "next/link";
import styles from "./../dashboard.module.css";
import { newsFetch } from "@/dataFetching/newsFetch"

export default async function NewsSlot() {
    const newsFetched = await newsFetch();
    const newsLength = newsFetched.length;
    return(
        <div className={styles.newsContainer}>
            <h1>News count: {newsLength}</h1>
            <div>
                <Link href="/dasboard/add_new">add new</Link>
            </div>
        </div>
    )
}