# TypeScript project for sending excel and csv attach by AWS SES

## Tools
### 1. TypeScript  
套件mimemessages沒有宣告TypeScript定義在@types  
故在 tsconfig.json 定義 baseUrl & path
```json
{
 "compilerOptions": {
   "baseUrl": "./src",
   "paths": {
     "*": ["types/*"]
   }
 }
}
```
在types資料夾下新增mimemessages資料夾，再新增index.d.ts檔案，宣告該套件的方法型別

來源：  
TypeScript 新手指南  
https://willh.gitbook.io/typescript-tutorial/basics/declaration-files

### 2. node-ses & mimemessages
信件需要符合MIME格式
資料轉成xlsx/csv的Buffer格式，再以base64編碼成附件
傳送附件要使用sendRawEmail方法

MIME content-type列表：
https://www.runoob.com/http/mime-types.html

Sending formatted emails using mimemessage in Nodejs
https://medium.com/@sanket.shivam/sending-formatted-emails-using-mimemessage-in-nodejs-aed526e49ada

### 3. jest
測試信件內容和附件是否正確
```terminal
npm install -D ts-jest @types/jest
npx ts-jest config:init
```

package.json加上
```json
{
  "scripts": {
    "test": "jest --coverage"
  }
}

```

參考：  
Jest + TypeScript 建置測試環境  
https://titangene.github.io/article/jest-typescript.html


## AWS SES(Simple Email Service)
1. IAM role
創立IAM role，給予SES權限(AmazonSESFullAccess)，將id & secret key放入環境變數（不是放SMTP的設定，secret key長度是40非44）

2. AWS SES
開通一個新的SES服務，驗證信箱，即可發信和收信

3. 備註
AWS SES附件大小限制10MB
默認是沙盒模式，需要驗證信箱才能發信
驗證Domain後可發信給同Domain的任何人
production模式需要額外驗證


## SMTP
是email sending協議(send mail to people)    
依照協議規範把信件給SMTP server  
搭配POP協議、IMAP協議讓client端接收信件


## MIME格式
MIME全名Multipurpose Internet Mail Extensions，即多用途網際網路郵件擴展
傳統寫法全部小寫
分為headers(From, To, Subject, content-type, content-transfer-encoding) & body(信件內容)

content-type:
通用結構type/subtype，包含文本、圖像、音頻、視頻等多種數據格式，例如text/html、image/jpeg、audio/mpeg
multipart/mixed定義郵件可以放入多用途的內容，例如文字、附件、圖片等
content-transfer-encoding: 設定base64，告訴接收端如何解碼郵件內容


參考：  
設定 AWS SES identity  
https://cadaam.medium.com/aws-ses-identity-%E8%A8%AD%E5%AE%9A-91ee980aff6e

MIME 郵件標準  
https://www.tsnien.idv.tw/Security_WebBook/chap9/9-3%20MIME%20%E9%83%B5%E4%BB%B6%E6%A8%99%E6%BA%96.html
