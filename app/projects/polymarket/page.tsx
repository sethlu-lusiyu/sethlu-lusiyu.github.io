import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Code2, Download, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Luck, Skill, and Trader Heterogeneity',
  description: '基于 Polymarket 加密市场 2.189 亿笔成交与 653,910 个钱包的交易者技能研究。',
  openGraph: {
    title: 'Luck, Skill, and Trader Heterogeneity in Prediction Markets',
    description: '论文核心结果、研究方法与局限。',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Luck, Skill, and Trader Heterogeneity in Prediction Markets',
    description: '论文核心结果、研究方法与局限。',
    images: [],
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const dynamic = 'force-static';

function Metric({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div className="metric-row">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="metric-track" aria-hidden="true">
        <i style={{ '--metric-value': width } as CSSProperties} />
      </div>
    </div>
  );
}

export default function PolymarketPaper() {
  return (
    <main className="paper-page">
      <nav className="paper-nav" aria-label="论文页面导航">
        <Link href="/">
          <ArrowLeft /> 返回项目集
        </Link>
        <span>研究项目 / 01 / 2026</span>
        <a href={`${basePath}/2026-RP-FinTech.pdf`} target="_blank" rel="noreferrer">
          阅读论文 <ExternalLink />
        </a>
      </nav>

      <header className="paper-hero">
        <div>
          <p className="paper-kicker">Prediction Markets · Trader Skill · On-chain Data</p>
          <h1>Luck, Skill, and Trader Heterogeneity in Prediction Markets</h1>
          <p className="paper-subtitle">
            Evidence from Polymarket&apos;s Crypto Markets。研究识别出显著的交易者技能，但技能并未集中在高频交易者之中。
          </p>
        </div>
        <div className="paper-hero-aside" aria-label="论文样本概览">
          <div className="hero-stat">
            <strong>653,910</strong>
            <span>钱包</span>
          </div>
          <div className="hero-stat">
            <strong>218.9M</strong>
            <span>Order-book fills</span>
          </div>
          <div className="hero-stat">
            <strong>10 months</strong>
            <span>2025.05 — 2026.02</span>
          </div>
        </div>
      </header>

      <section className="paper-section">
        <div className="paper-section-heading">
          <span>研究问题 / 01</span>
          <div>
            <h2>观察到的收益，究竟来自运气还是技能？</h2>
            <p>
              论文把每个钱包视作一个主动管理的投资组合，在剔除 Bitcoin 系统性暴露后，检验横截面 alpha 是否超出纯粹运气能够产生的范围；并进一步追问，技能是否集中于某一类交易者。
            </p>
          </div>
        </div>

        <div className="key-result">
          <div className="result-number">
            <strong>15.4%</strong>
            <span>Full-sample FDR π+</span>
          </div>
          <div className="result-copy">
            <h3>全样本中，约六分之一的钱包被归因于真正的正 alpha。</h3>
            <p>
              在主要的 Harvey–Liu 设定下，横截面第 95 百分位的实际 t-statistic 为 3.822，而 null mean 为 2.062；1,000 次模拟中没有一次达到实际值，右尾 p-value 小于 0.001。
            </p>
          </div>
        </div>

        <div className="result-figures" aria-label="论文核心结果图">
          <figure className="result-figure result-figure-wide">
            <figcaption>
              <span>FIG. 01 / SKILL BEYOND LUCK</span>
              <strong>实际尾部表现明显超出“只有运气”的模拟世界</strong>
            </figcaption>
            <div className="figure-bars">
              <Metric label="实际样本 · 95th t-statistic" value="3.822" width="91%" />
              <div className="null-line">
                <Metric label="Null simulations · mean" value="2.062" width="49%" />
              </div>
            </div>
            <p>
              1,000 次 Harvey–Liu 模拟中，没有一次达到实际值，右尾 p-value &lt; 0.001。结论不是“有人赚钱”，而是赢家尾部强到不能由随机波动充分解释。
            </p>
          </figure>

          <figure className="result-figure">
            <figcaption>
              <span>FIG. 02 / WHO HAS ALPHA</span>
              <strong>技能集中在方向型交易者，而非最高频的钱包</strong>
            </figcaption>
            <div className="figure-bars compact-bars">
              <Metric label="Directional · 正 t-statistic" value="65.2%" width="65.2%" />
              <Metric label="HFT · 正 t-statistic" value="27.9%" width="27.9%" />
              <Metric label="Directional · 真正正 alpha" value="17.6%" width="17.6%" />
              <Metric label="HFT · 真正正 alpha" value="3.8%" width="3.8%" />
            </div>
            <p>方向组中位 t-statistic 为 0.751；HFT 组为 −0.813。去除费用后，HFT 中位数仍为 −0.769。</p>
          </figure>

          <figure className="result-figure">
            <figcaption>
              <span>FIG. 03 / MARKET STRUCTURE</span>
              <strong>少量自动化钱包占据绝大部分市场活动</strong>
            </figcaption>
            <div className="figure-bars compact-bars">
              <Metric label="钱包数量" value="10.3%" width="10.3%" />
              <Metric label="成交名义金额" value="81.2%" width="81.2%" />
              <Metric label="Order-book fills" value="96.1%" width="96.1%" />
            </div>
            <p>活跃度与技能不能画等号。HFT / Automated MM 主导流动性与成交，但其可观测交易收益并未表现出同等优势。</p>
          </figure>
        </div>
      </section>

      <section className="paper-section">
        <div className="paper-section-heading">
          <span>行为异质性 / 02</span>
          <div>
            <h2>最活跃，不等于最有技能。</h2>
            <p>
              18 个纯行为特征经 quantile transformation 与 PCA 后进入 K-means。最终得到 8 类行为类型，再聚合为高频组与方向组；分类过程中不使用 PnL、胜率或其他绩效变量。
            </p>
          </div>
        </div>

        <div className="taxonomy-strip" aria-label="行为分类流程">
          <div><strong>18</strong><span>行为特征</span></div>
          <i aria-hidden="true">→</i>
          <div><strong>7</strong><span>PCA components · 89.0%</span></div>
          <i aria-hidden="true">→</i>
          <div><strong>8</strong><span>K-means clusters</span></div>
          <i aria-hidden="true">→</i>
          <div><strong>2</strong><span>经济行为组</span></div>
        </div>
        <div className="analysis-note">
          <span>识别原则</span>
          <p>
            聚类只使用持仓时间、交易节奏、对冲暴露等行为变量，不让 PnL、胜率或 alpha 参与分类；因此后续的绩效差异不是由分组时预先“挑选赢家”造成。
          </p>
          <p>
            67,232 个钱包被识别为 HFT / Automated MM，其短持仓、高 burst activity 与高 hedged exposure 形成一致的 market-making 行为画像；其余 586,678 个钱包归入方向型交易组。
          </p>
        </div>
      </section>

      <section className="paper-section">
        <div className="paper-section-heading">
          <span>研究设计 / 03</span>
          <div>
            <h2>从原始链上成交，到可检验的技能分布。</h2>
          </div>
        </div>

        <div className="methods-list">
          <div className="method-row">
            <h3>数据重建</h3>
            <p>通过 Polymarket Gamma API 获取市场元数据，并使用完整 OrderFilled 事件重建交易；样本覆盖 148,131 个 markets 与 121,498 个 events。</p>
          </div>
          <div className="method-row">
            <h3>钱包级 PnL</h3>
            <p>合并成交、区块价格与结算事件，建立含费用和不含费用的双重账本；再以 capital at risk 构造日收益，避免日内平仓钱包出现退化分母。</p>
          </div>
          <div className="method-row">
            <h3>行为聚类</h3>
            <p>使用 18 个行为特征，PCA 的 7 个主成分保留 89.0% 方差，K-means 取 K=8；bootstrap Jaccard 为 0.847。</p>
          </div>
          <div className="method-row">
            <h3>风险调整</h3>
            <p>将钱包作为主动组合，使用 BTC return 作为系统性因子，估计 alpha 及其 t-statistic；绩效信息不参与交易者分类。</p>
          </div>
          <div className="method-row">
            <h3>Luck vs. Skill</h3>
            <p>并列使用 KTWW、Fama–French joint calendar resampling 与 calibrated Harvey–Liu thresholding。主要设定执行 1,000 次 bootstrap，并以第 95 百分位作为预先指定的核心统计量。</p>
          </div>
        </div>
      </section>

      <section className="paper-section">
        <div className="paper-section-heading">
          <span>解释边界 / 04</span>
          <div>
            <h2>结果有证据，也有边界。</h2>
            <p>这些限制不是脚注，而是解读结论时不可缺少的一部分。</p>
          </div>
        </div>
        <div className="limitations">
          <article className="limitation-card">
            <span>01</span>
            <h3>Maker rebates 不可观测</h3>
            <p>Liquidity Rewards 在链下发放，不出现在 OrderFilled 记录中，可能是高频组表面亏损的一种解释。</p>
          </article>
          <article className="limitation-card">
            <span>02</span>
            <h3>存在不等于持续</h3>
            <p>研究识别的是样本期内的技能存在性，并未证明 alpha 可以跨时期持续。</p>
          </article>
          <article className="limitation-card">
            <span>03</span>
            <h3>因子与制度边界</h3>
            <p>钱包可能具有非线性风险暴露；同时样本处于低 taker fees 时期，后续参与度和费用机制已经变化。</p>
          </article>
        </div>
      </section>

      <section className="paper-cta">
        <h2>查看完整论文与可复核代码。</h2>
        <div className="paper-cta-links">
          <a href={`${basePath}/2026-RP-FinTech.pdf`} target="_blank" rel="noreferrer">
            <Download /> 阅读完整论文
          </a>
          <a href="https://github.com/sethlu-lusiyu/research-project-2026" target="_blank" rel="noreferrer">
            <Code2 /> 查看研究代码
          </a>
        </div>
      </section>
    </main>
  );
}
