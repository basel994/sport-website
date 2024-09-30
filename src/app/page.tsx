import HeaderPage from "@/components/HeaderPage/HeaderPage";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div>
      <HeaderPage props={{title: "Latest News", image:"/images/home/news.ico"}}/>
      <div className={styles.newsContainer}>
        hello world
      </div>
    </div>
  );
}
