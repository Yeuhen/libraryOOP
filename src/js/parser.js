export default function parser() {
    const body = document.querySelector('body');
    let srcNodes = [];

    function recursy (element) {
        element.childNodes.forEach(node => {
            if(node.nodeName.match("IMG")) {
                const obj = {
                    header: node.nodeName,
                    content: node.src
                }
                srcNodes.push(obj);
            } else {
                recursy(node);
            }
        })
    }
    recursy(body);

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(srcNodes)
    })
    .then(response => response.json())
    .then(json => console.log(json));
}