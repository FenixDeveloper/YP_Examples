const $menuButton = document.getElementById('menu-button');
const $collapsable = document.querySelectorAll('.collapsable');

$menuButton.addEventListener('click', function () {
    if ($menuButton.className.indexOf('is-active') !== -1) {
        $menuButton.classList.remove('is-active');
        $collapsable.forEach(it => it.style.display = 'none');
    } else {
        $menuButton.classList.add('is-active');
        $collapsable.forEach(it => it.style.display = 'flex');
    }
});