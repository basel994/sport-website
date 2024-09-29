import { NewType } from "@/types";

export const newsFetch = async () => {
    const response = await fetch(`https://api/news`);
    const result: NewType[] = await response.json();
    return result;
}