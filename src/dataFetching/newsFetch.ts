import { NewType } from "@/types";

export const newsFetch = async () => {
    const response = await fetch("/api/news");
    const result: NewType[] = await response.json();
    return result;
}