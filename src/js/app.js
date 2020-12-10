//переменная корзина
let lookingItem = categories[0].items[0];
let choosenItem = JSON.parse(localStorage.getItem('basket'));
if (!choosenItem) {
    choosenItem = []
}


showLeagues()
showClubs(categories[0].items, 1)
showPriceName(categories[0].items[0].price, categories[0].items[0].name)
showSlide(categories[0].items[0].type)
showButton()
basketCount()

//закрыть корзину
document.querySelector('.close').addEventListener('click', closeBasket)

//открыть корзину по значку
document.querySelector('.basket__icon').addEventListener('click', openBasket)