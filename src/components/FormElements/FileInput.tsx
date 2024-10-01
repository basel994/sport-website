import styles from "./elements.module.css";
export default function FileInput({
    onchange
}:{onchange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <label className={styles.fileInputLabel}>  
        <input  
            type="file"  
            accept="image/*"  
            onChange={onchange}  
            className={styles.fileInput}  
        />  
        <span className={styles.customIcon}>🗂️</span> 
    </label>  
    )
}