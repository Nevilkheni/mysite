import { getFunctions, httpsCallable } from 'firebase/functions';
import { getApp } from 'firebase/app';

/**
 * Call the Cloud Function to send a custom reset email.
 * @param {string} email
 * @param {string} [redirectUrl]
 * @returns {Promise<object>} result data from function
 */
export async function sendCustomResetEmail(email, redirectUrl) {
  const functions = getFunctions(getApp());
  const fn = httpsCallable(functions, 'sendCustomReset');
  const res = await fn({ email, redirectUrl });
  return res.data;
}
