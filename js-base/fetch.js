function parseIterator(it, allowed) {
    return [...it]
        .filter(([key, value]) => allowed.indexOf(key) !== -1)
        .reduce((a, [key, value]) => Object.assign(a, { [key]: value }), {});
}

async function download(link) {
    console.groupCollapsed(`download: ${link}`);
    console.time();
    link = new URL(link);
    console.debug(link);
    let tpl = /<title>(.*?)<\/title>/;
    if (link.protocol !== 'https:') console.warn(`link is not secure!`);
    const response = await fetch(link, { mode: 'no-cors', redirect: 'follow' });
    console.info(`response: ${response.status} ${response.statusText}`);
    console.debug(response);
    console.table(parseIterator(response.headers.entries(), ['content-type', 'content-length', 'last-modified', 'expires']));
    if (response.redirected) {
        console.warn(`response was redirected`);
    }
    if (!response.ok || response.headers.get('Content-Type').indexOf('text/html') === -1) {
	console.debug(response.ok, response.headers.get('Content-Type'))
        console.timeEnd();
        console.groupEnd();
        throw Error(`can not fetch url "${link}"!`);
    }

    let text = await response.text();
    console.info(`loaded text length: ${text.length}`);
    let title = text.match(tpl)[1];

    console.timeEnd();
    console.groupEnd();

    return title;
}

const getCurrentURI = () => location.origin + location.pathname;

const getFormTitle = () => download(getCurrentURI())
    .then(title => console.log(`Page title = ${title}`))
    .catch(err => console.error(err));
