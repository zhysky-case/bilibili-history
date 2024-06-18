import { access } from 'node:fs/promises';

/**
 * @param {string} fileName
 */
export async function fileIsExist(fileName) {
  try {
    await access(fileName);
    return true;
  } catch (error) {
    return false;
  }
}




export function padTimestamp(timestamp) {
  const timestampString = timestamp.toString();
  const paddedTimestamp = timestampString.padEnd(13, '0');
  return paddedTimestamp;
}