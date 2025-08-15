import React, { useState } from 'react'
import styles from './index.module.scss'
import Logo from '../Logo'

const PHONE = '05304224992'
const PHONE_INTL = '905304224992' // WhatsApp için 90 + numara, başında 0 yok

export default function Header() {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          {/* Logo / Marka */}
          <button className={styles.brand} onClick={() => go('hero')} aria-label="Anasayfa">
            <Logo />
          </button>

          {/* Masaüstü navigasyon */}
          <nav className={styles.navDesktop}>
            <button onClick={() => go('services')}>Hizmetler</button>
            <button onClick={() => go('contact')}>İletişim</button>

            <a className="btn" href="#contact" onClick={(e)=>{e.preventDefault(); go('contact')}}>
              Teklif Al
            </a>

            {/* Telefon etiketi (hafif) */}
            <a className={styles.quick} href={`tel:${PHONE}`}>Ara: {PHONE}</a>

            {/* WhatsApp butonu: çerçeve + yazı #25D366, büyük ikon */}
            <a
              className={styles.whatsappBtn}
              href={`https://wa.me/${PHONE_INTL}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/whatsapp-logo.svg"
                alt="WhatsApp"
                className={styles.whatsappIcon}
              />
              WhatsApp
            </a>
          </nav>

          {/* Mobil menü düğmesi */}
          <button className={styles.menuBtn} onClick={() => setOpen(s=>!s)} aria-label="Menü">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobil navigasyon paneli */}
      {open && (
        <div className={styles.navMobile}>
          <button onClick={() => go('services')}>Hizmetler</button>
          <button onClick={() => go('contact')}>İletişim</button>

          <a className="btn" href="#contact" onClick={(e)=>{e.preventDefault(); go('contact')}}>
            Teklif Al
          </a>

          <a className={styles.quick} href={`tel:${PHONE}`}>Ara: {PHONE}</a>

          <a
            className={styles.whatsappBtn}
            href={`https://wa.me/${PHONE_INTL}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/images/whatsapp-logo.svg"
              alt="WhatsApp"
              className={styles.whatsappIcon}
            />
            WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
