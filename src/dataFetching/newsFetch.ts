import { NewType } from "@/types";

export const newsFetch = async () => {
    const response = await fetch("https://sport-backend.vercel.app/news");
    const result: NewType[] = await response.json();
    return result;
}