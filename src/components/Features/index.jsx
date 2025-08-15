import React from 'react'
import styles from './index.module.scss'

const items = [
  { title: 'Hızlı Kurulum', desc: 'Dakikalar içinde yayına hazır tek sayfa şablon.' },
  { title: 'Güvenli Altyapı', desc: 'Modern güvenlik pratikleri ve erişilebilirlik odaklı.' },
  { title: 'Şık Tasarım', desc: 'Temiz tipografi, yumuşak köşeler ve ferah boşluklar.' },
]

export default function Features() {
  return (
    <section id="features" className={`section ${styles.features}`}>
      <div className="container">
        <h2>Öne Çıkan Özellikler</h2>
        <p className={styles.lead}>Düşük bakım, yüksek esneklik. İçerikleri kolayca değiştirin.</p>
        <div className={styles.grid}>
          {items.map((it, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{['⚡','🛡️','✨'][i]}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
