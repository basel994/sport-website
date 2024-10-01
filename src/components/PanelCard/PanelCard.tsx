import styles from "./panelCard.module.css";

export default function PanelCard({
    children,
    props,
}: {
    children: React.ReactNode;
    props: {title: string,}
}) {
    return(
        <div className={styles.container}>
            <h1>{props.title}</h1>
            {children}
        </div>
    )
}