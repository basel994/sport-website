import { NewType } from "@/types";

export const newsFetch = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/news`, {
        headers: {
            "Content-Type": "application/json",
        },
        next: {revalidate: 60,}
    });
    const result: NewType[] = await response.json();
    return result;
}