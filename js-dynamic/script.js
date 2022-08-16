//debugger;

const $selectMethod = document.getElementById('method');
const $buttonAdd = document.getElementById('add-photo');
const $photos = document.querySelector('.photos');

const generatePhoto = index => ([`https://placehold.co/250?text=${index}`, `Image ${index}`]);

function clonePhoto($div, $img, $p) {
    return (image, title) => {
        //debugger;
        $img.src = image;
        $img.alt = title;
        $p.textContent = title;
        const $target = $div.cloneNode(true);
        const $close = $target.querySelector('button');
        $close.addEventListener('click', (e) => {
            e.stopPropagation();
            $target.remove();
        });
        return $target;
    };
}

function initCreatedPhoto() {
    const $div = document.createElement('div');
    const $img = document.createElement('img');
    const $p = document.createElement('p');
    const $btn = document.createElement('button');
    $btn.innerHTML = '<i class="icon-trash-can-solid"></i>';

    /*
    $div.innerHTML = '<button><i class="icon-trash-can-solid"></i></button><img src="" alt="" /><p></p>';
    const $btn = $div.querySelector('button');
    const $img = $div.querySelector('img');
    const $p = $div.querySelector('p');
    */

    $img.src = 'https://placehold.co/250?text=EMPTY';
    $img.alt = '';
    $p.textContent = '';

    $div.append($btn, $img, $p);

    return clonePhoto($div, $img, $p);
}

function initFirstPhoto($container) {
    const $div = $container.querySelector('div');
    const $img = $div.querySelector('img');
    const $p = $div.querySelector('p');

    $div.remove();

    return clonePhoto($div, $img, $p);
}

function initTemplatePhoto1(id) {
    const $template = document.getElementById(id);
    const $inner = document.createElement('div');
    $inner.innerHTML = $template.innerText;

    const $div = $inner.querySelector('*:first-child');
    const $img = $div.querySelector('img');
    const $p = $div.querySelector('p');

    return clonePhoto($div, $img, $p);
}

function initTemplatePhoto2(id) {
    const $template = document.getElementById(id);
    const $div = $template.content.querySelector('*:first-child');
    const $img = $div.querySelector('img');
    const $p = $div.querySelector('p');

    return clonePhoto($div, $img, $p);
}

const createMethods = {
    create: initCreatedPhoto(),
    first: initFirstPhoto($photos),
    template1: initTemplatePhoto1('photo-template1'),
    template2: initTemplatePhoto2('photo-template2')
};

$buttonAdd.addEventListener('click', () => {
    //debugger;
    $photos.append(
        createMethods[$selectMethod.value](
            ...generatePhoto($photos.childElementCount)
        )
    );
});