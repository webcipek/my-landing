import React from 'react'
import Header from './components/Header'
import ShowcaseSlider from './components/ShowcaseSlider'
import Hero from './components/Hero'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
      <ShowcaseSlider /> 
        <Hero />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
