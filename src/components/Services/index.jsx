import React from 'react'
import styles from './index.module.scss'

const services = [
  {
    emoji: '🎨',
    title: 'Boya - Badana',
    img: '/images/boya-badana.jpg',
    desc:
      'Evinizin ve iş yerinizin tüm iç ve dış cephe boya işlerini profesyonel ekibimizle, temiz ve düzenli şekilde gerçekleştiriyoruz. Düz boya, saten boya, tavan ve duvar boyama, renk yenileme gibi hizmetler sunuyoruz.',
    bullets: [
      'Düz / saten boya uygulamaları',
      'Tavan ve duvar boyama',
      'Renk danışmanlığı',
      'Temiz teslim garantisi',
    ],
    cta: 'Teklif Al',
  },
  {
    emoji: '🧹',
    title: 'Bahçe Temizliği',
    img: '/images/bahce1.avif',
    desc:
      'Bahçenizin düzenli ve sağlıklı görünmesi için kapsamlı temizlik hizmeti sunuyoruz. Yaprak ve dal toplama, yabani ot temizliği, budama desteği ve atıkların çıkarılması işlemlerini profesyonel ekipmanlarla yapıyoruz.',
    bullets: [
      'Yaprak ve dal toplama',
      'Budama ve çalı temizliği',
      'Bahçe atıklarının çıkarılması',
      'Düzenli bakım planı',
    ],
    cta: 'Keşif Talep Et',
  },
  {
    emoji: '🌱',
    title: 'Çim Biçme',
    img: '/images/cim1.jpg',
    desc:
      'Bahçenizin estetik görünümü ve çim sağlığı için düzenli biçim ve bakım şart. Kenar düzeltme, biçme, toplama ve isteğe bağlı gübreleme önerileriyle yeşil alanlarınızı koruyoruz.',
    bullets: [
      'Kenar düzeltme',
      'Biçme ve toplama',
      'Gübreleme önerisi',
      'Periyotlu bakım indirimi',
    ],
    cta: 'Randevu Al',
  },
  {
    emoji: '🪲',
    title: 'Haşere İlaçlama (Böcek İlaçlama)',
    img: '/images/haşere.jpg',
    desc:
      'Ev ve iş yerlerinde sağlığınızı tehdit eden haşere ve böceklerle mücadele için profesyonel ilaçlama hizmeti veriyoruz. Jel, ULV, püskürtme gibi yöntemleri çocuk ve evcil hayvan dostu ürünlerle uyguluyoruz.',
    bullets: [
      'Ev/iş yeri ilaçlama',
      'Jel & ULV uygulamaları',
      'Çocuk/evcil uyumlu ürünler',
      'Pest kontrol planı',
    ],
    cta: 'Hizmet Al',
  },
]

// CTA etiketinden niyeti çıkar
const getIntentFromCTA = (label = '') => {
  const l = label.toLowerCase()
  if (l.includes('keşif')) return 'Keşif'
  if (l.includes('randevu')) return 'Randevu'
  return 'Teklif'
}

// Contact formunu açtır + ön doldurma bilgisi gönder
const sendCTA = (serviceName, intent) => {
  const url = new URL(window.location.href)
  url.hash = 'contact'
  url.searchParams.set('service', serviceName)
  url.searchParams.set('intent', intent)
  history.replaceState(null, '', url.toString())

  // yumuşak kaydır
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  // Contact bileşenine SPA içi event
  window.dispatchEvent(new CustomEvent('prefill-contact', {
    detail: { service: serviceName, intent }
  }))
}

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>Hizmetlerimiz</h2>
          <p>
            Usta Hizmet olarak boya-badana, bahçe temizliği, çim biçme ve haşere ilaçlama alanlarında
            profesyonel çözümler sunuyoruz. Ücretsiz keşif ve net fiyat garantisiyle kaliteli hizmet veriyoruz.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <article key={i} className={styles.card}>
              {/* Üst görsel alanı */}
              <div className={styles.thumb}>
                <img src={s.img} alt="" loading="lazy" />
                <div className={styles.thumbScrim} />
                <div className={styles.thumbBadge}>
                  <span className={styles.emoji}>{s.emoji}</span> {s.title}
                </div>
              </div>

              {/* Kart gövdesi */}
              <div className={styles.body}>
                <h3>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
                <ul>
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>

                {/* CTA: formu aç + ön doldur */}
                <button
                  className="btn"
                  onClick={() => sendCTA(s.title, getIntentFromCTA(s.cta))}
                >
                  {s.cta} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
