"use client"
import Link from "next/link";
import { links } from "./links";
import styles from "./navbar.module.css";
import { LinkType } from "./types";
import { useRef } from "react";

export default function Menu() {
    const menuRef = useRef<HTMLDivElement>(null);
    const humburgerRef = useRef<HTMLDivElement>(null);
    const clickHandle = () => {
        menuRef.current?.classList.toggle(styles.showMenu);
        humburgerRef.current?.classList.toggle(styles.close);
    }
    return(
        <div className={styles.menuContainer}>
            <div className={styles.menu} ref={menuRef}>
            {links.map((link: LinkType) => {
                return(
                    <Link key={link.id} href={link.href}>{link.name}</Link>
                )
            })}
           </div>
           <div className={styles.humburger} onClick={clickHandle} ref={humburgerRef}><span></span></div>
        </div>
    )
}