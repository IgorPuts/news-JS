import AppController from '../controller/controller';
import { AppView } from '../view/appView';

enum Endpoints {
  Sources = 'sources',
  Everything = 'everything',
}

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesElement = document.querySelector('.sources');

    if (sourcesElement) {
      sourcesElement.addEventListener('click', (e: Event) => {
        this.controller.getNews(e as MouseEvent, (data) => this.view.drawNews(data));
      });
    }

    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
