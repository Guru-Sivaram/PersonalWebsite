import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CircuitBackground from './components/CircuitBackground'
import Hobbies from './pages/Hobbies'
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <CircuitBackground />
      <header className="site-header">
        <nav className="nav">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>Guru</Link>
          <ul className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <li><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
            <li><a href="/#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
            <li><a href="/#education" onClick={() => setMenuOpen(false)}>Education</a></li>
            <li><a href="/#work" onClick={() => setMenuOpen(false)}>Work Projects</a></li>
            <li><Link to="/hobbies" onClick={() => setMenuOpen(false)}>Hobbies</Link></li>
            <li><a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>

      <Routes>
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/" element={
      <main className="main">
        <section id="home" className="hero">
          <p className="hero-label">Hi, I'm</p>
          <h1 className="hero-title">Guru Sivaram</h1>
          <p className="hero-tagline">Infrastructure engineer. Critical systems, low latency, high reliability, and cybersecurity.</p>
        </section>

        <section id="about" className="about">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <img src="/photo.jpg" alt="Guru Sivaram" className="about-photo" />
            <p>IT Professional with 6 years of experience adept in running and administering infrastructure focused projects in high performance compute/storage environments within critical infrastructure, high frequency trading, and robotics. Skilled in writing automation to reduce and standardize manual processes. Experienced in risk mitigation, compliance, regulation, and cybersecurity standards.</p>
          </div>
        </section>

        <section id="experience" className="experience">
          <h2 className="section-title">Work experience</h2>
          <div className="experience-list">
            <article className="experience-job">
              <h3 className="experience-company">Consolidated Edison, Inc.</h3>
              <p className="experience-role">Sr. System Analyst</p>
              <p className="experience-meta">New York, NY</p>
              <p className="experience-meta experience-date">June 2024 – Present</p>
            </article>
            <article className="experience-job">
              <h3 className="experience-company">Susquehanna International Group</h3>
              <p className="experience-role">Systems Engineer</p>
              <p className="experience-meta">Bala Cynwyd, PA</p>
              <p className="experience-meta experience-date">Mar 2023 – Apr 2024</p>
            </article>
            <article className="experience-job">
              <h3 className="experience-company">Amazon Robotics</h3>
              <p className="experience-role">Support Engineer II</p>
              <p className="experience-meta">Boston, MA (Remote)</p>
              <p className="experience-meta experience-date">Dec 2021 – Oct 2022</p>
            </article>
          </div>
        </section>

        <section id="skills" className="skills">
          <h2 className="section-title">Skills and technologies</h2>
          <div className="skills-content">
            <div className="skills-group">
              <h3 className="skills-label">Programming</h3>
              <p className="skills-list">Python, Bash, PowerShell, SQL, JavaScript, HTML, CSS, C, C#, MATLAB, Java, Arduino</p>
            </div>
            <div className="skills-group">
              <h3 className="skills-label">Software Engineering</h3>
              <p className="skills-list">Agile Development, Continuous Integration/Continuous Deployment, OOP, ITIL</p>
            </div>
            <div className="skills-group">
              <h3 className="skills-label">Applications & Technologies</h3>
              <p className="skills-list">AWS (S3, EC2, Athena, RDS, VPC, Glue), Splunk Enterprise, Tableau, Git, Jira, Asana, VMWare, Nutanix, ELK, Ansible, Docker, Kubernetes, Jenkins, Apache, Varonis, Infoblox, MS Office</p>
            </div>
            <div className="skills-group">
              <h3 className="skills-label">Cyber Frameworks</h3>
              <p className="skills-list">NIST CSF, NERC CIP, BESSCI, PII, SOX, BCSI, Zero Trust Architecture, EDR, ITGC</p>
            </div>
            <div className="skills-group">
              <h3 className="skills-label">Operating Systems</h3>
              <p className="skills-list">MacOS, Linux (Red Hat, SLES, OEL, Ubuntu), Windows, VxWorks</p>
            </div>
          </div>
        </section>

        <section id="education" className="education">
          <h2 className="section-title">Education</h2>
          <div className="education-content">
            <div className="education-list">
              <article className="education-entry">
                <h3 className="education-school">New York University (NYU); Tandon School of Engineering</h3>
                <p className="education-degree">Master of Science in Cybersecurity Risk and Strategy</p>
                <p className="education-meta">New York, NY</p>
                <p className="education-meta education-date">Expected Graduation: May 2026</p>
              </article>
              <article className="education-entry">
                <h3 className="education-school">Rutgers University; School of Engineering</h3>
                <p className="education-degree">Bachelor of Science in Electrical and Computer Engineering, Minor in Psychology</p>
                <p className="education-meta">New Brunswick, NJ</p>
                <p className="education-meta education-date">Graduation Date: May 2021</p>
              </article>
            </div>
            <h3 className="education-subtitle">Certifications</h3>
            <div className="certificates-content">
              <div className="certificate-item">
                <p className="certificate-name">Nutanix Certified Professional - Multicloud Infrastructure 6</p>
                <p className="certificate-date">Oct 2024</p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work">
          <h2 className="section-title">Selected projects</h2>
          <ul className="project-list">
            <li className="project-card">
              <a href="#" className="project-link">
                <span className="project-name">Data Center Transition and Expansion</span>
                <span className="project-desc">Led migration from VMware to Nutanix alongside a data center expansion for on-prem systems. Scope included power, cooling, rack space, asset management, performance analysis (CPU, RAM, DISK), and software compatibility.</span>
              </a>
            </li>
            <li className="project-card">
              <a href="#" className="project-link">
                <span className="project-name">Datacenter Reclamation</span>
                <span className="project-desc">Comprehensive analysis of CPU, power, memory, and disk across virtualized servers to rightsize infrastructure. Worked with lines of business to retain or improve performance throughout the effort.</span>
              </a>
            </li>
            <li className="project-card">
              <a href="#" className="project-link">
                <span className="project-name">Infrastructure Automation</span>
                <span className="project-desc">Server build automation, server patch automation, Infoblox fixed address and DHCP automation, WSUS automation, hardware TRAP automation, and more. Implemented in PowerShell, Python, and Bash.</span>
              </a>
            </li>
          </ul>
        </section>

        <section id="contact" className="contact">
          <h2 className="section-title">Say hi</h2>
          <p className="contact-intro">I'm open to collaboration and random hellos.</p>
          <ul className="contact-links">
            <li><a href="mailto:gsivaram97@gmail.com">Email</a></li>
            <li><a href="https://github.com/Guru-Sivaram" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/guru-sivaram/" target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </section>
      </main>
        } />
      </Routes>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Guru Sivaram</p>
      </footer>
    </>
  )
}
