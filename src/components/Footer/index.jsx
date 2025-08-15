import React from 'react'
import styles from './index.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <div>© {new Date().getFullYear()} Usta Hizmet</div>
          <div className={styles.links}>
            <a href="#services">Hizmetler</a>
            <a href="#contact">İletişim</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
