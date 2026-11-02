import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = 'https://rss-news-api.onrender.com/mocks/';
        const apiKey = '';

        super(apiUrl, {
            apiKey: apiKey,
        });
    }
}

export default AppLoader;
