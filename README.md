# Quiz

## E2E Test Case(now auto sorry)

- [] use playWrite maybe cool(todo)

1. Enter correct code
Enter verification code : 6666

2. Enter wrong code
Enter verification code : 4213

3. Click Logout button

4. Reload page

## Page Design

1. Profile Page
    ![profile.png](profile.png)

2. Otp Page
   ![otp.png](otp.png)

## Requirement
1. if user not authenticated, should redirect to verification page
2. if user authenticated, should redirect to profile page

## Verification Page
- [x] should have 4 digit inputs
- [x] should focus on first input when page loaded
- [x] should focus on next input when user enter a digit 
- [x] should focus on previous input when user press backspace
- [x] should auto submit when user enter 4 digits
- [x] should show error message when user enter wrong code
- [x] should show loading when user submit code
- [x] should redirect to profile page when user submit correct code
- [x] able to paste code from clipboard
- [x] input should be numeric only
- [x] each input should be 1 numeric only

## Profile Page
- [x] should show username, quote , user photo and logout button
- [x] should remove token and redirect to verification page when user click logout button
- [x] should not log out user when user refresh page

## Mock API Documentation

### Overview
This document provides detailed specifications and usage guidelines for the `/api/verify` and `/api/auth` endpoints.


Used the Nitro server to write mock APIs, which can be removed in the Nuxt config for production environments if needed.
---

### 1. Verification API - POST /api/verify

#### Request Body:

| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| code      | string | The verification code.   |

#### Example Request:

```json
{
    "code": "12345"
}
```

#### Response:
Returns whether the verification code is valid. If valid, a token is also provided.

#### Example Response (valid code):
```json
{
    "valid": true,
    "token": "example_token"
}
```
#### Example Response (invalid code):
```json
{
    "valid": false
}
```

### 2. Authorization API - GET /api/auth

#### Request Headers:

| Header Name   | Value  | Description                         |
|---------------|--------|-------------------------------------|
| Authorization | string | The token received from /api/verify |

#### Response:
If authorized, the response will contain the username,quote and photo. Otherwise, an error message will be provided.
If valid, a token is also provided.

#### Example Response (Authorized):
When valid:
```json
{
  "username": "johnDoe",
  "quote": "Hello, World!",
  "photo": "https://example.com/image.jpg"
}
```
#### Example Response (Unauthorized):
```json
{
    "message": "unauthorized"
}
```

## 環境
- node 版本 : `18.18.0`
- yarn 版本 : `1.22.19`
- 編輯器 : `VSCode`
- 作業系統 : MacOS Sonoma 14.5

## VSCode 套件
- [VS Code](https://code.visualstudio.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Vue 3 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)

## 啟動指令
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

## GitHub 設定
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

## 開發步驟
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


## 開發規範

## 框架
- Nuxt 3 + Composition API + `<script setup lang="ts">`
- TypeScript
- Tailwind CSS
- Nuxt CLI

## 套件
- [pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)
- [Nuxt Icon](https://github.com/nuxt/icon)

## 規範
- [ESLint Standard](https://standardjs.com/readme-zhtw.html)
- [ESLint Tailwind](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [ESLint Vue3](https://eslint.vuejs.org/rules/)
- [ESLint Nuxt3](https://github.com/nuxt/eslint-plugin-nuxt)
- [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [Nuxt 3 架構參考](https://nuxt.com/docs/guide/directory-structure/app)


## Issues
- 填寫標題、說明和標籤類型
- 指派至少一名負責人
- 建立分支
  - 右下角點擊 `Create a branch`
  - Master 分支改動 : `feature/#${issue_number}-${description}`
  - 特定 Release 分支改動 : `feature/${主版號}.${次版號}-#${issue_number}-${description}`

## Commits
- 只開發對應 Issue 的內容，不相關的內容請另開 Issue
- 複雜邏輯應適當註解
- 定期同步主分支
  - Master 分支為主分支 : `git merge master --no-ff` 
  - 特定 Release 分支為主分支 : `git merge release/${主版號}.${次版號} --no-ff` 
- 通過 `commitlint` 檢查
