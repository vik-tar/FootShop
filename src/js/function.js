//показать лиги
function showLeagues() {
    for (let i = 0; i < categories.length; i++) {
        const child = document.createElement('p');
        child.innerText = categories[i].name;
        child.setAttribute('data-id', categories[i].id);
        child.setAttribute('class', 'league_item');

        child.addEventListener('click', getClubs)

        document.querySelector('.leagues').appendChild(child);
    }
}

//получить клубы
function getClubs(event) {
    const leagueId = event.target.getAttribute('data-id');

    const selectedCategory = categories.find((category) => {
        return category.id === leagueId;
    })
    const selectedClubs = selectedCategory.items;
    showClubs(selectedClubs, leagueId);
}

//отобразить клубы
function showClubs(selectedClubs, leagueId) {
    document.querySelector('.clubs').innerText = '';
    closeBasket()

    for (let i = 0; i < selectedClubs.length; i++) {
        const child = document.createElement('p');
        child.innerText = selectedClubs[i].name;
        child.setAttribute('data-id-content', selectedClubs[i].id);
        child.setAttribute('data-id', leagueId);
        child.setAttribute('class', 'league_item');

        child.addEventListener('click', getClubContent);

        document.querySelector('.clubs').appendChild(child);
    }
}

//получаем данные клуба
function getClubContent(event) {
    closeBasket()

    const clubId = event.target.getAttribute('data-id-content');
    const choosenLeagueId = event.target.getAttribute('data-id');

    const selectedUpCategory = categories[choosenLeagueId - 1].items.find((category) => {
        return category.id === clubId;
    })

    const clubName = selectedUpCategory.name;
    const clubPrice = selectedUpCategory.price;
    const kitType = selectedUpCategory.type;

    lookingItem = selectedUpCategory;
    console.log(lookingItem);

    showPriceName(clubPrice, clubName)
    showSlide(kitType)
    showButton()
}

//показываем название и цену
function showPriceName(clubPrice, clubName) {
    document.querySelector('.info').innerText = '';

    const name = document.createElement('p');
    name.setAttribute('class', 'clubName');
    name.innerText = clubName;

    const type = document.createElement('div');
    type.setAttribute('class', 'shirtType');

    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    price.innerText = clubPrice + ' грн.';

    document.querySelector('.info').appendChild(name);
    document.querySelector('.info').appendChild(type);
    document.querySelector('.info').appendChild(price);
}

//отображение футболки и слайдера
function showSlide(kitType) {
    document.querySelector('.photo').innerText = '';
    let i = 0;

    const slide = document.createElement('img');
    slide.src = kitType[i].pic;
    slide.setAttribute('class', 'photo');

    const type = document.createElement('p');
    type.innerText = kitType[i].name;
    type.setAttribute('class', 'kitStatus');

    lookingItem.pac = kitType[i];

    console.log(lookingItem);

    document.querySelector('.slider__prew').addEventListener('click', () => {
        i--;
        if (i === -1) {
            i = kitType.length -1
        }

        slide.src = kitType[i].pic;
        type.innerText = kitType[i].name;

        lookingItem.pac = kitType[i];

        console.log(lookingItem);
    })

    document.querySelector('.slider__next').addEventListener('click', () => {
        i++;
        if (i === kitType.length) {
            i = 0
        }

        slide.src = kitType[i].pic;
        type.innerText = kitType[i].name;

        lookingItem.pac = kitType[i];

        console.log(lookingItem);
    })

    document.querySelector('.photo').appendChild(slide);
    document.querySelector('.shirtType').appendChild(type);
}

//кнопка купить
function showButton() {
    const button = document.createElement('button');

    button.setAttribute('class', 'button');
    button.innerText = 'Купить';
    button.addEventListener('click', addBasket)

    document.querySelector('.info').appendChild(button)
}

//добавить в корзину
function addBasket() {
    closeBasket()

    let newItem = {
        name: lookingItem.name,
        price: lookingItem.price,
        amount: 1,
        type: lookingItem.pac,
        finalePrice: lookingItem.price,
        id: lookingItem.id
    }

    for (let i = 0; i < choosenItem.length; i++) {
        if (newItem.name === choosenItem[i].name && newItem.id === choosenItem[i].id && newItem.type.name === choosenItem[i].type.name) {
            newItem.amount = choosenItem[i].amount + 1;
            newItem.finalePrice = (choosenItem[i].amount + 1) * choosenItem[i].price;
            choosenItem.splice(i, 1);
        }
    }

    choosenItem.push(newItem);
    console.log(choosenItem);
    localStorage.setItem('basket', JSON.stringify(choosenItem));

    basketCount();
    document.querySelector('.modalNote').removeAttribute('id');

    document.querySelector('.note__continue').addEventListener('click', closeNote);
    document.querySelector('.note__arrange').addEventListener('click', openBasket);
}


//закрываем всплывающее окно
function closeNote() {
    document.querySelector('.modalNote').setAttribute('id', 'invis');
}

//в значке корзины выводим количество
function basketCount() {
    let totalAmount = 0;

    for (let i = 0; i < choosenItem.length; i++) {
        totalAmount += choosenItem[i].amount
    }

    if (choosenItem.length > 0) {
        const amount = document.createElement('span');

        amount.innerText = totalAmount.toString();
        amount.setAttribute('class', 'amount');
        document.querySelector('.amount').replaceWith(amount);
    }

    if (choosenItem.length < 1) {
        const amount = document.createElement('span');

        amount.innerText = '0';
        amount.setAttribute('class', 'amount');
        document.querySelector('.amount').replaceWith(amount);
    }
}