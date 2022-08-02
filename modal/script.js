const $buttons = document.querySelectorAll('.modal-toggle');
$buttons.forEach($btn => {
    let targetID = $btn.dataset.target;
    let $modal = document.getElementById(targetID);
    if ($modal) {
        let $close = $modal.querySelectorAll('.close');

        $btn.addEventListener('click', () => {
            if ($btn.dataset.mode === 'toggle') {
                $modal.classList.toggle('is-active');
            } else {
                $modal.classList.add('is-active');
            }
        });

        $close.forEach($closeBtn => {
            $closeBtn.addEventListener('click', () => {
                $modal.classList.remove('is-active');
            });
        });

        if ($modal.className.indexOf('overlay') !== -1) {
            $modal.addEventListener('click', (e) => {
                if (e.target === $modal) {
                    $modal.classList.remove('is-active');
                }
            });
        }
    }
});