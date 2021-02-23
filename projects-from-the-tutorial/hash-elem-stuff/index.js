window.addEventListener('click', handleClick);
doHashThing();

function handleClick (e) {
    const elem = getHashElem();

    if (elem === e.target || !elem) {
        return;
    }

    const newUrl = window.location.href.replace(/#.*$/, '');
    const y = window.pageYOffset;
    const x = window.pageXOffset;

    /**
     * Since the three below operations happen synchronously,
     * there is no flickering when we try to scroll the page.
     *
     * Warning! Gotta also do window.location.hash = ''; because otherwise the browser
     * won't remove the styles from the :target CSS pseudo class ( used in ./index.html ).
     */
    window.location.hash = '';
    window.history.replaceState(null, '', newUrl);
    window.scrollTo(x, y);
}

function doHashThing() {
    const elem = getHashElem();
    if (!elem) {
        return;
    }

    setTimeout(() => {
        elem.scrollIntoView();
    });

}

function getHashElem() {
    const hash = window.location.hash;

    if (!hash) {
        return null;
    }

    const id = hash.slice(1);
    const elem = document.getElementById(id);

    return elem || null;
}
