import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sethlu-lusiyu.github.io/'),
  title: {
    default: '卢思宇项目集｜研究 & 交易',
    template: '%s｜卢思宇项目集',
  },
  description: '卢思宇的研究、交易与数据项目集合。',
  authors: [{ name: '卢思宇' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '卢思宇项目集',
    title: '卢思宇项目集｜研究 & 交易',
    description: '从研究问题到可检验结果：卢思宇的研究、交易、数据与系统项目。',
    url: 'https://sethlu-lusiyu.github.io/',
    images: [
      {
        url: 'https://sethlu-lusiyu.github.io/og.png',
        width: 1792,
        height: 1024,
        alt: '卢思宇项目集：研究、交易、数据、系统',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '卢思宇项目集｜研究 & 交易',
    description: '从研究问题到可检验结果：卢思宇的研究、交易、数据与系统项目。',
    images: ['https://sethlu-lusiyu.github.io/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
