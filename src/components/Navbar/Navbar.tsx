import Brand from "./Brand";
import Menu from "./Menu";
import styles from "./navbar.module.css";
export default function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Brand />
            <Menu />
        </nav>
    )
}