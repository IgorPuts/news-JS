import News from './news/news';
import Sources from './sources/sources';
import { IArticlesResponse, ISourcesResponse, SourceCategory } from '../../types';

export class AppView {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IArticlesResponse, sourceName: string = 'all sources'): void {
        const values = data?.articles ? data.articles : [];

        const newsTitle = document.querySelector('.news-title');
        if (newsTitle) {
            newsTitle.textContent = `News from ${sourceName}`;
        }

        this.news.draw(values);
    }

    public drawSources(data: ISourcesResponse, category: SourceCategory, pinnedSources: Set<string>): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values, category, pinnedSources);
    }
}

export default AppView;
