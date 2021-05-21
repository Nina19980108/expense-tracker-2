# 老爸的私房錢

一個使用 Node.js + Express 打造的餐廳美食網站，並透過 mongodb 資料庫取得資料，可以在首頁看到所有的支出，還有支出的總和。
可以選擇不同的類別，單讀只看一個類別的支出總和。可以編輯、新增、刪除支出。

## 專案畫面

![image](https://raw.githubusercontent.com/Nina19980108/expense-tracker/master/public/mainPage.png)

## Features - 產品功能

1. 使用者可以修改一項支出的詳細資訊。
2. 使用者可以新增一項支出。
3. 使用者可以以不同的類別顯示支出總和。
4. 使用者可以刪除一項支出。

## Environment SetUp - 環境建置

1. [MongoDB v4.0 以上](https://www.mongodb.com/download-center/community)
2. [Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/Nina19980108/expense-tracker.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 安裝 nodemon 套件

```
在 Terminal 輸入 nodemon app.js 指令
```

5. 匯入種子檔案

```
執行 npm run seed
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫。

```
mongodb connected!
insert category done!
category datebase close!

mongodb connected!
insert expenses done!
record datebase close!
```

6. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
App is on http://localhost:3000
```

## Contributor - 專案開發人員

> [Nina Liu](https://github.com/Nina19980108)