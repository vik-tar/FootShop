// открыть оформление заказа
function chekout() {
    closeBasket()

    document.querySelector('.modalConfirm').removeAttribute('id');
    document.querySelector('.confirm__close').addEventListener('click', closeConfirm)
    document.querySelector('.confirm__button').addEventListener('click', setConfirm)
}

//закрыть оформление заказа 
function closeConfirm() {
    document.querySelector('.modalConfirm').setAttribute('id', 'invis')
}

// валидация полей оформления
function setConfirm() {
    let name = document.querySelector('.formName').value;
    let patternName = /^\S+$/;

    let surname = document.querySelector('.formSurname').value;
    let patternSurname = /^\S+$/;

    let phone = document.querySelector('.phoneNumber').value;
    let patternPhone = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    let mail = document.querySelector('.mail').value;
    let patternMail = /^\S+@\S+\.\S+$/;

    let adres = document.querySelector('.adres').value;
    let patternAdres = /^\S+$/;

    if (phone.match(patternPhone) && mail.match(patternMail) && name.match(patternName) && surname.match(patternSurname) && adres.match(patternAdres)) {
        console.log('true')
        document.querySelectorAll('#wrong').innerText = '';
        closeConfirm()

        choosenItem.splice(0, choosenItem.length);
        basketCount()
        localStorage.removeItem('basket');
        event.preventDefault()
    }

    if (!phone.match(patternPhone)) {
        console.log('false')
        event.preventDefault()
        document.querySelector('.telWrong').innerText = 'Проверьте правильность ввода номера';
        document.querySelector('.phoneNumber').setAttribute('id', 'warning')
    } else {
        document.querySelector('.phoneNumber').removeAttribute('id', 'warning')
        document.querySelector('.telWrong').innerText = '';
    }

    if (!mail.match(patternMail)) {
        console.log('false')
        event.preventDefault()
        document.querySelector('.mailWrong').innerText = 'Проверьте правильность ввода почты'
        document.querySelector('.mail').setAttribute('id', 'warning')
    } else {
        document.querySelector('.mail').removeAttribute('id', 'warning')
        document.querySelector('.mailWrong').innerText = '';
    }


    if (!name.match(patternName)) {
        console.log('false')
        event.preventDefault()
        document.querySelector('.nameWrong').innerText = 'Проверьте правильность ввода имени'
        document.querySelector('.formName').setAttribute('id', 'warning')
    } else {
        document.querySelector('.formName').removeAttribute('id', 'warning')
        document.querySelector('.nameWrong').innerText = '';
    }


    if (!surname.match(patternSurname)) {
        console.log('false')
        event.preventDefault()
        document.querySelector('.surnameWrong').innerText = 'Проверьте правильность ввода номера'
        document.querySelector('.formSurname').setAttribute('id', 'warning')
    } else {
        document.querySelector('.formSurname').removeAttribute('id', 'warning')
        document.querySelector('.surnameWrong').innerText = '';
    }


    if (!adres.match(patternAdres)) {
        console.log('false')
        event.preventDefault()
        document.querySelector('.adresWrong').innerText = 'Введите адрес для отправки'
        document.querySelector('.adres').setAttribute('id', 'warning')
    } else {
        document.querySelector('.adres').removeAttribute('id', 'warning')
        document.querySelector('.adresWrong').innerText = '';
    }
}