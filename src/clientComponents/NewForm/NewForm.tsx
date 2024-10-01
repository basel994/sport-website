"use client"
import TextInput from "@/components/FormElements/TextInput";
import styles from "./newForm.module.css";
import { useState } from "react";
import FileInput from "@/components/FormElements/FileInput";
import SubmitButton from "@/components/FormElements/SubmitButton";

export default function NewForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File>();
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setImage(file);
        }
    }
    return(
        <form className={styles.newForm}>
            <TextInput props={{value: title, change: setTitle, placeHolder: "Title"}} />
            <TextInput props={{value: content, change: setContent, placeHolder: "Content"}} />
            <FileInput onchange={handleFile} />
            <SubmitButton title="Save" />
            <h3>{title}</h3>
            <h5>{content}</h5>
            <h5>{image?.name}</h5>
        </form>
    )
}