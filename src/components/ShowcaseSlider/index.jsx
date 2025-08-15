import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

/**
 * Görselleri public/images altına koyup /images/... olarak ver:
 * public/images/boya1.jpg -> "/images/boya1.jpg"
 */
const slides = [
  {
    image: '/images/boya-badana.jpg',
    title: 'Pürüzsüz Boya – Badana',
    subtitle: 'Temiz işçilik, zamanında teslim. Ücretsiz keşif!',
    cta: { label: 'Teklif Al', targetId: 'contact' },
  },
  {
    image: '/images/bahce1.avif',
    title: 'Bahçe Temizliği',
    subtitle: 'Budama, toplama, atık çıkarma. Düzenli bakım planı.',
    cta: { label: 'Hizmetleri Gör', targetId: 'services' },
  },
  {
    image: '/images/cim1.jpg',
    title: 'Profesyonel Çim Biçme',
    subtitle: 'Kenar düzeltme + toplama. Periyotlu bakımda indirim.',
    cta: { label: 'Teklif Al', targetId: 'contact' },
  },
  {
    image: '/images/hasere.jpg', 
    title: 'Haşere İlaçlama',
    subtitle: 'Bahçenizdeki sinek, karınca, kene ve diğer zararlılara karşı etkili, çevre dostu ilaçlama hizmeti sunuyoruz. Bitkilere zarar vermeden sağlıklı bir ortam oluşturuyoruz.',
    cta: { label: 'Teklif Al', targetId: 'contact' },
  }
]

export default function ShowcaseSlider({ interval = 5000 }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)

  const next = () => setIdx((i) => (i + 1) % slides.length)
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length)
  const to = (i) => setIdx(i)

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // autoplay
  useEffect(() => {
    if (paused) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [paused, interval])

  // klavye okları
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev() }
    touchStartX.current = null
  }

  return (
    <section
      className={styles.slider}
      aria-roledescription="carousel"
      aria-label="Vitrin Slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.track} aria-live="polite">
        {slides.map((s, i) => (
          <figure
            key={i}
            className={`${styles.slide} ${i === idx ? styles.active : ''}`}
          >
            <img src={s.image} alt="" loading="lazy" />
            <figcaption className={styles.caption}>
              <div className={styles.badge}>Usta Hizmet • Atakum</div>
              <h2 className={styles.title}>{s.title}</h2>
              <p className={styles.subtitle}>{s.subtitle}</p>
              <div className={styles.actions}>
                <button className="btn" onClick={() => go(s.cta.targetId)}>
                  {s.cta.label} →
                </button>
                <button className="btn btnOutline" onClick={() => go('services')}>
                  Tüm Hizmetler
                </button>
              </div>
            </figcaption>
            <div className={styles.scrim} />
          </figure>
        ))}
      </div>

      <button className={styles.prev} onClick={prev} aria-label="Önceki slayt">‹</button>
      <button className={styles.next} onClick={next} aria-label="Sonraki slayt">›</button>

      <div className={styles.dots} role="tablist" aria-label="Slayt göstergeleri">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
            onClick={() => to(i)}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
