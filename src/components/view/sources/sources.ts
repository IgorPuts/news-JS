import './sources.css';
import { ISourceDetails } from '../../../types';

class Sources {
  // Принимает массив источников
  public draw(data: ISourceDetails[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    if (!sourceItemTemp) return; // Защита от null

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const name = sourceClone.querySelector('.source__item-name');
      if (name) name.textContent = item.name;

      const sourceItem = sourceClone.querySelector('.source__item');
      if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sourcesContainer = document.querySelector('.sources');
    if (sourcesContainer) {
      sourcesContainer.append(fragment);
    }
  }
}

export default Sources;