//открыть корзину
function openBasket() {
    iconBasket()
    closeNote()

    document.querySelector('.basket__title').removeAttribute('id');
    document.querySelector('.modalBasket').removeAttribute('id');

    let totalPrice = 0;

    document.querySelector('.basket__elems').innerText = '';

    let basketName = document.createElement('div');
    let title1 = document.createElement('div');
    let title2 = document.createElement('div');
    let title3 = document.createElement('div');
    let title4 = document.createElement('div');

    basketName.setAttribute('class', 'column__title')

    title1.innerText = 'Наименование';
    title2.innerText = 'Цена';
    title3.innerText = 'Количество';
    title4.innerText = 'Итог';

    basketName.appendChild(title1);
    basketName.appendChild(title2);
    basketName.appendChild(title3);
    basketName.appendChild(title4);

    document.querySelector('.basket__elems').appendChild(basketName);

    for (let i = 0; i < choosenItem.length; i++) {
        let basketItem = document.createElement('div');
        let itemTitle = document.createElement('div');
        let itemName = document.createElement('p');
        let formPic = document.createElement('img');
        let itemPrice = document.createElement('div');
        let amountBlock = document.createElement('div');
        let itemAmount = document.createElement('div');
        let itemFinalePrice = document.createElement('div');
        let amountMinus = document.createElement('button');
        let amountPlus = document.createElement('button');
        let waste = document.createElement('a');
        let wasteImg = document.createElement('img');
        let a = i;


        itemName.innerText = choosenItem[i].name + ' (' + choosenItem[i].type.name + ')';
        itemPrice.innerText = choosenItem[i].price + ' грн.';
        itemAmount.innerText = choosenItem[i].amount;
        itemFinalePrice.innerText = choosenItem[i].finalePrice + ' грн.';
        amountMinus.innerText = '-';
        amountPlus.innerText = '+';

        totalPrice += choosenItem[i].finalePrice;

        basketItem.setAttribute('class', 'elem');
        itemTitle.setAttribute('class', 'elem__name');
        itemPrice.setAttribute('class', 'elem__price');
        itemAmount.setAttribute('class', 'elem__amount');
        amountBlock.setAttribute('class', 'elem__block');
        itemFinalePrice.setAttribute('class', 'elem__finale');
        amountMinus.setAttribute('data-id', a);
        amountMinus.setAttribute('class', 'amountMinus');
        amountPlus.setAttribute('data-id', a);
        amountPlus.setAttribute('class', 'amountPlus');
        waste.setAttribute('class', 'waste');
        waste.setAttribute('href', '/');
        wasteImg.setAttribute('src', 'img/wastebin.svg');
        wasteImg.setAttribute('class', 'waste__img');
        wasteImg.setAttribute('data-id', a);
        formPic.setAttribute('src', choosenItem[i].type.pic);
        formPic.setAttribute('class', 'icon');

        amountMinus.addEventListener('click', getAmountMinus);
        amountPlus.addEventListener('click', getAmountPlus);
        waste.addEventListener('click', deleteElem);

        waste.appendChild(wasteImg);

        amountBlock.appendChild(amountMinus);
        amountBlock.appendChild(itemAmount);
        amountBlock.appendChild(amountPlus);
        amountBlock.appendChild(waste);

        itemTitle.appendChild(itemName);
        itemTitle.appendChild(formPic);

        basketItem.appendChild(itemTitle);
        basketItem.appendChild(itemPrice);
        basketItem.appendChild(amountBlock);
        basketItem.appendChild(itemFinalePrice);
        document.querySelector('.basket__elems').appendChild(basketItem);
    }

    //отрисовка итого
    let footer = document.createElement('div');
    let footerName = document.createElement('div');
    let footerPrice = document.createElement('div');

    footerName.innerText = 'Итого';
    footerPrice.innerText = totalPrice + ' грн.';

    footer.setAttribute('class', 'basket__footer');
    footerName.setAttribute('class', 'footer__name');
    footerPrice.setAttribute('class', 'footer__price');

    footer.appendChild(footerName);
    footer.appendChild(footerPrice);
    document.querySelector('.basket__elems').appendChild(footer);

    //отрисовка кнопки
    let confirm = document.createElement('button');

    confirm.innerText = 'Оформить заказ';
    confirm.setAttribute('class', 'basket__button');
    confirm.addEventListener('click', chekout)

    document.querySelector('.basket__elems').appendChild(confirm);

    // если корзина пуста
    if (choosenItem.length < 1) {
        document.querySelector('.basket__title').setAttribute('class', 'invis');
        document.querySelector('.basket__elems').innerText = 'Вы же еще ничего не выбрали :-(';
    }
}

function closeBasket() {
    document.querySelector('.modalBasket').setAttribute('id', 'invis');
}

function iconBasket() {
    document.querySelector('.basket').removeAttribute('id');
}

//уменьшить кол-во товара в корзине
function getAmountMinus(event) {
    let i = event.target.getAttribute('data-id');

    choosenItem[i].amount -= 1;
    choosenItem[i].finalePrice -= choosenItem[i].price;
    console.log(choosenItem);

    if (choosenItem[i].amount < 1) {
        choosenItem.splice(i, 1);
    }

    basketCount()
    openBasket()

    localStorage.setItem('basket', JSON.stringify(choosenItem));
}


//увеличить кол-во товара в корзине
function getAmountPlus() {
    let i = event.target.getAttribute('data-id');

    choosenItem[i].amount += 1;
    choosenItem[i].finalePrice += choosenItem[i].price;
    console.log(choosenItem);

    basketCount()
    openBasket()

    localStorage.setItem('basket', JSON.stringify(choosenItem));
}

//удалить элемент из корзины
function deleteElem() {

    let i = event.target.getAttribute('data-id');
    choosenItem.splice(i, 1);

    localStorage.setItem('basket', JSON.stringify(choosenItem));

    console.log(choosenItem);

    basketCount()
    event.preventDefault()
    openBasket()
}