/**
 * Универсальный слайдер для конечного и бесконечного слайдинга с кастомизируемыми контролами
 */
class Slider {
    static DEFAULTS = {
        /**
         * @description задержка перед вызовом onStateChange для всех контролов
         */
        transitionDuration: 100,
        containerSelector: '.slider__container',
        itemSelector: '.slider__item',
        slidesAmountVar: '--slides',
        currentSlideVar: '--current',
    };

    /**
     * 
     * @param {HTMLElement} $el 
     * @param {[control]} controls 
     * @param {function} controls[].element DOM элемент контрола
     * @param {function} controls[].onStateChange коллбэк вызываемый при изменении состояния слайдера (изменение активного слайда)
     * @param {function} controls[].onAction коллбэк вызываемый при клике по контролу
     * @param {Slider.DEFAULTS} options опции слайдера
     */
    constructor($el, controls = [], options = {}) {
        this.$root = $el;
        this.options = Object.assign({}, this.constructor.DEFAULTS, options ?? {});
        this._setControls(controls);
        this._reset();
    }

    //ЗАЩИЩЕННЫЕ ВНУТРЕННИЕ МЕТОДЫ
    /** @protected */
    _reset() {
        this.$container = this.$root.querySelector(this.options.containerSelector);
        //Копируем дефолтное состояние с корня слайдера для удобства мутаций
        [this.options.slidesAmountVar, this.options.currentSlideVar].forEach(varName => {
            this.$container.style.setProperty(
                varName, 
                this.$root.style.getPropertyValue(varName)
            );
        });

        //временные переменные
        this.$items = [...this.$root.querySelectorAll('.slider__item')];
        this._timer = null;

        //Корректное значение актуальной задержки будет готово к следующему циклу
        setTimeout(() => {
            this.options.transitionDuration = this._getTransitionDuration();
            //первое обновление для инициализации состояния контролов
            this._update();
        });
    }

    /** @protected */
    _setControls(controls = []) {
        this.controls = new Map();
        for (const {element, onStateChange, onAction} of controls) {
            this.controls.set(element, {
                onStateChange,
                onAction
            });

            element.addEventListener('click', (event) => {
                //Фильтруем лишние действия в процессе анимации
                if (!this._timer) {
                    onAction.call(this, {
                        action: element,
                        slider: this,
                        event
                    });
                }
            });
        }
    }

    /** @protected */
    _getTransitionDuration() {
        return parseFloat(window.getComputedStyle(this.$container).getPropertyValue('transition-duration')) * 1000;
    }

    /** @protected */
    _update() {
        this.controls.forEach(({onStateChange}, element) => onStateChange.call(this, {
            action: element,
            slider: this
        }));
        this._timer = null;
    }

    //PUBLIC API
    /**
     * @description Изменение состояния контейнера в одну транзакцию без промежуточных перерисовок
     * @param {function(Slider)} callback 
     */
    mutate(callback) {
        //клонировали весь слайдер (чтобы апи было тем же самым)
        const buffer = new Slider(this.$root.cloneNode(true));
        //производим мутации
        callback(buffer);
        //переносим состояние в актуальный слайдер
        this.$container.replaceWith(buffer.$container);
        this.$container = buffer.$container;
    }

    /**
     * @description Возвращаем актуальный слайд по порядковому номеру
     * @param {number} n 
     * @returns {HTMLElement}
     */
    getSlide(n) {
        return this.$root.querySelectorAll('.slider__item').item(n - 1);
    }

    /**
     * @description Возвращаем количество слайдов
     * @returns {number}
     */
    get slides() {
        return parseInt(this.$root.style.getPropertyValue('--slides'));
    }

    /**
     * @description Возвращаем порядковый номер видимого слайда
     * @returns {number}
     */
    get current() {
        return parseInt(this.$container.style.getPropertyValue('--current'));
    }

    /**
     * @description Устанавливаем видимый слайд по порядковому номеру
     */
    set current(value) {
        const delay = Math.abs(this.current - value) * this.options.transitionDuration;
        this.$container.style.setProperty('--current', value);
        this._timer = setTimeout(this._update.bind(this), delay);
    }

    //Предсозданные стандартные действия, свои можно создать по аналогии и передать в конструктор
    static actionLeft($action) {
        return {
            element: $action,
            onStateChange: ({ action, slider }) => {
                action.disabled = slider.current === 1;
            },
            onAction: ({ slider }) => {
                slider.current = slider.current - 1;
            }
        }
    }

    static actionRight($action) {
        return {
            element: $action,
            onStateChange: ({ action, slider }) => {
                action.disabled = slider.current === slider.slides;
            },
            onAction: ({ slider }) => {
                slider.current = slider.current + 1;
            }
        }
    }

    static actionLeftForEver($action) {
        return {
            element: $action,
            onStateChange: ({ action, slider }) => {
                if (slider.current === 1) {
                    slider.mutate(buffer => {
                        const last = buffer.getSlide(buffer.slides);
                        last.remove();
                        buffer.$container.prepend(last);
                        buffer.current = 2;
                    });
                }
            },
            onAction: ({ slider }) => {
                slider.current = slider.current - 1;
            }
        }
    }

    static actionRightForEver($action) {
        return {
            element: $action,
            onStateChange: ({ action, slider }) => {
                if (slider.current === slider.slides) {
                    slider.mutate(buffer => {
                        const first = buffer.getSlide(1);
                        first.remove();
                        buffer.$container.append(first);
                        buffer.current = buffer.slides - 1;
                    });
                }
            },
            onAction: ({ slider }) => {
                slider.current = slider.current + 1;
            }
        }
    }
}