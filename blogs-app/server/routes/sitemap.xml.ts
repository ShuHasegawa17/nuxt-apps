import { serverQueryContent } from '#content/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export default defineEventHandler(async (event) => {
  // json
  // return {
  //   message: 'success',
  // };
  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: 'https://localhost:3000',
  });

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: 'monthly',
    });
  }
  sitemap.end();

  return streamToPromise(sitemap);
});
