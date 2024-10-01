import styles from "./elements.module.css";

export default function TextInput({props}: {props: {change: (value: string) => void, value: string, placeHolder: string }}) {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.change(e.target.value);
    }
    return(
        <div className={styles.inputContainer}>
            <input type="text" className={styles.inputElement} placeholder=" " required onChange={changeHandler} />
            <label className={styles.labelElement}>{props.placeHolder}</label>
        </div>    
    );
}