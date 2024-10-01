import styles from "./badge.module.css";
export default function Badge({title}:{title:string|number}) {
    return(
        <span className={styles.badge}>{title}</span>
    )
}