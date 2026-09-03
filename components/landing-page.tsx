'use client';

// Client-side motion and deck interactions for the otherwise static landing page.

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Code2, Contact } from 'lucide-react';
import { Button } from '@/components/ui/button';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const rocketImage = `${basePath}/rocket-flight-desktop-dark.jpg`;

const projects = [
  {
    number: '01',
    type: '学术研究 / Prediction Markets',
    title: 'Luck, Skill, and Trader Heterogeneity in Prediction Markets',
    subtitle: "Evidence from Polymarket's Crypto Markets",
    summary: '从 2.189 亿笔链上成交中重建钱包级 PnL，并用行为聚类与三类 bootstrap 检验区分运气与技能。',
    meta: ['653,910 钱包', '218.9M 成交', '2026'],
    href: '/projects/polymarket',
    status: '已完成',
    tone: 'paper',
  },
  {
    number: '02',
    type: '研究项目 / Gold',
    title: '黄金研究项目',
    subtitle: '研究框架与数据产品待发布',
    summary: '为黄金供需、定价、宏观驱动与交易信号预留的项目位置。',
    meta: ['筹备中', 'COMING SOON'],
    href: null,
    status: '待发布',
    tone: 'gold',
  },
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function ProjectDeck() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const cycle = (direction: number) => {
    setActive((current) => (current + direction + projects.length) % projects.length);
    setDragX(0);
  };

  const openActive = () => {
    const href = projects[active].href;
    if (href) router.push(href);
  };

  return (
    <div className="deck-shell">
      <div className="project-deck" aria-live="polite">
        {projects.map((project, index) => {
          const distance = (index - active + projects.length) % projects.length;
          const isActive = distance === 0;
          return (
            <button
              type="button"
              key={project.number}
              className={`deck-card deck-card-${project.tone} ${isActive ? 'is-active' : ''}`}
              style={
                {
                  '--deck-x': `${distance * 20}px`,
                  '--deck-y': `${distance * 13}px`,
                  '--deck-r': `${distance % 2 ? 2.8 : -1.8}deg`,
                  '--drag-x': isActive ? `${dragX}px` : '0px',
                  '--drag-r': isActive ? `${dragX / 22}deg` : '0deg',
                  zIndex: projects.length - distance,
                } as React.CSSProperties
              }
              aria-hidden={!isActive}
              aria-label={`${project.title}。${project.status}。${project.href ? '按回车打开项目' : '项目暂未开放'}`}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  cycle(1);
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  cycle(-1);
                }
              }}
              onClick={(event) => {
                if (isActive && event.detail === 0) openActive();
              }}
              onPointerDown={(event) => {
                if (!isActive) return;
                startX.current = event.clientX;
                didDrag.current = false;
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!isActive || startX.current === null) return;
                const next = event.clientX - startX.current;
                if (Math.abs(next) > 5) didDrag.current = true;
                setDragX(next);
              }}
              onPointerUp={(event) => {
                if (!isActive || startX.current === null) return;
                const moved = event.clientX - startX.current;
                startX.current = null;
                if (Math.abs(moved) > 56) cycle(moved > 0 ? -1 : 1);
                else if (!didDrag.current) openActive();
                else setDragX(0);
              }}
              onPointerCancel={() => {
                startX.current = null;
                setDragX(0);
              }}
            >
              <div className="card-index">
                <span>{project.number}</span>
                <span>{project.status}</span>
              </div>
              <div className="card-copy">
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <h4>{project.subtitle}</h4>
                <p className="card-summary">{project.summary}</p>
              </div>
              <div className="card-footer">
                <div>
                  {project.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <span className="card-open">{project.href ? '打开项目 ↗' : '位置预留'}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="deck-controls">
        <p>拖动卡片，或使用方向键切换</p>
        <div className="deck-actions">
          <Button className="deck-button" variant="ghost" size="icon" onClick={() => cycle(-1)} aria-label="上一个项目">
            <ChevronLeft />
          </Button>
          <div className="deck-dots" aria-hidden="true">
            {projects.map((project, index) => (
              <span key={project.number} className={index === active ? 'is-current' : ''} />
            ))}
          </div>
          <Button className="deck-button" variant="ghost" size="icon" onClick={() => cycle(1)} aria-label="下一个项目">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
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
            领英 ↗
          </a>
          <a className="nav-pill" href="#projects">研究 &amp; 交易</a>
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

          <p className="portal-kicker">研究 · 交易 · 数据 · 系统</p>
          <h1 className="portal-title" aria-label="卢思宇项目集">
            <span className="portal-title-left">卢思宇</span>
            <span className="portal-title-right">项目集</span>
          </h1>
          <div className="portal-meta portal-meta-left">PORTFOLIO / 2026</div>
          <div className="portal-meta portal-meta-right">向下滚动以展开</div>
        </div>
      </section>

      <section
        ref={statementRef}
        className="statement-fold"
        style={{ '--statement-progress': statementProgress } as React.CSSProperties}
      >
        <div className="statement-orbit" aria-hidden="true">
          <Image src={rocketImage} alt="" fill unoptimized sizes="(max-width: 760px) 66vw, 36vw" />
        </div>
        <div className="statement-copy reveal">
          <p className="eyebrow">研究方法 / 01</p>
          <h2>
            把研究对象拆解为可追溯的数据、可复核的方法，和<span>可以被证伪的结论。</span>
          </h2>
        </div>
        <div className="outline-number" aria-hidden="true">01</div>
      </section>

      <section id="projects" className="projects-section">
        <div className="projects-intro reveal">
          <p className="eyebrow">项目集合 / SELECTED WORK</p>
          <h2>研究不是陈列，<br />而是一条可检查的证据链。</h2>
          <p className="projects-lede">
            从链上微观结构到商品研究，项目覆盖数据工程、实证检验与交易问题。每个条目独立维护，这里只提供清晰入口。
          </p>
          <div className="projects-links">
            <Link className="text-link" href="/projects/polymarket">
              阅读首篇研究 <ArrowUpRight />
            </Link>
            <a className="text-link muted-link" href="https://github.com/sethlu-lusiyu" target="_blank" rel="noreferrer">
              GitHub <Code2 />
            </a>
          </div>
        </div>
        <div className="reveal deck-reveal">
          <ProjectDeck />
        </div>
      </section>

      <section className="project-index" aria-labelledby="project-index-title">
        <div className="index-heading reveal">
          <p className="eyebrow">项目索引 / 02</p>
          <h2 id="project-index-title">项目集大全</h2>
        </div>
        <Link className="index-row reveal" href="/projects/polymarket">
          <span>01</span>
          <strong>Prediction Markets</strong>
          <p>运气、技能与交易者异质性</p>
          <span>2026 ↗</span>
        </Link>
        <div className="index-row reveal is-disabled" aria-disabled="true">
          <span>02</span>
          <strong>Gold</strong>
          <p>黄金研究项目</p>
          <span>待发布</span>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-top reveal">
          <div>
            <p className="eyebrow">继续向前 / 03</p>
            <h2>问题会变化，证据必须留下。</h2>
            <p>持续扩展中的研究与交易项目集。</p>
          </div>
          <div className="closing-links">
            <a href="https://uk.linkedin.com/in/siyu-lu-0302a6339" target="_blank" rel="noreferrer">
              <Contact /> 领英
            </a>
            <a href="https://github.com/sethlu-lusiyu" target="_blank" rel="noreferrer">
              <Code2 /> GitHub
            </a>
          </div>
        </div>
        <footer>
          <span>卢思宇（帝国理工学院 · 中央财经大学）</span>
          <span>研究 &amp; 交易 / 2026</span>
        </footer>
        <div className="closing-wordmark" aria-hidden="true">卢思宇 项目集</div>
      </section>
    </main>
  );
}
