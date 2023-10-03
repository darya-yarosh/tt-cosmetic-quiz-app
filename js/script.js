/**
 * Навигация по файлу.
 * 
 * Секции функций:
 * - VALUES - переменные, используемые в остальных функциях.
 * - GETTERS - функции получения корректных значений переменных.
 * - DRAWERS - функции отрисовки элементов на странице.
 * - NAVIGATION - функции навигации по страницам сайта.
 * - MAIN - главная функция по запуску построения страницы.
 */

// --- VALUES - QUIZ PAGE ---

/**
 * Индекс текущего вопроса
 */
let currentQuestionIndex = 0;

/**
 * Список вопросов в опросе.
 */
const questions = [{
    id: "1",
    question: "Сколько вам лет?",
    answers: [
        "Нужны средства для ребёнка младше 10 лет",
        "Мне меньше 25 лет",
        "От 25 до 35 лет",
        "От 35 до 45 лет",
        "Мне больше 45 лет"
    ]
},
{
    id: "2",
    question: "Какой у вас тип кожи?",
    answers: [
        "Сухая",
        "Нормальная",
        "Комбинированная",
        "Жирная",
    ]
},
{
    id: "3",
    question: "Беспокоят ли воспаления на лице?",
    answers: [
        "Да",
        "Нет",
        "Иногда",
    ]
}]

// --- VALUES

const PRODUCTS_FILE_PATH = '../js/storage/products_long.json';

/**
 * Список ответов пользователя на опрос.
 */
const userAnswers = new Array(questions.length);

// --- VALUES - RESULT PAGE ---

/**
 * Индекс текущей страницы с продуктами.
 */
let currentProductPageIndex = 0;

/**
 * Список продуктов, подходящих под результат.
 * 
 * @num номер страницы
 * @products список продуктов
 */
const productPageInfoList = [];

// --- GETTERS ---

/**
 * Получение текущего номера вопроса
 * 
 * @returns number
 */
function getCurrentQuestionNumber() {
    return currentQuestionIndex + 1;
}

/**
 * Получение текущего вопроса
 * 
 * @returns object
 */
function getCurrentQuestion() {
    return questions[currentQuestionIndex];
}

/** 
 * Для вывода на страницу товаров должен использоваться:
 * - Асинхронный JS-скрипт.
 * Его порядок действия:
 * 1) обращение в JSON-файл;
 * 2) получение оттуда списка товаров;
 * 3) отрисовка вёрстки в виде плитки, указанной в дизайне.
*/
async function loadProducts(answers) {
    // Генерация фильтра под указанные ответы пользователя на опрос. //
    // ...
    // Обращение к серверу для получения продуктов под результат.
    const api_url = await fetch(PRODUCTS_FILE_PATH);
    const api_url_json = await api_url.json();
    // Assignment of the received value of the refinancing rate to another variable in the form of a string.
    return api_url_json;
}

// --- DRAWERS - QUIZ Page ---

/**
 * Отрисовка header'a для страницы опроса.
 */
function drawQuizHeader() {
    const title = "Онлайн-подбор средств для лица";
    const desc = "Пройдите короткий тест и получите список наиболее подходящих для вас косметических продуктов";

    const headerElement = document.getElementById("page__header");
    headerElement.innerHTML = `
        <h1 class="page__header__title">${title}</h1>
        <p class="page__header__desc">${desc}</p>
    `
}

/**
 * Построение структуры content'a для страницы опроса
 */
function drawQuizContent() {
    const pageContentElement = document.getElementById("page__content");
    pageContentElement.innerHTML = `
        <article class="quiz-card">
            <section class="quiz-card__header">
                <article id="question-counter__square-list" class="question-counter__square-list"></article>
                <span id="question-counter" class="question-counter"></span>
            </section>
            <h2 id="quiz-card__question" class="quiz-card__question"></h2>
            <section id="quiz-card__answer-list" class="quiz-card__answer-list"></section>
            <nav id="quiz-card__nav" class="quiz-card__nav"></nav>
        </article>
    `
}

/**
 * Отрисовка счётчика вопросов в виде кругов в карточке опроса.
 */
function drawSquareList() {
    const squareListElement = document.getElementById("question-counter__square-list");

    const squareList = [];
    for (let index = 0; index < questions.length; index++) {
        const squareClass = index !== currentQuestionIndex
            ? `question-counter__square`
            : `question-counter__square__current`;

        squareList.push(`<figure class="${squareClass}"></figure>`)
    }

    squareListElement.innerHTML = squareList.join('');
}

/**
 * Отрисовка счётчика вопросов в карточке опроса.
 */
function drawQuestionCounter() {
    const questionCounterElement = document.getElementById("question-counter");
    questionCounterElement.innerHTML = `Вопрос ${getCurrentQuestionNumber()} из ${questions.length}`;
}

/**
 * Отрисовка текущего вопроса в карточке опроса.
 */
function drawQuestionTitle() {
    const questionObject = getCurrentQuestion();

    const questionElement = document.getElementById("quiz-card__question");
    questionElement.innerHTML = `${questionObject.question}`;
}

/**
 * Отрисовка вариантов ответа на текущий вопрос в карточке опроса.
 */
function drawQuestionAnswerList() {
    const questionObject = getCurrentQuestion();

    const answerListElement = document.getElementById("quiz-card__answer-list");
    const answerList = questionObject.answers
        .map((answer, index) => {
            //const radioButtonClass = `radioButton-${index + 1}`;

            return `<div class="quiz-card__answer">
                <input class="radioButton" type="radio" id="${answer}" name="answer" value="${answer}"/>
                <label class="radioButton-label" for="${answer}">${answer}</label>
            </div>`
        });
    answerListElement.innerHTML = answerList.join('');
}

/**
 * Отрисовка навигациионных кнопок в карточке опроса.
 */
function drawNavigationButtons() {
    const navElement = document.getElementById("quiz-card__nav");

    const currentQuestionNumber = getCurrentQuestionNumber();
    const className = `quiz-card__nav button`;
    if (currentQuestionNumber === 1) {
        const negativeButton = `<p><input class='${className} button-positive' type='button' onClick='nextQuestion()' value='Дальше'></p>`;

        navElement.innerHTML = negativeButton;
    }
    else if (currentQuestionNumber === 2) {
        const negativeButton = `<p><input class='${className} button-negative' type='button' onClick='prevQuestion()' value='Назад'></p>`
        const positiveButton = `<p><input class='${className} button-positive' type='button' onClick='nextQuestion()' value='Дальше'></p>`

        navElement.innerHTML = negativeButton + positiveButton;
    }
    else if (currentQuestionNumber === 3) {
        const negativeButton = `<p><input class='${className} button-negative' type='button' onClick='prevQuestion()' value='Назад'></p>`
        const positiveButton = `<p><input class='${className} button-positive' type='button' onClick='getResults()' value='Узнать результат'></p>`

        navElement.innerHTML = negativeButton + positiveButton
    }
}

/**
 * Отрисовка карточки с вопросом.
 */
function renderQuestionCard() {
    drawSquareList();
    drawQuestionCounter();
    drawQuestionTitle();
    drawQuestionAnswerList();
    drawNavigationButtons();
}

/**
 * Прорисовка страницы с опросом.
 */
function renderQuizPage() {
    drawQuizHeader();
    drawQuizContent();
    renderQuestionCard();
}

// --- DRAWERS - RESULT PAGE ---

/**
 * Отрисовка header'a для страницы результата.
 */
function drawResultHeader() {
    const title = "Результат";
    const desc = "Мы подобрали для вас наиболее подходящие средства";

    const headerElement = document.getElementById("page__header");
    headerElement.innerHTML = `
        <h1 class="page__header__title">${title}</h1>
        <p class="page__header__desc">${desc}</p>
    `
}

/**
 * Построение структуры content'a для страницы результата
 */
function drawResultContent() {
    const pageContentElement = document.getElementById("page__content");
    pageContentElement.innerHTML = `
        <div id="product-list" class="product-list"></div>
        <nav id="product-list__nav" class="product-list__nav"></nav>
    `
}

/**
 * Создание кнопки для добавления товар в избранный список
 * 
 * @returns Элемент-кнопка для избранного списка
 */
function createFavouriteButton() {
    const favouriteIconWrapperElement = document.createElement("div");
    favouriteIconWrapperElement.className = "product-card__favourite-button";
    favouriteIconWrapperElement.innerHTML = `
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.7867 4.14666C27.1057 3.46533 26.2971 2.92485 25.4071 2.5561C24.5172 2.18735 23.5633 1.99756 22.6 1.99756C21.6367 1.99756 20.6828 2.18735 19.7929 2.5561C18.9029 2.92485 18.0943 3.46533 17.4133 4.14666L16 5.55999L14.5867 4.14666C13.2111 2.77107 11.3454 1.99827 9.4 1.99827C7.45462 1.99827 5.58892 2.77107 4.21333 4.14666C2.83774 5.52225 2.06494 7.38795 2.06494 9.33332C2.06494 11.2787 2.83774 13.1444 4.21333 14.52L5.62666 15.9333L16 26.3067L26.3733 15.9333L27.7867 14.52C28.468 13.839 29.0085 13.0304 29.3772 12.1405C29.746 11.2505 29.9358 10.2966 29.9358 9.33332C29.9358 8.37001 29.746 7.41613 29.3772 6.52618C29.0085 5.63624 28.468 4.82767 27.7867 4.14666Z" stroke="#D2D2D2" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `
    return favouriteIconWrapperElement;
}

/**
 * Создание элемента для картинки продукта
 * 
 * @param {*} imageURL Адрес на картинку продукта
 * @returns Элемент картинки продукта
 */
function createProductIMG(imageURL) {
    const productIMGElement = document.createElement("img");
    productIMGElement.className = "product-card__image";
    productIMGElement.style.background = `url(${imageURL})`;
    productIMGElement.style.backgroundSize = `auto 100%`;
    productIMGElement.style.backgroundRepeat = `no-repeat`;
    productIMGElement.style.backgroundPosition = `center`;
    return productIMGElement;
}

/**
 * Создание элемента для ценника продукта
 * 
 * @param {*} oldPrice Старая цена
 * @param {*} price Текущая цена
 * @returns Элемент
 */
function createProductPrice(oldPrice, price) {
    const productPriceElement = document.createElement("p");
    productPriceElement.className = "product-card__price-wrapper";

    if (oldPrice === null) {
        const priceElement = `<span class="product-card__price">${price.toFixed(2)}</span>`;
        productPriceElement.innerHTML = priceElement;
    } else {
        const oldPriceElement = `<span class="product-card__old-price">${oldPrice.toFixed(2)}</span>`;
        const priceElement = `<span class="product-card__price">${price.toFixed(2)}</span>`;
        productPriceElement.innerHTML = oldPriceElement + priceElement;
    }

    return productPriceElement;
}

/**
 * Создание элемента заголовка продукта
 * 
 * @param {*} title Заголовок продукта
 * @returns Элемент заголовка продукта
 */
function createProductTitle(title) {
    const productTitleElement = document.createElement("p");
    productTitleElement.className = "product-card__title"
    const productTitleValue = (title.trim()).length <= 44
        ? title.trim()
        : `${title.trim().substring(0, 44)}...`;
    productTitleElement.innerHTML = productTitleValue;
    return productTitleElement;
}

/**
 * Создание элемента продукта
 * 
 * @param {*} product Информация по продукту
 * @returns Элемент информационной карточки продукта
 */
function createProduct(product) {
    const productElement = document.createElement("div");
    productElement.id = product.id;
    productElement.className = "product-card";
    productElement.append(createProductIMG(product.image));
    productElement.append(createFavouriteButton());
    productElement.append(createProductTitle(product.title));
    productElement.append(createProductPrice(product.oldPrice, product.price));
    return productElement;
}

/**
 * Прорисовка списка продуктов
 * 
 * @param {*} productList Список указанных продуктов
 */
function drawProductList(productList) {
    const productListElement = document.getElementById("product-list");
    productListElement.innerHTML = '';
    productList.map(product => {
        productListElement.append(createProduct(product));
    })
}

/**
 * Прорисовка навигации по страницам списка продуктов
 * 
 * @param {*} pageIndex Индекс текущей страницы
 * @param {*} productPageInfoList Список информации по страницам с продуктами
 */
function drawProductPageNavigation(pageIndex, productPageInfoList) {
    function createDotsElement() {
        const dotsElement = document.createElement("p");
        dotsElement.className = 'pageLink pageLink__dots';
        dotsElement.innerHTML = '...';
        return dotsElement;
    }

    function createFirstPageLinkElement() {
        const firstPageLinkElement = document.createElement("a");
        firstPageLinkElement.className = 'pageLink';
        firstPageLinkElement.innerHTML = '1';
        firstPageLinkElement.onclick = function() {setProductsPage(1)};
        return firstPageLinkElement;
    }
    
    function createLastPageLinkElement() {
        const lastPageLinkElement = document.createElement("a");
        lastPageLinkElement.className = 'pageLink';
        lastPageLinkElement.innerHTML = `${productPageInfoList.length}`;
        lastPageLinkElement.onclick = function() {setProductsPage(productPageInfoList.length)};
        return lastPageLinkElement;
    }

    function createAroundCurrentPageLinksElement(startIndex, endIndex) {
        const elements = [];
        for (let ind = startIndex; ind <= endIndex; ind++) {
            const pageLinkElement = document.createElement("a");
            pageLinkElement.className = ind === pageIndex ? 'pageLink pageLink__current' : 'pageLink';
            pageLinkElement.innerHTML = `${ind + 1}`;
            pageLinkElement.onclick = function() {setProductsPage(ind + 1)};
            elements.push(pageLinkElement)
        }
        return elements;
    }

    const productListNavElement = document.getElementById("product-list__nav");
    productListNavElement.innerHTML = '';

    const startIndex = pageIndex - 2;
    const endIndex = pageIndex + 2;
    if (startIndex <= 2) {
        const aroundCurrentPageLinksElement = createAroundCurrentPageLinksElement(0, endIndex);
        const dotsElement = createDotsElement();
        const lastPageLinkElement = createLastPageLinkElement();

        aroundCurrentPageLinksElement.forEach(element=>productListNavElement.append(element));
        productListNavElement.append(dotsElement)
        productListNavElement.append(lastPageLinkElement)
        // -1- 2 3 ... 13
        // 1 -2- 3 4 ... 13
        // 1 2 -3- 4 5 ... 13
        // 1 2 3 -4- 5 6 ... 13
        // 1 2 3 4 -5- 6 7 ... 13
    } else if (productPageInfoList.length - 5 <= pageIndex && endIndex <= productPageInfoList.length+2) {
        const firstPageLinkElement = createFirstPageLinkElement();
        const dotsElement = createDotsElement();
        const aroundCurrentPageLinksElement = createAroundCurrentPageLinksElement(startIndex, productPageInfoList.length-1);
        
        productListNavElement.append(firstPageLinkElement)
        productListNavElement.append(dotsElement)
        aroundCurrentPageLinksElement.forEach(element=>productListNavElement.append(element));
        // 1 ... 7 8 -9- 10 11 12 13
        // 1 ... 8 9 -10- 11 12 13
        // 1 ... 9 10 -11- 12 13
        // 1 ... 10 11 -12- 13
        // 1 ... 11 12 -13-
    } else {
        const firstPageLinkElement = createFirstPageLinkElement();
        const dotsLeftElement = createDotsElement();
        const dotsRightElement = createDotsElement();
        const aroundCurrentPageLinksElement = createAroundCurrentPageLinksElement(startIndex, endIndex);
        const lastPageLinkElement = createLastPageLinkElement();

        productListNavElement.append(firstPageLinkElement)
        productListNavElement.append(dotsLeftElement)
        aroundCurrentPageLinksElement.forEach(element=>productListNavElement.append(element));
        productListNavElement.append(dotsRightElement)
        productListNavElement.append(lastPageLinkElement)
        // 1 ... 4 5 -6- 7 8 ... 13
        // 1 ... 5 6 -7- 8 9 ... 13
        // 1 ... 6 7 -8- 9 10 ... 13
    }
}

/**
 * Прорисовка страницы с результатом опроса.
 */
async function renderResultsPage() {
    const products = await loadProducts(userAnswers);

    const COUNT_PRODUCTS_ON_PAGE = 10;
    const countPages = Math.ceil(products.length / COUNT_PRODUCTS_ON_PAGE);
    for (let ind = 0; ind < countPages; ind++) {
        productPageInfoList.push({
            num: ind + 1,
            products: products.slice(ind, ind + COUNT_PRODUCTS_ON_PAGE)
        })
    }

    drawResultHeader();
    drawResultContent();
    drawProductList(productPageInfoList[currentProductPageIndex].products);
    drawProductPageNavigation(currentProductPageIndex, productPageInfoList);
}

// --- NAVIGATION ---

/**
 * Переход к предыдущему вопросу опроса.
 * 
 * При ошибке обработки данных выводится уведомление 
 * с просьбой обновить страницу и пройти опрос заново.
 */
function prevQuestion() {
    currentQuestionIndex--;

    if (currentQuestionIndex < 0) {
        window.alert("Произошла ошибка при обработке данных. Перезагрузите пожалуйста страницу и пройдите опрос заново.")
        return;
    }

    renderQuestionCard();
}

/**
 * Переход к следующему вопросу опроса.
 * 
 * @returns При ошибке обработки данных выводится уведомление 
 * с просьбой обновить страницу и пройти опрос заново.
 */
function nextQuestion() {
    const selectedAnswer = getSelectedAnswer();

    if (!isCorrectSelectedAnswer(selectedAnswer)) {
        return;
    }

    userAnswers[currentQuestionIndex] = selectedAnswer;
    currentQuestionIndex++;
    renderQuestionCard();

}

/**
 * Переход к странице с результатами опроса.
 * 
 * @returns При ошибке обработки данных выводится уведомление 
 * с просьбой обновить страницу и пройти опрос заново.
 */
function getResults() {
    const selectedAnswer = getSelectedAnswer();

    if (!isCorrectSelectedAnswer(selectedAnswer)) {
        return;
    }

    renderResultsPage();
}

/**
 * Получить значение текущего ответа
 * 
 * @returns Значение текущего ответа.
 */
function getSelectedAnswer() {
    const answerListHTMLCollection = document.getElementsByClassName("radioButton");

    let selectedAnswer = "";
    for (let index = 0; index < answerListHTMLCollection.length; index++) {
        if (answerListHTMLCollection[index].checked) {
            selectedAnswer = answerListHTMLCollection[index].value;
            break;
        }
    }
    return selectedAnswer;
}

/**
 * Проверка текущего ответа на валидность.
 * 
 * @param {*} selectedAnswer Указанный ответ
 * @returns Статус валидности текущего ответа.
 */
function isCorrectSelectedAnswer(selectedAnswer) {
    if (selectedAnswer === "") {
        callAlert();
        return false;
    }
    return true;
}

/**
 * Вызов ошибки.
 */
function callAlert() {
    const navElement = document.getElementById("quiz-card__nav");

    let alertElement = document.getElementById("alert__text");
    if (alertElement === null) {
        alertElement = document.createElement("p");
        alertElement.id = "alert__text";
        alertElement.className = "alert__text";
        alertElement.innerHTML = "Выберите один из вариантов ответа";
    }
    navElement.append(alertElement);

    const quizCardButtons = document.getElementsByClassName("quiz-card__nav button");
    const lastButton = quizCardButtons[quizCardButtons.length - 1];
    lastButton.style.animation = 'tilt-shaking 0.25s 1';
    function removeAnimation() {
        lastButton.style.animation = 'none';
    }
    setTimeout(removeAnimation, 250);
}

/**
 * Переход на указанную страницу с товарами.
 * 
 * @param {*} pageNumber Номер страницы
 */
function setProductsPage(pageNumber) {
    currentProductPageIndex = pageNumber - 1;
    drawProductList(productPageInfoList[currentProductPageIndex].products);
    drawProductPageNavigation(currentProductPageIndex, productPageInfoList);
}

// --- MAIN ---

/**
 * Main-функция.
 */
function loadPage() {
    renderQuizPage();
}

loadPage();