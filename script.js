var gallery = document.querySelector('.gallery');
var body = document.getElementsByTagName('body')[0];

window.onload = createCard();
window.onload = createModalCard();
window.onload = createModalOrder();

var cards = document.getElementsByClassName('galitem');
for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', showModalGood);
};

var buy = document.getElementsByClassName('buygame');
for (var i = 0; i < buy.length; i++){
    // cards[i].removeEventListener('click', showModalGood);
    buy[i].onclick = showModalOrder;
};

var small = document.getElementsByClassName('small_Img');
for (var i = 0; i < small.length; i++){
    small[i].onclick = showBig;
};

//------------------------------------------------------
//Заполнение галереи карточками товаров
function createCard(){
    for (var i = 0; i < goods.length; i++){
        var card = document.createElement('div');
        card.className = ('galitem');
        card.id = ('card_' + i);
        var imgGal = document.createElement('img');
        imgGal.src = goods[i].photoForGallery[0];
        card.insertAdjacentElement('afterbegin', imgGal);
        var title = document.createElement('p');
        title.id = ('title_' + i);
        title.innerText = goods[i].title;
        card.appendChild(title);
        var price = document.createElement('p');
        price.innerText = 'Цена: ' + goods[i].price + ' руб.';
        price.id = ('price_' + i);
        price.style.fontSize = '16px';
        price.style.fontWeight= '600';
        card.appendChild(price);
        var buy = document.createElement('a');
        buy.id = ('buy_' + i);
        buy.className = 'buy';
        buy.innerText = 'КУПИТЬ';
        buy.href = '#';
        card.appendChild(buy);
        var over = document.createElement('div');//подложка
        over.className = ('over1');
        over.id = ('over_' + i);
        card.appendChild(over);
        gallery.appendChild(card);
    };
};

//модальное окно на каждую карточку товара
function createModalCard(){
    for (i = 0; i < goods.length; i++){
        var modalGood = document.createElement('div');
        modalGood.className = 'modalGood';
        modalGood.id = 'modalGood_' + i;
        body.insertAdjacentElement('beforeend', modalGood);
        var modalGoodContent = document.createElement('div');
        modalGoodContent.className = 'modalGood_content';
        modalGoodContent.id = 'modalGoodContent' + i;
        modalGood.appendChild(modalGoodContent);
        var closeModalGood = document.createElement('span');
        closeModalGood.className = 'close_modal';
        closeModalGood.id = 'closeModalGood_' + i;
        closeModalGood.innerText = 'X';
        modalGoodContent.appendChild(closeModalGood);
        var gameCard = document.createElement('div');
        gameCard.className = 'gamecard';
        modalGoodContent.appendChild(gameCard);
        var leftPart = document.createElement('div');
        leftPart.className = 'leftpart';
        gameCard.appendChild(leftPart);
        var content = document.createElement('div');
        content.id = 'cont_Big' + i;
        content.style.height = '320px';
        var bigImg = document.createElement('img');
        bigImg.className = 'mainimg';
        bigImg.src = goods[i].bigPhoto[0];
        bigImg.style.height = '280px';
        content.appendChild(bigImg);
        leftPart.appendChild(content);
        var gal = document.createElement('ul');
        gal.className = 'shedule';
        for (var n = 0; n < goods[i].smallPhoto.length; n++){
            var li = document.createElement('li');
            li.className = 'kartinki';
            li.id = 'li_' + n;
            var smallImg = document.createElement('img');
            smallImg.className = 'small_Img';
            smallImg.id = 'small_' + i + '_' + n;
            smallImg.src = goods[i].smallPhoto[n];
            li.appendChild(smallImg);
            gal.appendChild(li);
        }
        leftPart.appendChild(gal);
        var rightPart = document.createElement('div');
        rightPart.className = 'rightpart';
        gameCard.appendChild(rightPart);
        var modalTitle = document.createElement('p');
        modalTitle.className = 'ascreed';
        modalTitle.innerText = goods[i].title;
        rightPart.appendChild(modalTitle);
        var modalPrice = document.createElement('p');
        modalPrice.className = 'cost';
        modalPrice.innerText = goods[i].price + ' руб.';
        rightPart.appendChild(modalPrice);
        var modalBuy = document.createElement('a');
        modalBuy.className = 'buygame';
        modalBuy.innerText = 'КУПИТЬ';
        modalBuy.id = 'modalBuy_' + i;
        rightPart.appendChild(modalBuy);
        var modalDiscr = document.createElement('p');
        modalDiscr.className = 'gametext';
        modalDiscr.innerText = goods[i].longDiscr;
        rightPart.appendChild(modalDiscr);
    }

}

//открытие модального окна карточки товара
function showModalGood(event){
    var card = event.target;
    var cardNum = card.id.split("_")[1];
    var modal = document.getElementById('modalGood_' + cardNum);
    var close = document.getElementById('closeModalGood_' + cardNum);
    modal.style.display = 'block';
    close.onclick = function(){
        modal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

//показ больших фото в галерее при клике на малое фото
function showBig(event){
    var smImg = event.target;
    var windowNum = smImg.id.split('_')[1];
    var cont = document.querySelector('#cont_Big' + windowNum);
    var path = this.src.split('/');
    cont.innerHTML = '';
    newSrc = 'img/' + path[4] + '/big/' + path[6];
    newBig = document.createElement('img');
    newBig.className = 'mainimg';
    newBig.style.width = '500px';
    newBig.src = newSrc;
    cont.appendChild(newBig);
    newBig.onerror = () => {
        cont.innerText = 'Ошибка загрузки фото';
        cont.style.height = '320px';
    }
}

//модальное окно для заказа на каждую карточку товара
function createModalOrder(){
    for (i = 0; i < goods.length; i++){
        var modalOrder = document.createElement('div');
        modalOrder.className = 'modalOrder';
        modalOrder.id = 'modalOrder_' + i;
        body.insertAdjacentElement('beforeend', modalOrder);
        var modalOrderContent = document.createElement('div');
        modalOrderContent.className = 'modalOrder_content';
        modalOrderContent.id = 'modalOrderContent' + i;
        modalOrder.appendChild(modalOrderContent);
        var closeModalOrder = document.createElement('span');
        closeModalOrder.className = 'close_modal_order';
        closeModalOrder.id = 'closeModalOrder_' + i;
        closeModalOrder.innerText = 'X';
        modalOrderContent.appendChild(closeModalOrder);
        var title = document.createElement('h3');
        title.innerText = goods[i].title;
        title.className = 'orderTitle';
        modalOrderContent.appendChild(title);
        var stock = document.createElement('p');
        stock.innerText = 'Остаток на складе: ' + goods[i].quant + ' шт.';
        modalOrderContent.appendChild(stock);  
        var p = document.createElement('p');
        p.innerText = 'Укажите количество к заказу:';
        modalOrderContent.appendChild(p);
        var input = document.createElement('input');
        input.type = 'number';
        input.id = 'quantOrder_' + i;
        input.className = 'quantOrder';
        modalOrderContent.appendChild(input);
        var block = document.createElement('div');
        block.className = 'yesNo';
        var ok = document.createElement('p');
        ok.className = 'ok';
        ok.id = 'ok_' + i;
        ok.innerText = 'OK'
        var cancel = document.createElement('p');
        cancel.className = 'cancel';
        cancel.id = 'cancel_' + i;
        cancel.innerText = 'ОТМЕНА'
        block.appendChild(ok);
        block.appendChild(cancel);
        modalOrderContent.appendChild(block);
    }  
}
//открытие модального окна для заказа товара
function showModalOrder(event){
    var button = event.target;
    var num = button.id.split("_")[1];
    var modalOrder = document.getElementById('modalOrder_' + num);
    var closeOrder = document.getElementById('closeModalOrder_' + num);
    var cancel = document.getElementById('cancel_' + num);
    modalOrder.style.display = 'block';
    closeOrder.onclick = function(){
        modalOrder.style.display = 'none';
    };
    cancel.onclick = function(){
        modalOrder.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == modalOrder) {
            modalOrder.style.display = "none";
        }
    }
};