import Image from "next/image";
import styles from "./headerPage.module.css";

export default function HeaderPage({props}:{props:{title: string, image?: string}}) {
    return(
        <div className={styles.header}>
            {props.image&&(
            <Image src={props.image} alt="news" width={50} height={50} />
            )}
            <h1>{props.title}</h1>
        </div>
    )
}