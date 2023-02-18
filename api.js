import dotenv from 'dotenv';
const { NODE_ENV } = process.env;

NODE_ENV === 'development'
  ? dotenv.config(({ path: './env/.env.development' }))
  : dotenv.config(({ path: './env/.env.production' }));

export const getHistory = (view_at) => fetch(`https://api.bilibili.com/x/web-interface/history/cursor?view_at=${view_at}`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "cookie": process.env.BILI_COOKIE || '',
    "Referer": "https://www.bilibili.com/account/history?spm_id_from=666.4.0.0",
    "Referrer-Policy": "no-referrer-when-downgrade"
  },
  "body": null,
  "method": "GET"
}).then(res => res.json());