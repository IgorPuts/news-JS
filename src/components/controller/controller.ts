import AppLoader from './appLoader';
import { ISourcesResponse, IArticlesResponse } from '../../types';

enum Endpoints {
  Sources = 'sources',
  Everything = 'everything',
}

type SourcesCallback = (data: ISourcesResponse) => void;
type NewsCallback = (data: IArticlesResponse) => void;

class AppController extends AppLoader {
  public getSources(callback: SourcesCallback): void {
    super.getResp<ISourcesResponse>(
      {
        endpoint: Endpoints.Sources,
      },
      callback
    );
  }

  public getNews(e: MouseEvent, callback: NewsCallback): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target && target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');

        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);

          super.getResp<IArticlesResponse>(
            {
              endpoint: Endpoints.Everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;