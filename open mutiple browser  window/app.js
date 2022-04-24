// ==UserScript==
// @name         Open Mutiple Window
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Open multiple browser window
// @author       Piyush Sachan
// @match        https://www.google.com
// @match        https://www.github.com
// @match        https://piyush.sachan.me
// @grant        none
// @resource     bootstrapCSS https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css
// ==/UserScript==

(function() {
    'use strict';

    const __u = 'd50228e937e6ce13081e0953e6a';
    const template = `<div id="${__u}main" class="${__u}container-fluid">
<div class="${__u}row">
    <div class="${__u}col-sm-12 ${__u}bg-danger">
        <div class="${__u}container">
            <div class="${__u}row ${__u}dflex">
                <div class="${__u}col-sm-7">
                    <div class="${__u}input-group">
                        <span class="${__u}input-group-addon">URL</span>
                        <input readonly id="url${__u}" type="text" class="${__u}form-control" placeholder="Enter URL" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="${__u}col-sm-2">
                    <div class="${__u}input-group">
                        <span class="${__u}input-group-addon">Link</span>
                        <input readonly id="link${__u}" type="number" class="${__u}form-control" min="1" max="100" value="3"  aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="${__u}col-sm-2">
                    <button disabled id="open${__u}" class="${__u}btn ${__u}btn-primary ${__u}btn-block">Open</button>
                </div>
                <div class="${__u}col-sm-1">
                    <button disabled id="hide${__u}" class="${__u}btn ${__u}btn-default ${__u}pull-right">Hide</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

    document.querySelector("body").insertAdjacentHTML("beforebegin", template);

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.innerHTML = css;
        head.appendChild(style);
    }

    setTimeout(() => {

        //Default rows and columns
        const row = 2
        const col = 2

        const el = {
            input: {
                link: document.getElementById(`link${__u}`),
                url: document.getElementById(`url${__u}`)
            },
            button: {
                open: document.getElementById(`open${__u}`),
                hide: document.getElementById(`hide${__u}`),
            },
            id: {
                main: document.getElementById(`${__u}main`),
            }
        }

        // Default get current url
        el.input.url.value = window.location.href

        el.button.open.addEventListener("click", () => {

            let links = el.input.link.value
            let url = el.input.url.value

            const screenHeight = window.screen.height / row
            const screenWidth = window.screen.width / (links / col)

            for (let w = 1; w <= links; w++) window.open(url, `${w}::${url}`, `height=${screenHeight}, width=${screenWidth}`)

        })

        el.button.hide.addEventListener("click", () => {
            el.id.main.remove()
        })

        el.input.link.removeAttribute('readonly')
        el.input.url.removeAttribute('readonly')
        el.button.open.removeAttribute('disabled')
        el.button.hide.removeAttribute('disabled')

    }, 2000);

    addGlobalStyle(`.${__u}container-fluid *{ font-family: 'system-ui' !important }`);
    addGlobalStyle(`.${__u}container-fluid { z-index: 999999999 !important; background-color: beige !important; padding: 0.2rem !important; }`);
    addGlobalStyle(`.${__u}dflex { display: flex !important; justify-content: center !important; }`);
    addGlobalStyle(`.${__u}col-sm-7 { width: 40% !important; }`);
    addGlobalStyle(`#url${__u} { width: 90% !important; }`);
    addGlobalStyle(`#link${__u} { width: 25% !important; }`);
    addGlobalStyle(`.${__u}btn { margin-right: 1rem !important; border: none;color: white;margin-left: 2px;padding: 3px 12px;text-align: center;text-decoration: none;display: inline-block;font-size: 0.8rem;border-radius: 4px;}`);
    addGlobalStyle(`.${__u}btn:hover { cursor: pointer; box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19); } `);
    addGlobalStyle(`.${__u}btn-primary { background-color: #008CBA; }`);
    addGlobalStyle(`.${__u}btn-default { background-color: #e7e7e7; color: black; }`);

})();