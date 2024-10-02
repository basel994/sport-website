import styles from "./spinner.module.css";

export default function Spinner({size = 40, color = "black"}: {size?: number, color?: string}) {
    return <div style={{width:`${size}px`, 
    height: `${size}px`, 
    border: `0.2rem solid ${color}`,
    borderBottomColor: "transparent",
    }} className={styles.spinner}>
    </div>;
}