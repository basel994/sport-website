import { NewType } from "@/types";

export const newsFetch = async () => {
    const response = await fetch("https://sport-website-three.vercel.app/api/news");
    const result: NewType[] = await response.json();
    return result;
}