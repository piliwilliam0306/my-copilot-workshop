![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以純前端技術實作，提供待辦事項管理、篩選、主題切換與資料保存功能，並透過瀏覽器即可離線使用。

## 線上展示

https://piliwilliam0306.github.io/my-copilot-workshop/

> 請將上方網址替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，空白內容不會新增。
- 勾選或取消勾選待辦事項，完成項目會顯示刪除線並淡化。
- 刪除單筆待辦事項。
- 顯示整體未完成項目數量。
- 依照「全部」、「未完成」或「已完成」篩選清單。
- 篩選結果為空時顯示對應提示，並提醒使用者可切換回「全部」。
- 切換淺色與深色模式。
- 使用者手動選擇的主題會被記住；未手動選擇時跟隨作業系統的深淺色設定。
- 清除所有已完成項目，執行前會跳出瀏覽器確認對話框。
- 沒有已完成項目時隱藏「清除已完成」按鈕。
- 使用 `localStorage` 保存待辦資料與主題偏好，重新整理後資料仍然保留。
- 具備置中卡片式版面與手機螢幕 RWD 支援。

## 技術

- 使用 HTML、CSS 與原生 JavaScript。
- 不使用 React、Vue、jQuery、Bootstrap、Tailwind 等框架或套件。
- 不建立 `package.json`，不需要建置流程。
- 不引用外部 CDN，可離線開啟與使用。
- 使用 CSS 變數管理淺色與深色主題配色。
- 使用 `localStorage` 保存待辦資料與使用者的主題偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode，根據功能需求建立並修改 `index.html`、`styles.css` 與 `app.js`。
- 使用 MCP 查詢 Microsoft Learn 官方文件，參考 `prefers-color-scheme` 與網頁色彩對比的無障礙建議。
- 使用 GitHub MCP 讀取 repository issue，依照 issue 描述整理計畫、修改程式並建立 Pull Request。
- 使用 `.github/copilot-instructions.md` 定義專案技術限制、程式風格與協作規則。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義從讀取 issue、等待確認、建立分支、修改、驗證到建立 Pull Request 的 agentic workflow。

## 我學到什麼

- 需求描述越清楚，Agent Mode 越能在正確的檔案與範圍內完成工作。
- MCP 能讓 Copilot 讀取官方文件與 GitHub issue，提供比本機程式碼更多的工作脈絡。
- 將專案規範寫進 `copilot-instructions.md`，可以讓後續修改維持一致的技術與程式風格。
- 將修復 issue 的步驟寫成 prompt，可以把重複的開發流程整理成可再次執行的工作方式。
- 瀏覽器實際操作與重新整理驗證很重要，能確認畫面行為、資料保存與使用者流程都符合預期。
