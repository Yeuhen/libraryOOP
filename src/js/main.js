import Customizer from './customizer';
import parser from './parser';

window.addEventListener('DOMContentLoaded', () => {
    const panel = new Customizer();
    panel.render();
    parser();
})