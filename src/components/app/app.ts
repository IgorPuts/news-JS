import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourcesResponse, SourceCategory } from '../../types';

class App {
    private controller: AppController;
    private view: AppView;
    private currentCategory: SourceCategory = 'all';
    private allSourcesData: ISourcesResponse | null = null;
    private pinnedSources: Set<string> = new Set();

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        this.controller.getSources((data) => {
            this.allSourcesData = data;
            this.view.drawSources(data, this.currentCategory, this.pinnedSources);
        });

        const categoriesContainer = document.querySelector('.categories');
        if (categoriesContainer) {
            categoriesContainer.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('category-btn')) {
                    document.querySelectorAll('.category-btn').forEach((btn) => btn.classList.remove('active'));
                    target.classList.add('active');

                    this.currentCategory = target.getAttribute('data-category') as SourceCategory;

                    if (this.allSourcesData) {
                        this.view.drawSources(this.allSourcesData, this.currentCategory, this.pinnedSources);
                    }
                }
            });
        }

        const searchInput = document.querySelector('#search-sources') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const sources = document.querySelectorAll('.source__item');

                sources.forEach((source) => {
                    const name = source.getAttribute('data-source-name')?.toLowerCase() || '';
                    if (name.includes(query)) {
                        (source as HTMLElement).style.display = 'flex';
                    } else {
                        (source as HTMLElement).style.display = 'none';
                    }
                });
            });
        }

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;

                if (target.classList.contains('source__star')) {
                    const sourceItem = target.closest('.source__item');
                    const sourceId = sourceItem?.getAttribute('data-source-id');

                    if (sourceId) {
                        if (this.pinnedSources.has(sourceId)) {
                            this.pinnedSources.delete(sourceId);
                            target.classList.remove('active');
                        } else {
                            this.pinnedSources.add(sourceId);
                            target.classList.add('active');
                        }

                        const pinnedBtn = document.querySelector('[data-category="pinned"]');
                        if (pinnedBtn) {
                            pinnedBtn.textContent = `★ Pinned - ${this.pinnedSources.size}`;
                        }
                    }
                    return;
                }

                const sourceItem = target.closest('.source__item');
                if (sourceItem) {
                    const sourceId = sourceItem.getAttribute('data-source-id');
                    const sourceName = sourceItem.getAttribute('data-source-name');

                    if (sourceId) {
                        this.controller.getNewsById(sourceId, (data) => {
                            this.view.drawNews(data, sourceName || '');
                        });
                    }
                }
            });
        }
    }
}

export default App;
