import HeaderPage from "@/components/HeaderPage/HeaderPage";
import styles from "./page.module.css";
import New from "@/components/New/New";
import { Suspense } from "react";
import { newsFetch } from "@/dataFetching/newsFetch";

export default async function Home() {
  const result = await newsFetch();
  return (
    <div>
      <HeaderPage props={{title: "Latest News", image:"/images/home/news.ico"}}/>
      <div className={styles.newsContainer}>
        {result.map((newInfo)=>{
          return(
            <Suspense key={newInfo.id} fallback={<p>loading ...</p>}>
              <New props={{title: newInfo.title, content: newInfo.content, image: newInfo.image, created_at: newInfo.created_at}} />
            </Suspense>
          )
        })}
      </div>
    </div>
  );
}
