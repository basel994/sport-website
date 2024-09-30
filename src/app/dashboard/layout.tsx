import styles from "./dashboard.module.css";
export default function DashboardLayout({
    children,
    news,
}:{
    children: React.ReactNode;
    news: React.ReactNode;
}) {
    return(
        <>
        {children}
        <div className={styles.dashboardContainer}>
            {news}
        </div>
        </>
    )
}