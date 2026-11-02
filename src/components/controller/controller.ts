import AppLoader from './appLoader';
import { ISourcesResponse, IArticlesResponse } from '../../types';

// Создаем тип для callback-функций
type SourcesCallback = (data: ISourcesResponse) => void;
type NewsCallback = (data: IArticlesResponse) => void;

class AppController extends AppLoader {
  // Типизируем метод getSources
  public getSources(callback: SourcesCallback): void {
    super.getResp<ISourcesResponse>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  // Типизируем метод getNews, который работает с MouseEvent
  public getNews(e: MouseEvent, callback: NewsCallback): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    // Проверяем, что target существует, чтобы strict mode не ругался
    while (target && target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');

        // Проверяем, что sourceId не null
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);

          super.getResp<IArticlesResponse>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      // Приводим тип parentNode к HTMLElement
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;