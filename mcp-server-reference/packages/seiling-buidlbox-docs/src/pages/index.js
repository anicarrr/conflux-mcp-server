import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import CodeBlock from '@theme/CodeBlock';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Back to Top Button Component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default function Home() {
  useEffect(() => {
    AOS.init({ 
      once: true, 
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 100
    });
  }, []);

  return (
    <Layout
      title="Seiling Buidlbox"
      description="No-Code Sei Multi-Agent System Development Toolkit"
    >
      <header className={styles.heroBannerAnimated}>
        <div className="container">
          <img
            src={require('@site/static/img/icon.png').default}
            alt="Seiling Buidlbox Logo"
            className={styles.heroLogo}
          />
          <h1 className="hero__title">Seiling Buidlbox</h1>
          <p className={styles.heroTagline}>Build, deploy, and manage AI agents for Sei Network—<b>no code required</b>.</p>
          <p className={styles.heroValueProp}>The fastest way to create, automate, and scale blockchain AI agents. Open-source. Visual. Developer-first.</p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="#quickstart"
              style={{ marginLeft: 16 }}
            >
              One-Click Install
            </Link>
          </div>
        </div>
        <div className={styles.heroWave}></div>
      </header>
      <main>
        <section className={styles.quickstartSection} id="quickstart" data-aos="fade-up">
          <h2>One-Click Installation</h2>
          <div className={styles.quickstartOptions}>
            <div className={styles.quickstartCard} data-aos="fade-up" data-aos-delay="200">
              <h3>🚀 Bootstrap in Seconds</h3>
              <p className={styles.quickstartDesc}>Get started with a single command. No manual setup, no headaches.</p>
              <CodeBlock language="bash">
{`curl -sSL https://raw.githubusercontent.com/nicoware-dev/seiling-buidlbox/main/bootstrap.sh | bash`}
              </CodeBlock>
              <p style={{ marginTop: 16, fontSize: '0.95em', color: '#666' }}>
                💡 <strong>Why so easy?</strong> Seiling Buidlbox automates everything: dependencies, configuration, and deployment. Just focus on building.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection} data-aos="fade-up">
          <div className="container">
            <h2>Built for the Future of Blockchain AI</h2>
            <div className={styles.statsRow}>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="100">
                <div className={styles.statNumber}>
                  <CountUp end={12} duration={2.5} />+
                </div>
                <div className={styles.statLabel}>Integrated Services</div>
              </div>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="200">
                <div className={styles.statNumber}>
                  <CountUp end={6} duration={2.5} />+
                </div>
                <div className={styles.statLabel}>AI Frameworks</div>
              </div>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="300">
                <div className={styles.statNumber}>
                  <CountUp end={10} duration={2.5} />
                </div>
                <div className={styles.statLabel}>Min Setup Time</div>
              </div>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="400">
                <div className={styles.statNumber}>
                  <CountUp end={11} duration={2.5} />+
                </div>
                <div className={styles.statLabel}>Ready-to-Use Agents</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2 data-aos="fade-up">Why Choose Seiling Buidlbox</h2>
          <div className={styles.bigFeaturesRow}>
            <div className={styles.bigFeatureCard} data-aos="fade-up" data-aos-delay="100">
              <span role="img" aria-label="Visual">🖥️</span>
              <h3>Visual Agent Builder</h3>
              <p>Design, connect, and deploy AI agents with drag-and-drop simplicity. No code, just creativity.</p>
            </div>
            <div className={styles.bigFeatureCard} data-aos="fade-up" data-aos-delay="200">
              <span role="img" aria-label="Lightning">⚡</span>
              <h3>Deploy in Minutes</h3>
              <p>From zero to production in under 10 minutes. Local or cloud—your choice, your workflow.</p>
            </div>
            <div className={styles.bigFeatureCard} data-aos="fade-up" data-aos-delay="300">
              <span role="img" aria-label="Blockchain">🔗</span>
              <h3>Sei Blockchain Native</h3>
              <p>First-class integration with Sei Network. Automate DeFi, trading, and more with built-in tools.</p>
            </div>
            <div className={styles.bigFeatureCard} data-aos="fade-up" data-aos-delay="400">
              <span role="img" aria-label="Open Source">🌐</span>
              <h3>Open & Extensible</h3>
              <p>100% open-source. Add your own agents, connect to any API, and join the growing ecosystem.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection} data-aos="fade-up">
          <div className="container">
            <h2>Ready to Build the Future?</h2>
            <p>Experience the next generation of no-code blockchain AI development with Seiling Buidlbox.</p>
            <div className={styles.ctaButtons}>
              <Link
                className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
                to="/docs/intro"
              >
                <span role="img" aria-label="Rocket">🚀</span>
                Start Building Now
              </Link>
              <Link
                className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
                to="https://github.com/nicoware-dev/seiling-buidlbox"
                target="_blank"
                rel="noopener"
              >
                <span role="img" aria-label="GitHub">⭐</span>
                View on GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </Layout>
  );
} 