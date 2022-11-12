import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';

//Import css
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = ' ';


import Logo from '../images/logo.png';
import Letter from '../images/letter-j.png';

window.addEventListener('load', function () {
  document.getElementById('logo').src = Logo;
  document.getElementById('letter-j').src = Letter;
});



const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('./service-worker.js');
  workboxSW.register();
  console.log('Service worker registered');
} else {
  console.error('Service workers are not supported in this browser.');
}