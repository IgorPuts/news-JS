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

    public getNewsById(sourceId: string, callback: NewsCallback): void {
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
}

export default AppController;
