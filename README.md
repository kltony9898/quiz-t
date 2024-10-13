# （專案名稱）

## 專案資訊

### 資源
- 流程圖：（專案負責人自行填寫）
- 設計稿：（專案負責人自行填寫）
- 後端文件：（專案負責人自行填寫）
- Slack：（專案負責人自行填寫）
- Asana：（專案負責人自行填寫）

### 環境
- node 版本 : `18.18.0`
- yarn 版本 : `1.22.19`
- 編輯器 : `VSCode`

### VSCode 套件
- [VS Code](https://code.visualstudio.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Vue 3 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)

### 啟動指令
```
yarn install // 安裝套件
yarn dev // 啟動專案
yarn dev:gh-pages // 啟動專案（GitHub Pages 模式）
yarn build // 使用 CSR 或 SSR 模式打包專案
yarn build:gh-pages // 使用 CSR 或 SSR 模式打包專案（GitHub Pages 模式）
yarn generate // 使用 SSG 模式打包專案
yarn generate:gh-pages // 使用 SSG 模式打包專案（GitHub Pages 模式）
yarn preview // 啟動打包後專案
yarn preview:gh-pages // 啟動打包後專案（GitHub Pages 模式）
yarn eslint // 檢查 eslint 規則
yarn typelint // 檢查 typelint 規則
```

## 專案建立步驟

### GitHub 設定
- General
  - Pull Requests
    - Allow squash merging : `Default to pull request title and commit details`
- Branches
  - Branch protection rules
    - Branch name pattern : `master`
    - Require a pull request before merging
      - Require approvals : `1`
      - Require review from Code Owners : `true`
      - Dismiss stale pull request approvals when new commits are pushed : `true`
- Pages
  - Build and deployment
    - Branch : `gh-pages`

### 開發步驟
- 建立 `feature/#1-basic` 分支
  - package.json
    - name : `${GitHub 專案名稱}`
  - .env.gh-pages
    - NUXT_APP_BASE_URL : `${GitHub 專案名稱}`
  - README.md
    - 填寫專案名稱及專案資訊
- 建立 `feature/#2-design` 分支（設計稿完成）
  - assets/icons
    - 下載設計稿圖示包
  - tailwind.config.ts
    - 設定設計稿變數
  - components
    - 根據設計稿拆分共用組件
    - 建立 `components` 檔案並備註組件內容
  - layouts
    - 根據設計稿圖規劃專案佈局
    - 建立 `layouts` 檔案並備註佈局內容
  - pages
    - 根據設計稿圖規劃頁面流程
    - 建立 `pages` 檔案並備註頁面內容
- 建立 `feature/#3-api` 分支（後端文件完成）
  - apis（待討論）
    - 根據後端文件建立 API 型別
    - 根據後端文件進行串接及業務邏輯封裝

### Slack 綁定
- 在 `#team-front-end-develop` 群組中輸入 `/github subscribe ${owner}/${repo}` 即可將進行綁定，未來群組成員可以收到 `issues`, `pulls`, `commits`, `releases`, `deployments` 相關的訊息。
- 若專案結束，輸入 `/github unsubscribe ${owner}/${repo}` 即可解除綁定。
- 若要綁定其他 Slack 群組，需要在該群組選項 `Integrations/Apps` 中新增 `Github`，並重複以上操作即可。

## 開發規範

### 框架
- Nuxt 3 + Composition API + `<script setup lang="ts">`
- TypeScript
- Tailwind CSS
- Nuxt CLI

### 套件
- [pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)
- [Nuxt Icon](https://github.com/nuxt/icon)

### 規範
- [ESLint Standard](https://standardjs.com/readme-zhtw.html)
- [ESLint Tailwind](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [ESLint Vue3](https://eslint.vuejs.org/rules/)
- [ESLint Nuxt3](https://github.com/nuxt/eslint-plugin-nuxt)
- [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [Nuxt 3 架構參考](https://nuxt.com/docs/guide/directory-structure/app)

## GitHub 流程

### 流程
- 預設使用 `GitHub Flow` 流程
- master：主要分支（開發環境）
- tag：部署版本（正式環境）
- 多環境情境
  - 建立其他分支代表特定環境（ex. 建立 produciton 分支代表正式環境）
  - 若需進行更新
    - 使用 `git merge master --no-ff` 的方式合併 master 分支改動
- 多版本維護情境
  - 建立 `release/${主版號}.${次版號}` 分支維護單一版本
  - 若需進行更新（適用所有版本）
    - 建立分支並合併至 master
    - 使用 `git cherry-pick` 的方式從 master 分支更新改動
  - 若需進行更新（僅適用此版本）
    - 建立分支並合併至 release

### Issues
- 填寫標題、說明和標籤類型
- 指派至少一名負責人
- 建立分支
  - 右下角點擊 `Create a branch`
  - Master 分支改動 : `feature/#${issue_number}-${description}`
  - 特定 Release 分支改動 : `feature/${主版號}.${次版號}-#${issue_number}-${description}`

### Commits
- 只開發對應 Issue 的內容，不相關的內容請另開 Issue
- 複雜邏輯應適當註解
- 定期同步主分支
  - Master 分支為主分支 : `git merge master --no-ff` 
  - 特定 Release 分支為主分支 : `git merge release/${主版號}.${次版號} --no-ff` 
- 通過 `commitlint` 檢查

### Pull Requests
- Author
  - 標題、功能說明和標籤類型填寫正確且清楚
  - 通過 CI 檢查
  - 填寫測試清單
  - 指派至少一名 Code Review 負責人
- Reviewer
  - 確認標題、功能說明和標籤類型填寫符合對應 Issue
  - 確認目標合併分支正確
  - 進行 Code Review 確認是否符合開發規範
  - 確認通過測試清單
  - 使用 `Squash and Merge` 模式合併
  - 確認通過 CI/CD 且成功合併及部署

### Releases
- Choose a tag
  - 版本號 : `v${主版號}.${次版號}.${修訂號}`
    - 主版號 : 不可相容的功能新增或修改
    - 次版號 : 可相容的功能新增或修改
    - 修訂號 : 可相容的功能問題修復
- Target
  - 選擇 `master` 或 `release`
- 填寫標題及改動說明
  - 可點擊 `Generate release notes` 自動產生