import App from './components/app/app';
import './global.css';
import rsLogo from './assets/rss-logo.svg';

const app = new App();
app.start();

const rsImg = document.getElementById('rs-logo') as HTMLImageElement;
if (rsImg) {
    rsImg.src = rsLogo;
}
