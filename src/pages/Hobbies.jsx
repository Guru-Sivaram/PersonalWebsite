const HOME_AUTOMATION_IMAGES = ['/1832.jpg', '/1833.jpg', '/1834.jpg', '/1835.jpg', '/1836.jpg', '/1837.jpg']
const PAINT_IMAGES = ['/paint/1486.jpg', '/paint/1488.jpg', '/paint/1792.jpg', '/paint/1794.jpg', '/paint/1795.jpg']
const PRINT3D_IMAGES = ['/3dprinting/1838.jpg', '/3dprinting/1839.jpg']
const BOTANY_IMAGES = ['/botany/1840.jpg', '/botany/1841.jpg']
const POKER_IMAGE = 'https://images.unsplash.com/photo-1653495167982-51e02ce225c8?w=800&auto=format&fit=crop'
const TRADING_IMAGE = 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800'

export default function Hobbies() {
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
          <div className="hobby-collage" aria-label="Home automation photos">
            {HOME_AUTOMATION_IMAGES.map((src, i) => (
              <img key={src} src={src} alt="" className="hobby-collage-img" />
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">3D Printing</h2>
          <p className="hobby-desc">
            Various 3D prints including Skadis board and attachments, car parts, jigs, etc.
          </p>
          <div className="hobby-collage hobby-collage-pair" aria-label="3D printing photos">
            {PRINT3D_IMAGES.map((src) => (
              <img key={src} src={src} alt="" className="hobby-collage-img" />
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Houseplants</h2>
          <p className="hobby-desc">
            Houseplants and indoor gardening.
          </p>
          <div className="hobby-collage hobby-collage-pair" aria-label="Houseplants photos">
            {BOTANY_IMAGES.map((src) => (
              <img key={src} src={src} alt="" className="hobby-collage-img" />
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Spackling and Painting</h2>
          <p className="hobby-desc">
            Spackling and painting projects around the house.
          </p>
          <div className="hobby-collage" aria-label="Spackling and painting photos">
            {PAINT_IMAGES.map((src) => (
              <img key={src} src={src} alt="" className="hobby-collage-img" />
            ))}
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Trading</h2>
          <p className="hobby-desc">
            Primarily swing trade various markets open to the consumer, like futures, resources, equities, options, and other asset classes. Due diligence performed; I primarily stick to analyzing fundamentals using balance sheets, cash flow, and income statements.
          </p>
          <div className="hobby-collage hobby-collage-full" aria-label="Trading">
            <img src={TRADING_IMAGE} alt="Stock market chart" className="hobby-collage-img" />
          </div>
        </article>

        <article className="hobby-entry">
          <h2 className="hobby-title">Poker</h2>
          <p className="hobby-desc">
            Primarily play GTO (Game Theory Optimal), a mathematical approach to the game with pot odds, positions, etc.
          </p>
          <div className="hobby-collage hobby-collage-full" aria-label="Poker">
            <img src={POKER_IMAGE} alt="Poker chips on a table" className="hobby-collage-img" />
          </div>
        </article>
      </section>
    </main>
  )
}
