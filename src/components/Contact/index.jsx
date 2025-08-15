import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

const PHONE = '05304224992'
const PHONE_INTL = '905304224992'
const ADDRESS = 'Büyükoyumca mh. 5269. Sk. No:5 Eras Sitesi J Blok Kat:7 Daire:30 Atakum / Samsun'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [prefill, setPrefill] = useState({ service: '', intent: '' })
  const msgRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)

  // URL param / custom event dinle
  useEffect(() => {
    const applyFromURL = () => {
      const params = new URLSearchParams(window.location.search)
      const service = params.get('service') || ''
      const intent = params.get('intent') || ''
      if (service || intent) setPrefill({ service, intent })
    }
    applyFromURL()
    const onPrefill = (e) => setPrefill(e.detail || {})
    window.addEventListener('prefill-contact', onPrefill)
    return () => window.removeEventListener('prefill-contact', onPrefill)
  }, [])

  // Prefill geldikçe mesajı oluştur
  useEffect(() => {
    if (!msgRef.current) return
    const { service, intent } = prefill
    if (service || intent) {
      const header = `${intent ? `[${intent}] ` : ''}${service ? `${service} – ` : ''}`
      const template = `${header}Talebim:
- Adres: 
- Uygun zaman: 
- Detay: `
      msgRef.current.value = template
      // Kullanıcı adı/e-posta boşsa ad alanına odaklan
      nameRef.current?.focus()
    }
  }, [prefill])

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const message = msgRef.current?.value || ''
    // Mailto + WhatsApp (mevcut akış)
    const mailto = `mailto:info@ornek.com?subject=${encodeURIComponent('Teklif Talebi - Usta Hizmet')}&body=${encodeURIComponent(
      `Ad Soyad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`
    )}`
    window.location.href = mailto
    const waText = encodeURIComponent(`Merhaba, teklif almak istiyorum.\n${message}\nAd: ${name}\nE-posta: ${email}`)
    window.open(`https://wa.me/${PHONE_INTL}?text=${waText}`, '_blank', 'noopener')
  }

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Sol panel (senin son istediğin düzen) */}
          <div className={styles.info}>
            <span className={styles.badge}>Ücretsiz keşif • Aynı gün dönüş</span>
            <h2>İletişim</h2>
            <p className={styles.lead}>
              Boya‑badana, bahçe temizliği, çim biçme ve haşere ilaçlama için hızlı teklif alın.
              Atakum ve çevresinde hizmet veriyoruz.
            </p>

            <div className={styles.stack}>
              <div className={styles.block}>
                <div className={styles.label}>Adres</div>
                <div className={styles.addr}>{ADDRESS}</div>
              </div>
              <div className={styles.block}>
                <div className={styles.label}>WhatsApp</div>
                <a href={`https://wa.me/${PHONE_INTL}`} target="_blank" rel="noreferrer" className={styles.link}>
                  Mesaj Gönder
                </a>
              </div>
              <div className={styles.block}>
                <div className={styles.label}>Telefon</div>
                <a href={`tel:${PHONE}`} className={styles.link}>{PHONE}</a>
              </div>
            </div>
          </div>

          {/* Sağ panel: koyu degrade form (önceki hâlinle uyumlu) */}
          <form className={styles.formDark} onSubmit={handleSubmit}>
            <h3>Teklif Formu</h3>
            <label>
              <span>Ad Soyad</span>
              <input ref={nameRef} name="name" required />
            </label>
            <label>
              <span>E‑posta</span>
              <input ref={emailRef} name="email" type="email" required />
            </label>
            <label>
              <span>Mesaj</span>
              <textarea
                ref={msgRef}
                name="message"
                rows={6}
                placeholder="Talebinizi yazın…"
                required
              />
            </label>

            <div className={styles.actions}>
              <button type="submit" className={styles.cta} disabled={sending}>
                {sending ? 'Gönderiliyor…' : 'Teklif Al →'}
              </button>
              <a className={styles.ctaGhost} href={`tel:${PHONE}`}>Hemen Ara</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
