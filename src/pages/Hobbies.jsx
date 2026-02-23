import { useEffect } from 'react'

const HOME_AUTOMATION_IMAGES = ['/1832.jpg', '/1833.jpg', '/1834.jpg', '/1835.jpg', '/1836.jpg', '/1837.jpg']
const PAINT_IMAGES = ['/paint/1486.jpg', '/paint/1488.jpg', '/paint/1792.jpg', '/paint/1794.jpg', '/paint/1795.jpg', '/paint/Untitled.jpg']
const PRINT3D_IMAGES = ['/3dprinting/1838.jpg', '/3dprinting/1839.jpg']
const BOTANY_IMAGES = ['/botany/1840.jpg', '/botany/1841.jpg']

export default function Hobbies() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="main">
      <section className="hobbies hobbies-page">
        <h1 className="section-title">Hobbies</h1>
        <p className="hobbies-intro">Things I enjoy outside of work.</p>

        <article className="hobby-entry">
          <h2 className="hobby-title">Home Automation</h2>
          <p className="hobby-desc">
            Gigabit networking for the house, NAS, Plex Server, lighting automation, Home Assistant and Google Home commands, automations, vacuum cleaning, lighting mood, garage door, water leak sensors, vibration sensors, alerting, and more!
          </p>
          <div className="hobby-collage hobby-collage--6" aria-label="Home automation photos">
            {HOME_AUTOMATION_IMAGES.map((src, i) => (
              <div key={src} className={`hobby-collage-item ${i === 0 ? 'hobby-collage-item--rotate-90' : ''}`}>
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">3D Printing</h2>
          <p className="hobby-desc">
            Various 3D prints including Skadis board and attachments, car parts, jigs, etc.
          </p>
          <div className="hobby-collage hobby-collage--2" aria-label="3D printing photos">
            {PRINT3D_IMAGES.map((src) => (
              <div key={src} className="hobby-collage-item hobby-collage-item--rotate-90">
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Houseplants</h2>
          <p className="hobby-desc">
            Houseplants and indoor gardening.
          </p>
          <div className="hobby-collage hobby-collage--2" aria-label="Houseplants photos">
            {BOTANY_IMAGES.map((src) => (
              <div key={src} className="hobby-collage-item hobby-collage-item--rotate-90">
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Spackling and Painting</h2>
          <p className="hobby-desc">
            Spackling and painting projects around the house.
          </p>
          <div className="hobby-collage hobby-collage--6" aria-label="Spackling and painting photos">
            {PAINT_IMAGES.map((src) => (
              <div key={src} className="hobby-collage-item">
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Trading</h2>
          <p className="hobby-desc">
            Primarily swing trade various markets open to the consumer, like futures, resources, equities, options, and other asset classes. Due diligence performed; I primarily stick to analyzing fundamentals using balance sheets, cash flow, and income statements.
          </p>
          <div className="hobby-collage hobby-collage--1" aria-label="Trading">
            <div className="hobby-collage-item">
              <img src="/Trading/Screenshot 2026-02-23 102341(1).png" alt="Trading" loading="lazy" />
            </div>
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Poker</h2>
          <p className="hobby-desc">
            Primarily play GTO (Game Theory Optimal), a mathematical approach to the game with pot odds, positions, etc.
          </p>
          <div className="hobby-collage hobby-collage--1" aria-label="Poker">
            <div className="hobby-collage-item">
              <img src="/Poker/Screenshot 2026-02-23 102744(1).png" alt="Poker" loading="lazy" />
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
