//debugger;
//Константы и переменные
const settings = {
    createButtonSelector: '#add-photo',
    modalOpenedClass: 'is-active'
};

const buttonAdd = document.getElementById('add-photo');
const photos = document.querySelector('.photos');

//Объявления функций
function initPopup(id) {
    const targetPopup = document.getElementById(id); //находим требуемое окно
    const close = targetPopup.querySelectorAll('.close'); //добавляем событие клик на кнопке закрыть

    const openPopup = () => {
        targetPopup.classList.add('is-active');
    };

    const closePopup = () => {
        targetPopup.classList.remove('is-active');
    };   

    close.forEach($closeBtn => {
        $closeBtn.addEventListener('click', closePopup);
    });

    if (targetPopup.className.includes('overlay')) {
        targetPopup.addEventListener("mousedown", (e) => {
            if (e.target === targetPopup) { //проверяем что нажали именно на оверлей, а не глубже
                closePopup();
            }
        });
    }

    return { openPopup, closePopup };
}

function initCreateCardForm(id, onSubmit) {
    const form = document.getElementById(id);
    const imageInput = form.elements["image"];
    const titleInput = form.elements["title"];

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onSubmit({
            image: imageInput.value,
            title: titleInput.value
        });
        return false;
    });
}

function initCard(id) {
    const template = document.getElementById(id);
    const div = template.content.querySelector('*:first-child');
    const img = div.querySelector('img');
    const p = div.querySelector('p');

    return ({data, onRemove}) => {
        const { image, title } = data;
        //сначала установили данные в уже известные элементы, чтобы не искать их
        img.src = image;
        img.alt = title;
        p.textContent = title;

        //а вот теперь клонировали
        const card = div.cloneNode(true);
        const close = card.querySelector('button');
        
        close.addEventListener('click', (e) => {
            e.stopPropagation();
            onRemove({ card, data });
        });
        return card;
    };
}


//Основная логика
// — инициализация
const createCard = initCard("photo-template");
const { openPopup, closePopup } = initPopup("modal-test");

// — установка событий
initCreateCardForm("create-card", (data) => {
    photos.append(createCard({
        data,
        onRemove: ({ card }) => {
            card.remove();
        }
    }));
    closePopup();
});

buttonAdd.addEventListener('click', () => {
    openPopup();
});



