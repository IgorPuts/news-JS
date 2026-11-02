import './sources.css';
import { ISourceDetails, SourceCategory } from '../../../types';

class Sources {
    private container: HTMLElement | null;
    private countElement: HTMLElement | null;

    constructor() {
        this.container = document.querySelector('.sources');
        this.countElement = document.querySelector('.sources-count');
    }

    public draw(data: ISourceDetails[], currentCategory: SourceCategory, pinnedSources: Set<string>): void {
        if (!this.container) return;
        this.container.innerHTML = '';

        const fragment = document.createDocumentFragment();

        const filteredData = data.filter((item) => {
            if (currentCategory === 'all') return true;
            if (currentCategory === 'pinned') return pinnedSources.has(item.id);
            return item.category === currentCategory;
        });

        if (this.countElement) {
            this.countElement.textContent = `${filteredData.length} of ${data.length}`;
        }

        filteredData.forEach((item) => {
            const sourceClone = document.createElement('div');
            sourceClone.classList.add('source__item');

            const colorLine = document.createElement('div');
            colorLine.classList.add('source__color-line');
            colorLine.style.backgroundColor = this.getCategoryColor(item.category);

            const infoBlock = document.createElement('div');
            infoBlock.classList.add('source__info');

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('source__item-name');
            nameSpan.textContent = item.name;

            const descSpan = document.createElement('span');
            descSpan.classList.add('source__item-desc');
            descSpan.textContent = `${item.category} • ${item.country || 'Global'}`;

            infoBlock.append(nameSpan, descSpan);

            const starBtn = document.createElement('button');
            starBtn.classList.add('source__star');
            starBtn.textContent = '★';

            if (pinnedSources.has(item.id)) {
                starBtn.classList.add('active');
            }

            sourceClone.append(colorLine, infoBlock, starBtn);
            sourceClone.setAttribute('data-source-id', item.id);
            sourceClone.setAttribute('data-source-name', item.name);

            fragment.append(sourceClone);
        });

        this.container.append(fragment);
    }

    private getCategoryColor(category: string): string {
        const colors: Record<string, string> = {
            business: '#f39c12',
            technology: '#3498db',
            general: '#95a5a6',
            health: '#e74c3c',
            sports: '#2ecc71',
            science: '#9b59b6',
            entertainment: '#e84393',
        };
        return colors[category] || '#bdc3c7';
    }
}

export default Sources;
