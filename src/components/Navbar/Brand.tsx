import styles from "./navbar.module.css";
import Image from "next/image";

export default function Brand() {
    return(
        <div className={styles.brand}>
            <Image src="/images/navbar/logo.ico" alt="logo" width={75} height={75} />
            <p>KOOORA</p>
        </div>
    )
}