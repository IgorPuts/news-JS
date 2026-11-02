import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    const apiUrl = process.env.API_URL ?? 'https://rss-news-api.onrender.com/';
    const apiKey = process.env.API_KEY ?? '';

    super(apiUrl, {
      apiKey: apiKey,
    });
  }
}

export default AppLoader;
