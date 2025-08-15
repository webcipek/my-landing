import React from 'react'
import styles from './index.module.scss'

export default function Logo({ withText = true }) {
  return (
    <div className={styles.logo} aria-label="Usta Hizmet">
      <svg viewBox="0 0 64 64" className={styles.mark} role="img" aria-hidden="true">
        {/* Fırça ucu (boya) */}
        <path d="M12 44c8-10 18-16 30-18l8 8c-2 12-8 22-18 30-2-6-6-10-12-12 0 0-5-3-8-8z" />
        {/* Yaprak (bahçe) */}
        <path d="M44 8c6 8 6 16 0 24-8-6-16-6-24 0 6-8 6-16 0-24 8 6 16 6 24 0z" className={styles.leaf}/>
      </svg>
      {withText && <span className={styles.text}>Usta Hizmet</span>}
    </div>
  )
}