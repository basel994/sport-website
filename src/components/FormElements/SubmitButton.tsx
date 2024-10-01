import styles from "./elements.module.css";

export default function SubmitButton({title}: {title: string}) {
    return(
            <button className={styles.submit}>{title}</button>
    )
}