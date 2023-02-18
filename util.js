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
