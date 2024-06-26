import dayjs from 'dayjs';
import { appendFile, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EOL } from 'os';
import { getHistory } from './api.js';
import { fileIsExist, padTimestamp } from './util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const historyFileName = join(
  __dirname,
  'history',
  dayjs().format('YYYY-MM-DD')
);
const file = await fileIsExist(historyFileName + '.txt');
if (file) {
  await unlink(historyFileName + '.txt');
}
await writeFile(historyFileName + '.txt', '');

const vedioBaseUrl = 'https://www.bilibili.com/video/';
const readBaseUrl = 'https://www.bilibili.com/read/cv';

const now = new Date().getTime();
const lastDay = new Date('2024-05-23:00:00:00').getTime();
// const lastDay = '';

let history;
let view_at;
let page = 1;

let list = [];

await (async function historyTo(time, lastDay = '') {
  history = await getHistory(time);
  view_at = history.data.cursor.view_at;
  list.push(...history.data.list);
  const res = history.data.list.map((item) => {
    if (item.history?.bvid) {
      return `${vedioBaseUrl}${item.history.bvid} | ${item.title}`;
    } else if (item.history?.cid) {
      return `${readBaseUrl}${item.history.cid} | ${item.title}`;
    } else {
      return;
    }
  });
  await appendFile(historyFileName + '.txt', res.join(EOL) + EOL);
  page++;
  console.log('page: ', page);
  console.log(history.data);
  if (history.data.list.length) {
    if (padTimestamp(view_at) < lastDay) return;
    await historyTo(view_at, lastDay);
  } else {
    return;
  }
})(now, lastDay);
await writeFile(historyFileName + '.json', JSON.stringify(list, null, 2));
