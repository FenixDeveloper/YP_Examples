# React компонент Dropdown
Кастомизируемый компонент с открывающимся по клику или наведению произвольным контентом.

Реализован в виде библиотеки и может быть подключен к любому другому проекту как npm модуль по https ссылке на github репозиторий.

    yarn add https://github.com/FenixDeveloper/custom-dropdown.git

Использованные технологии: TypeScript, SCSS
Для стилизации в Storybook использованы: [Bulma](https://bulma.io/), [FontAwesome Icons](https://fontawesome.com/)

Опубликованная версия на [Github Pages](https://fenixdeveloper.github.io/custom-dropdown/build/)

## Инструкция по запуску
Установка зависимостей

    yarn

Запуск в режиме изоляции компонент для разработки (Storybook):

    yarn storybook

В этом режиме релизованы страницы:
- **Components/Prototype** — прототип с 4 синхронизированными дпродаунами по углам
- **Components/PrototypeScrollable** — аналогичная страница, но с более широким окном для проверки поведения при скролле.
- **Dropdown/Default** — компонент с минимальной настройкой
- **Dropdown/Styled** — стилизованный через классы
- **Dropdown/Scrolled** — с широким окном для проверки скролла
- **Menu/Default** — компонент меню с минимальной настройкой
- **Menu/Styled** — стилизованное меню

Запуск напрямую, без storybook со страницей содержащей один настроенный по-умолчанию компонент Dropdown c Menu в контенте.

    yarn start


## Инструкция по сборке
Для сборки экспортируемой версии библиотеки в dist:

    yarn compile
