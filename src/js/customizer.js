export default class Customizer {
    constructor () {
        this.btnblock = document.createElement('div');
        this.colorPicker = document.createElement('input');

        this.btnblock.addEventListener('click', (e) => this.onScaleChange(e));
        this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    }

    onScaleChange(e) {
        let scale;
        const body = document.querySelector('body');
        if (e.target.value) {
            scale = +e.target.value.replace(/x/g, "");
        }

        function recursy(element) {
            element.childNodes.forEach(node => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, "").length > 0) {

                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', value.replace(/px/g, ""));
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + "px";
                    }
                    else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + "px";
                    }
                }
                else {
                    recursy(node);
                }
            })
        }

        recursy(body);

    }

    onColorChange(e) {
        const body = document.querySelector('body');
        body.style.backgroundColor = e.target.value;
        console.log(e.target.value);
    }

    render () {
        let scaleInputSmall = document.createElement('input'),
            scaleInputMiddle = document.createElement('input'),
            panel = document.createElement('div');

        panel.append(this.btnblock, this.colorPicker);

        scaleInputSmall.classList.add('scale_btn');
        scaleInputMiddle.classList.add('scale_btn');
        this.btnblock.classList.add('scale');
        this.colorPicker.classList.add('color');

        scaleInputSmall.setAttribute('type', 'button');
        scaleInputSmall.setAttribute('value', '1x');
        scaleInputMiddle.setAttribute('type', 'button');
        scaleInputMiddle.setAttribute('value', '1.5x');
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');

        this.btnblock.append(scaleInputSmall, scaleInputMiddle);

        panel.classList.add('panel');

        document.querySelector('body').append(panel);

    }
}