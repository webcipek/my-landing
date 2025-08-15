import React from 'react'
import styles from './index.module.scss'

const PHONE_INTL = '905304224992' // 90 + numara (başında 0 yok)

export default function Hero() {
  const openWhatsAppQuickQuote = () => {
    const text = [
      'Merhaba, hızlı teklif almak istiyorum 🙏',
      'Hizmet: (Boya-Badana / Bahçe Temizliği / Çim Biçme / Haşere İlaçlama)',
      'Adres: ',
      'Uygun zaman: ',
      'Detay: ',
    ].join('\n')
    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Sol: Görsel */}
          <div className={styles.media}>
            <img
              src="/images/hero.jpg"  /* kendi görsel yolunu kullan */
              alt="Usta Hizmet – boya, bahçe ve çim hizmetleri"
              loading="eager"
            />
          </div>

          {/* Sağ: Metinler */}
          <div className={styles.content}>
            <span className={styles.badge}>Atakum & çevresi • Aynı gün keşif</span>
            <h1 className={styles.title}>
              Boya‑badana, bahçe temizliği ve <span className={styles.gradient}>çim biçme</span> hizmetleri
            </h1>
            <p className={styles.subtitle}>
              Eviniz ve bahçeniz için tek noktadan çözüm. Usta ekiple temiz iş, şeffaf fiyat.
            </p>

            <div className={styles.actions}>
              <button className="btn" onClick={openWhatsAppQuickQuote}>Hemen Teklif Al →</button>
              <button className="btn btnOutline" onClick={() => go('services')}>Hizmetlere Bak</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
