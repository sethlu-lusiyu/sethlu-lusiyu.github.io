# 卢思宇项目集

一个以研究、交易、数据与系统为主题的个人项目入口。站点使用中文为主，并为专业术语保留英文表达。

## 本地运行

```bash
npm install
npm run dev
```

访问 `http://localhost:3000/`。

## 验证

```bash
npm run typecheck
npm run lint
npm run build
```

## 部署到 GitHub Pages

1. 在 GitHub 创建名为 `sethlu-lusiyu.github.io` 的仓库。这是 GitHub 用户主页的标准仓库名，比 `researchandtrading` 更适合入口网站。
2. 将此目录推送到仓库的 `main` 分支。
3. 打开仓库 `Settings → Pages`，将 Source 设为 `GitHub Actions`。
4. 工作流完成后访问 `https://sethlu-lusiyu.github.io/`。

如果坚持使用普通仓库名 `researchandtrading`，则需要为 GitHub Pages 子路径额外配置构建路径；作为个人项目总入口，更推荐上述用户主页仓库名。

## 内容入口

- 首页：`app/page.tsx`
- 样式：`app/globals.css`
- Polymarket 论文页：`app/projects/polymarket/page.tsx`
- GitHub Pages 工作流：`.github/workflows/deploy.yml`
- 静态资源与论文 PDF：`public/`
