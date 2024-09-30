import Image from "next/image";
import styles from "./new.module.css";
import { dateForm } from "@/functions/dateForm";
export default function New({props}:{props: {image?: string, created_at: Date, title: string, content: string}}) {
    const dateStyle = dateForm(props.created_at);
    const imageSrc = props.image?props.image:"/images/home/new/new.png";

    return(
        <div className={styles.container}>
            <div className={styles.photo}>
                <Image src={imageSrc} alt="new" width={100} height={100} />
            </div>
            <div className={styles.details}>
                <div className={styles.date}>
                    <Image src="/images/home/new/date.ico" alt="date" width={30} height={30} />
                    <p>{dateStyle}</p>
                </div>
                <h3>{props.title}</h3>
                <p>{props.content}</p>
            </div>
        </div>
    )
}