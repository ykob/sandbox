import 'dotenv/config';

const {
  CONFLUENCE_BASE_URL,
  CONFLUENCE_EMAIL,
  CONFLUENCE_API_TOKEN,
  CONFLUENCE_SPACE_KEY
} = process.env;

if (!CONFLUENCE_BASE_URL || !CONFLUENCE_EMAIL || !CONFLUENCE_API_TOKEN || !CONFLUENCE_SPACE_KEY) {
  throw new Error('環境変数が不足しています。 .env ファイルを確認してください。');
}

const API_ENDPOINT = `${CONFLUENCE_BASE_URL}/wiki/api/v2/blogposts`;
const authString = Buffer.from(`${CONFLUENCE_EMAIL}:${CONFLUENCE_API_TOKEN}`).toString('base64');

interface ConfluenceResponse {
  _links: {
    webui: string;
  };
}

async function createBlogPost(): Promise<void> {
  const blogPostData = {
    type: 'blogpost',
    title: 'TypeScriptとdotenvで投稿したブログ',
    space: {
      key: CONFLUENCE_SPACE_KEY
    },
    spaceId: 46366823,
    body: {
      storage: {
        value: '<p>これはTypeScriptで投稿したConfluenceブログです。</p>',
        representation: 'storage'
      }
    }
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogPostData)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    }

    const data: ConfluenceResponse = await response.json();
    console.log('✅ ブログが正常に投稿されました:');
    console.log(`URL: ${CONFLUENCE_BASE_URL}${data._links.webui}`);
  } catch (error) {
    console.error('❌ エラーが発生しました:', (error as Error).message);
  }
}

createBlogPost();
