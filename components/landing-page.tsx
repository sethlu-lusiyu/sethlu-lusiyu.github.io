'use client';

// Client-side reveal motion for the otherwise static landing page.

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Code2, Contact } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const rocketImage = `${basePath}/rocket-flight-desktop-dark.jpg`;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function Home() {
  const portalRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [statementProgress, setStatementProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    document.documentElement.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-revealed');
        });
      },
      { threshold: 0.16 },
    );
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const portal = portalRef.current;
        const statement = statementRef.current;
        if (portal) {
          const travel = Math.max(1, portal.offsetHeight - window.innerHeight);
          setProgress(clamp(-portal.getBoundingClientRect().top / travel));
        }
        if (statement) {
          const rect = statement.getBoundingClientRect();
          setStatementProgress(clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        }
        ticking = false;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      revealObserver.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return (
    <main>
      <header className="site-nav">
        <a className="nav-brand" href="#top" aria-label="返回顶部">
          卢思宇 项目集<span>·</span>
        </a>
        <p className="nav-identity">帝国理工学院 · 中央财经大学</p>
        <nav aria-label="主导航">
          <a href="#projects">项目集大全</a>
          <a href="https://uk.linkedin.com/in/siyu-lu-0302a6339" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </nav>
      </header>

      <section
        ref={portalRef}
        id="top"
        className="portal"
        style={{ '--portal-progress': progress } as React.CSSProperties}
        aria-label="卢思宇项目集开场"
      >
        <div className="portal-stage">
          <Image
            className="portal-image"
            src={rocketImage}
            alt="火箭划过夜空，留下明亮轨迹"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
          <div className="portal-panel portal-panel-left" aria-hidden="true" />
          <div className="portal-panel portal-panel-right" aria-hidden="true" />
          <span className="portal-dot portal-dot-left" aria-hidden="true" />
          <span className="portal-dot portal-dot-right" aria-hidden="true" />

          <p className="portal-kicker">金融研究 · 交易</p>
          <h1 className="portal-title" aria-label="卢思宇项目集，Siyu Lu Portfolio">
            <span className="portal-title-left">卢思宇</span>
            <span className="portal-title-right">项目集</span>
          </h1>
          <div className="portal-keywords" aria-label="研究方向">
            <span className="keyword-1">Fundamental Research</span>
            <span className="keyword-2">Quantitative Fundamentals</span>
            <span className="keyword-3">Futures Fundamentals</span>
            <span className="keyword-4">Multi-Asset Allocation</span>
            <span className="keyword-5">Bridging Research &amp; Trading</span>
            <span className="keyword-6">Financial Technology</span>
            <span className="keyword-7">Data-Driven</span>
          </div>
          <div className="portal-meta portal-meta-right">向下滚动以展开</div>
        </div>
      </section>

      <section
        ref={statementRef}
        id="projects"
        className="statement-fold portfolio-fold"
        style={{ '--statement-progress': statementProgress } as React.CSSProperties}
      >
        <div className="statement-orbit" aria-hidden="true">
          <Image src={rocketImage} alt="" fill unoptimized sizes="(max-width: 760px) 66vw, 36vw" />
        </div>
        <div className="statement-copy portfolio-copy reveal">
          <h2>项目集大全</h2>
          <div className="portfolio-list">
            <Link className="portfolio-row" href="/projects/polymarket">
              <span>01</span>
              <strong>
                Luck, Skill, and Trader Heterogeneity in Prediction Markets:
                <small>Evidence from Polymarket&apos;s Crypto Markets</small>
              </strong>
              <div className="portfolio-meta">
                <em>研究论文 · 2026</em>
                <span className="portfolio-action">点击打开 ↗</span>
              </div>
            </Link>
            <div className="portfolio-row is-disabled" aria-disabled="true">
              <span>02</span>
              <strong>
                Gold Research Project
                <small>Fundamentals, Valuation and Trading Signals</small>
              </strong>
              <div className="portfolio-meta">
                <em>研究项目 · 待发布</em>
                <span className="portfolio-action">尚未开放</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-top reveal">
          <div>
            <p className="closing-statement">金融研究与交易的持续项目集</p>
          </div>
          <div className="closing-links">
            <a href="https://uk.linkedin.com/in/siyu-lu-0302a6339" target="_blank" rel="noreferrer">
              <Contact /> LinkedIn
            </a>
            <a href="https://github.com/sethlu-lusiyu" target="_blank" rel="noreferrer">
              <Code2 /> GitHub
            </a>
          </div>
        </div>
        <footer>
          <span>卢思宇（帝国理工学院 · 中央财经大学）</span>
        </footer>
        <div className="closing-wordmark" aria-hidden="true">Financial Science</div>
      </section>
    </main>
  );
}
