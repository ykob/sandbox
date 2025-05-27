import 'dotenv/config';
import {
  CONFLUENCE_BASE_URL,
  CONFLUENCE_EMAIL,
  CONFLUENCE_API_TOKEN,
} from './env.js';

const API_ENDPOINT = `${CONFLUENCE_BASE_URL}/wiki/api/v2/spaces`;
const authString = Buffer.from(`${CONFLUENCE_EMAIL}:${CONFLUENCE_API_TOKEN}`).toString('base64');

const getPersonalSpaces = async () => {
  const params = new URLSearchParams({
    type: 'personal',
  });

  try {
    const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('❌ エラーが発生しました:', (error as Error).message);
  }
}

getPersonalSpaces();
