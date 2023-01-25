const mainPageMark = `Страница товаров с фильтрами +120:

1. Реализована фильтрация продуктов +40: все требования выполнены. 
- Присутствуют как минимум два блока фильтров, по девайсу и материалу, где реализован список с возможностью выбрать конкретную категорию/брэнд. (есть один дополнительный блок с сортировкой по цвету)
- Присутствуют два блока фильтров с ползунками (dual-slider), по диапазонам цены и наличию на складе.
изменение любых фильтров добавляет в query-параметры соответствующие данные, для того, чтобы при перезагрузке страницы восстанавливалось текущее состояние страницы с примененными фильтрами.
- При применении любого фильтра, динамически пересчитываются все фильтры и меняться состояние элементов в них (за исключением фильтра сортировки по цвету, т.к. он дополнительный, мы позволили себе стилизовать его как хотим и не добавлять окошки с колличеством, по причине того, что это испортило бы внешний вид). Например, при выборе определенной категории товара, в других фильтрах пересчитывается количество найденных товаров с указанием сколько найдено при такой конфигурации фильтров, а также сколько доступно без учета всех применённых фильтров. В случае с dual-slider меняется их состояние-диапазон.
2. Реализована сортировка продуктов +20: все требования выполнены.
- Присутствует возможность сортировки продуктов минимум по 2 критериям, по цене и рейтингу (от наименьшего к большему и наоборот).
- Данные сортировки (если применялась) добавляются в query-параметр адресной строки. При копировании ссылки и открытии в новом окне/перезагрузке страницы, сортировка применяется к найденным продуктам.
- При открытии в новом окне ссылки, которая содержит query-параметр сортировки, блок сортировки меняет состояние, которое указывает, какая сортировка выбрана.
3. Реализован текстовый поиск по всем данным продуктов +15: все требования выполнены.
- Присутствует input для поиска-фильтрации продуктов по любым данным. Поиск работает по всем полям продукта (название, описание, цена, кол-во на складе и т.д.) за исключением не информативных полей (id, url картинки и тд.)
- Работает одновременно с другими фильтрами
- Добавляется в query-параметры и при перезагрузке страницы восстанавливается состояние текущего поиска. Input также восстанавливает состояние и содержит поисковый текст.
4. Реализовано переключение вида найденных продуктов +10: все требования выполнены. 
- Реализована возможность переключения вида найденных товаров. Не менее двух вариантов.
добавляется в query-параметры. При перезагрузке страницы восстанавливается состояние текущего вида. 
- Выбранный режим вида выделяется.
5. Реализован роутинг с query-параметрами +10:все требования выполнены. 
- Все примененные фильтра, сортировка, вид отображения продуктов, текстовый поиск содержаться в query-параметрах и при перезагрузке страницы восстанавливают её состояние.
6. Реализованы кнопки сброса и копирования поиска +10: все требования выполнены. 
- Кнопки реализованы, кнопка копирования текущего поиска меняет состояние при нажатии на нее.
7. Реализован блок кол-ва найденных товаров +5: все требования выполнены. 
- После применение фильтров отображается кол-во найденных товаров, в случае, если товаров не нашлось, информация об этом дополнительно выводится в блоке товаров.
8. Поведение карточек найденных товаров +10: все требования выполнены. 
- Карточка товара содержит кнопку добавления в корзину. Состояние кнопки меняется при добавлении/удалении, а также восстанавливается если товар был добавлен на других страницах. Есть возможность перехода на страницу с описанием товара. 
`

const cartPageMark = `Страница корзины товаров +60:
1. Реализован блок отображения добавленных продуктов +5:
- Продукты выводятся списком, у каждого продукта присутствуют полные данные (имя, категория, цена и т.д.) и блок для управления кол-вом данного товара.
2. Реализовано увеличение кол-ва конкретного товара и его удаление +10:
- У каждого товара есть кнопка увеличения его кол-ва в корзине. При увеличении кол-ва, также изменяется состояние кол-ва и общей цены в Header-e и на странице корзины товаров. А также увеличивается общая сумма этого товара у него в списке. При этом, нельзя добавить товара больше, чем есть на складе. Информация о наличии на складе выводится.
- У каждого товара есть кнопка уменьшения его кол-ва в корзине. Если при уменьшении кол-ва товара его значения становится менее 1, то товар автоматический удаляется из корзины и текущей страницы. Также изменяется состояние кол-ва и общей цены в Header-e и на странице корзины товаров.
3. Реализована пагинация +15:
- Добавлена пагинация с выбором кол-ва товара на одной странице. При изменении кол-ва товаров на странице, автоматически пересчитывается кол-во страниц для переключения. Нельзя переключиться на несуществующую страницу. Также, при удалении товара, пагинация также пересчитывается. 

- Данные также добавляются в query-параметры, а состояние текущей выбранной страницы и лимита товаров на ней восстанавливается при перезагрузке страницы.

- Если товаров в корзине нет, то все блоки страницы скрываются и вместо них выводится соответствующее сообщение.
- Товар на каждой странице имеет порядковый номер с учетом того, сколько товаров есть до него на предыдущих страницах.
4. Хранение данных в localStorage +10:
- Данные о добавленных продуктах хранятся в localStorage и при перезагрузке страницы восстанавливаются
- Добавление и сохранение данных в localStorage происходит также и с других страниц приложения
5. Реализован промокод блок +10:
- Реализовано поле ввода промокодов. Есть возможность добавления промокода в список примененных. При добавлении каждого промокода, зачеркивается старая итоговая цена на странице корзины(итоговая цена к оплате за все товары) и отображается новая, с учетом скидки промокода. Если промокодов более одного, то суммируется их общая скидка и применяется к итоговой цене. 
- Tcnm быть возможность удаления промокода из списка примененных. Итоговая цена при этом также пересчитывается
- Реализован блок примененных промокодов, где указаны все примененные промокоды и размер скидки, которые они дают.
6. Реализована кнопка открытия модального окна оформления покупки +5:
- При клике на кнопку открывается модальное окно для оформления заказа.
7. Реализован блок с общей суммой и кол-вом всех выбранных товаров +5:
- Блок отображает сумму и кол-во всех товаров и реагирует на применение промокодов (дополнительно указывается новая цена после применения промокодов)`

const modalWindowMark = `Модальное окно оформления товара +50:

1. Реализован блок ввода персональной информации с валидацией +20:
- Добавлено поле "Имя и Фамилия". Валидация: содержит не менее двух слов, длина каждого не менее 3 символов.
- Добавлено поле "Номер телефона". Валидация: должно начинаться с '+', содержать только цифры и быть не короче 9 цифр.
- Добавлено поле "Адрес доставки". Валидация: содержит не менее трех слов, длина каждого не менее 5 символов.
- Добавлено поле "E-mail". Валидация: проверяется, является ли введенный текст электронной почтой.
2. Реализован блок ввода данных банковской карты с валидацией +20:
- Реализован ввод номера карты. Валидация: кол-во введенных цифр должно быть ровно 16, допускается ввод только цифр.
- Реализована автоматическая смена логотипа платежной системы. Если номер карты начинает с 3, устанавливается логотип ApplePay, 4 - устанавливается логотип Visa, 5 - MasterCard. Реализовано 3 платежные системы.
- Реализован блок ввода срока действия карты. Валидация: допускается ввод только цифр, месяц не может быть больше 12, длина поля равна 4. . Разделитель не учитывается и добавляется автоматически.
- Реализован блок ввод CVV кода. Валидация: длина 3 символа, допускается ввод только цифр.
3. Реализована кнопка завершения заказа +10:
- При клике на кнопку submit/confirm проверяются все поля на валидность, если у поля есть ошибки валидации, то рядом с этим полем выводится сообщение с ошибкой.
- При успешном прохождении валидации всех полей и нажатии на кнопку, выводится сообщение, что заказ оформлен. Затем, спустя 3-5 секунд происходит редирект на главную страницу магазина. Корзина при этом очищается`

const productCardMark = `Страница с описанием товара +40:

1. Реализованы блоки страницы +30:
- Присутствуют "хлебные крошки", указывающие на путь товара относительно корня сайта.
- Реализован блок с фотографиями товара, которые можно увеличивать при клике. Фотографии не содержат дубликаты/повторы.
- Реализован блок с полными данными товара (название, категория, описание, цена и т.д.)
- Присутствует кнопка добавления товара в корзину. Состояние кнопки зависит от того, есть ли товар в корзине.
- Присутствует кнопка быстрой покупки товара. При клике, если товара нет в корзине, происходит автоматическое добавление в корзину и переход на страницу корзины, с уже открытым модальным окном. Если товар уже был в корзине, повторное добавление не происходит.
2. Страница открывается в новом окне по ссылке с id/name товара +10`

const headerMark = `Header +20:

1. Header содержит корзину товаров +10:
- Присутствует корзина с количеством выбранных товаров.
- Количество выбранных товаров динамически изменяется при добавлении/удалении товара на всех страницах (корзина, карточка товара, поиск товаров). 
2. Header содержит общую сумму покупок +10:
- Присутствует блок с суммой выбранных товаров.
- Сумма выбранных товаров динамически изменяется при добавлении/удалении товара на всех страницах (корзина, карточка товара, поиск товаров).`

const page404Mark = `Страница 404 +10:

1. Страница существует +6:
-При переходе по несуществующему адресу открывается страница 404. Например, 'https://your-deploy.com/gfdgd' в случе если страницы с названием 'gfdgd' не существует.
2. Страница НЕ РЕАГИРУЕТ на некорректные query-параметры +4:
-При появлении необрабатываемых query-параметров, страница НЕ открывается. Например, 'https://your-deploy.com/?rgfg=dfoh'. Если параметр некорректен, то он НЕ ДОЛЖЕН направлять на страницу 404.`

export const allDescMark = `${mainPageMark}


${cartPageMark}


${modalWindowMark}


${productCardMark}


${headerMark}


${page404Mark}`