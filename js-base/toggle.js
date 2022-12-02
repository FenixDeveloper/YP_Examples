window.onReady(() => {
    //Открытие модальных окон
    const $toggleModal = document.querySelectorAll('.toggle-popup'); //нашли триггеры которые должны открывать окно
    $toggleModal.forEach($toggleBtn => { //перебираем триггеры
        if (!$toggleBtn.dataset.target) { //проверяем что есть цель для открытия
            console.error(`toggle-popup: button has not set target`, $toggleBtn);
            return;
        }
        const $targetPopup = document.getElementById($toggleBtn.dataset.target); //находим требуемое окно
        if (!$targetPopup) { //если нет, то и открывать нечего
            console.error(`toggle-popup: target not found`, $toggleBtn);
            return;
        }

        $toggleBtn.addEventListener('click', () => { //добавляем событие клик на триггере
            $targetPopup.classList.add('is-active');
            $close.tabIndex = 1;
        });

        const $close = $targetPopup.querySelectorAll('.close'); //добавляем событие клик на кнопке закрыть
        $close.forEach($closeBtn => {
            $closeBtn.addEventListener('click', () => {
                $targetPopup.classList.remove('is-active');
            });
        });

        if ($targetPopup.className.includes('overlay')) { //добавляем событие клик на оверлей
            $targetPopup.addEventListener('click', (e) => {
                if (e.target === $targetPopup) { //проверяем что нажали именно на оверлей, а не глубже
                    $targetPopup.classList.remove('is-active');
                }
            });
        }
    });

    //Переключатель класса на кнопке (два варианта)
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


    //Переключатель класса на кнопке (много вариантов)
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