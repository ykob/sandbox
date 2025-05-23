import 'dotenv/config';

const {
  CONFLUENCE_BASE_URL,
  CONFLUENCE_EMAIL,
  CONFLUENCE_API_TOKEN,
} = process.env;

if (!CONFLUENCE_BASE_URL || !CONFLUENCE_EMAIL || !CONFLUENCE_API_TOKEN) {
  throw new Error('環境変数が不足しています。 .env ファイルを確認してください。');
}

const API_ENDPOINT = `${CONFLUENCE_BASE_URL}/wiki/api/v2/spaces`;
const authString = Buffer.from(`${CONFLUENCE_EMAIL}:${CONFLUENCE_API_TOKEN}`).toString('base64');
const params = new URLSearchParams({
  type: 'personal',
});

const getPersonalSpaces = async () => {
  await fetch(`${API_ENDPOINT}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Accept': 'application/json'
    },

  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

getPersonalSpaces();
