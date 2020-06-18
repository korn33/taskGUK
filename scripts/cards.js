import {products} from './products.js';

export const cards = {
    getId: function (targetClick) {
        let idButton = targetClick.id;//берем id  места клика
        return idButton.slice(0, -2); //обрезаем последние два символа
    },

    getContent: function () {
        let that = this;
        products.forEach(function (i) {

            let isActive;
            if (i.isActive) {
                isActive = `<div class="availability-text"><span>Наличие</span></div>`;
            } else {
                isActive = `<div class="availability-text-none"><span>Товар временно отсутствует</span></div>`;
            }

            let nameUnit;
            switch (i.unitFull) {
                case 'упаковка': nameUnit = 'упаковками';
                    break;
                case 'штука': nameUnit = 'штуками';
                    break;
                case 'метр погонный': nameUnit = 'метрами погонными';
                    break;
                case 'комплект': nameUnit = 'комплектами';
                    break;
                default: nameUnit = i.unitFull;
            }

            // наполнение строки "Может понадобиться" ссылками
            let arrAssocProducts = i.assocProducts.split('\n');
            let strAssocProducts = '';
            arrAssocProducts.forEach(function (link) {
                strAssocProducts = strAssocProducts + `<a href="#">${link}</a> `
            });
            // получение расширения картинки
            let imgExtension = i.primaryImageUrl.slice(-4);

            //наполение контейнера карточками товаров
            let placeForCard = document.querySelector('.container');
            placeForCard.insertAdjacentHTML('beforeend', `
                <div class="card">
                    <div class="child-block img-block">
                        <a href="#"><img src="https:${i.primaryImageUrl.slice(0, -4)}_220x220_1${imgExtension}" alt=""></a>
                    </div>
                    <div class="child-block description-block">
                        <div class="code">
                            <span>Код: ${i.code}</span>
                        </div>
                        <div class="title">
                            <a href="#">${i.title}</a>
                        </div>
                        <div class="description">
                            <p><strong>Описание:</strong> ${i.description}</p>
                        </div>
                        <div class="description">
                            <p><strong>Могут понадобиться:</strong> <span>${strAssocProducts}</span></p>
                        </div>
                        <div class="weight">
                            <span>Вес: ${i.weight} гр.</span>
                        </div>
                    </div>
                    <div class="child-block buy-block">
                        <div class="availability">
                            ${isActive}
                        </div>
                        <div class="price">
                            <div class="card-club-block">
                                <div class="card-club-block-p"><span>По карте <br> клуба</span></div>
                                <div class="price-value"  id="${i.productId}PG"><span>${i.priceGold} </span><div class="rouble"></div></div>
                            </div>
                            <div class="not-club-block" id="${i.productId}PR"><span>${i.priceRetail} </span><div class="rouble rouble-gray"></div></div>
                            <div class="bonus-price"><span>Получить ${i.bonusAmount} бонусов при покупке</span></div>
                        </div>
                        <div class="sales-mode">
                            <span class="mode-origin" id="${i.productId}Or">${i.unitFull}</span>
                            <span class="mode-alt" id="${i.productId}Al">${i.unitFullAlt}</span>
                        </div>
                        <div class="info">
                            <span class="info-img"></span>
                            <p class="info-p">Продается ${nameUnit}: <br> ${i.unitRatio} ${i.unit} = ${i.unitRatioAlt} ${i.unitAlt}</p>
                        </div>
                        <div class="info-img-2"></div>
                        <div class="shopping-cart">
                            <div class="counter-block">
                                <input class="quantity" type="number" min="1" value="1" id="${i.productId}IN">
                                <button class="quantityPlus" id="${i.productId}++"> </button>
                                <button class="quantity-" id="${i.productId}--">  </button>
                            </div>
                                <button class="cart" data-product-id="${i.productId}"> 
                                <svg class="ic ic_cart">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                                </svg>
                                <span>В КОРЗИНУ</span>
                            </button>
                        </div>
                    </div>
                </div>
            `);

            // назначение каждой карточке своего обработчика кликов переключения режимов unit и unitAlt
            document.addEventListener('click',function (e) {
                let targetClick = e.target; // запоминаем куда кликнули
                //если кликнули по альтернативному, то меняем местами подсветку режимов, id, чтобы потом можно было менять обратно и заменяем цены
                if (targetClick.classList.contains('mode-alt')) {
                    let idSecondMode;
                    targetClick.classList.remove('mode-alt');
                    targetClick.classList.add('mode-origin');
                    let idThisCard = that.getId(targetClick);
                    if (targetClick.id === idThisCard + 'Or') {
                        idSecondMode = idThisCard + 'Al';
                        let cardPrice = document.getElementById(idThisCard + 'PG');
                        cardPrice.innerHTML = `${i.priceGold} <div class="rouble">`;
                        let notCardPrice = document.getElementById(idThisCard + 'PR');
                        notCardPrice.innerHTML = `${i.priceRetail} <div class="rouble rouble-gray">`;
                    } else if (targetClick.id === idThisCard + 'Al')  {
                        idSecondMode = idThisCard + 'Or';
                        let cardPrice = document.getElementById(idThisCard + 'PG');
                        cardPrice.innerHTML = `${i.priceGoldAlt} <div class="rouble">`;
                        let notCardPrice = document.getElementById(idThisCard + 'PR');
                        notCardPrice.innerHTML = `${i.priceRetailAlt} <div class="rouble rouble-gray">`;
                    }
                    let secondMode = document.getElementById(idSecondMode);
                    secondMode.classList.toggle('mode-alt');
                    secondMode.classList.toggle('mode-origin');
                }
            });
        });
    },
};