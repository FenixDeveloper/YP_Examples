window.onReady(() => {
    const $toggleModal = document.querySelectorAll('.toggle-popup');
    $toggleModal.forEach($toggleBtn => {
        if (!$toggleBtn.dataset.target) {
            console.error(`toggle-popup: button has not set target`, $toggleBtn);
            return;
        }
        const $targetPopup = document.getElementById($toggleBtn.dataset.target);
        if (!$targetPopup) {
            console.error(`toggle-popup: target not found`, $toggleBtn);
            return;
        }

        $toggleBtn.addEventListener('click', () => {
            $targetPopup.classList.add('is-active');
            $close.tabIndex = 1;
        });

        const $close = $targetPopup.querySelectorAll('.close');
        $close.forEach($closeBtn => {
            $closeBtn.addEventListener('click', () => {
                $targetPopup.classList.remove('is-active');
            });
        });

        if ($targetPopup.className.includes('overlay')) {
            $targetPopup.addEventListener('click', (e) => {
                if (e.target === $targetPopup) {
                    $targetPopup.classList.remove('is-active');
                }
            });
        }
    });

    const $toggleClass = document.querySelectorAll('.toggle-class');
    $toggleClass.forEach($targetItem => {
        if (!$targetItem.dataset.target) {
            console.error(`toggle-class: button has not set target`, $targetItem);
            return;
        }
        $targetItem.addEventListener('click', () => {
            $targetItem.classList.toggle($targetItem.dataset.target);
        });
    });

    const $toggleIcon = document.querySelectorAll('.toggle-icon');
    $toggleIcon.forEach($targetItem => {
        if (!$targetItem.dataset.target) {
            console.error(`toggle-class: button has not set target`, $targetItem);
            return;
        }
        const $targetIcon = $targetItem.querySelector('.icon');
        let iconList = $targetItem.dataset.target.split(" ");
        $targetItem.addEventListener('click', () => {
            const currentIcon = $targetIcon.className.split(" ").filter(cls => /^icon-/.test(cls)).pop();
            iconList.push(currentIcon);
            $targetIcon.classList.remove(currentIcon);
            $targetIcon.classList.add(iconList.shift());
        });
    });
});