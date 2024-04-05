<a name="Початок"></a>

# Верстка сайту-інтернет магазину з використанням: Next.js, typescript, mui, axios, scss

### Привіт, я Денис і я розробив сайт на нексті. Функціонал сайтам виглядає наступним чином: при запуску сайту - він робить запит на АПІ dummyjson.com, з якого отримує масив зі 100 продуктів. Відразу після цього він відправляє список продуктів через юзер-хук useDate, де він первинно обробляє інформацію, далі передає її в юзер-хук usePagination, де у свою чергу список продуктів проходить через сортування фільтрами, а потім ділиться на рівні частини (по 10 товарів ), залишки відправляє на окрему сторінку

### Я використав App router, тому кореневим файлом сайту є index.tsx. У ньому відбувається рендер шапки сайту (компонент Header) та блоку з елементами самого магазину. При зміні фільтрів сайт повторно запитує пагінацію з урахуванням нових фільтрів сортування

### Ти можеш переглянути [короткий відео-огляд](https://youtu.be/7v63nQyv3Po), а можеш почитати цей пост. Також додам, що це мій перший проект з використанням Next.js та TypeScript

### Главы

- [Початок](#Початок)
- [Отримання списку продуктів](#получение_списка_продуктов)
- [Юзер-хуки](#Юзер-хуки)
- [Компоненти](#Компоненти)
- [Інші елементи](#Інші_елементи)
- [Git](#Git)
- [Використані компоненти](#компоненти_список)

<a name="получение_списка_продуктов"></a>

## Отримання списку продуктів ([Початок](#Початок))

### При першому запуску сайту сайт робить запит за допомогою бібліотеки Axios на сервіс dummyjson ([повна адреса запиту](https://dummyjson.com/products/?limit=100)). Для отримання списку зі 100 продуктів - наприкінці запиту вказується ?limit=100. Дані з відповіді на запит передаються в 2 юзер-хуки, useDate і useHook, докладніше нижче

![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/1.png)

<a name="Юзер-хуки"></a>

## Юзер-хуки ([Початок](#Початок))

### Сайт використовує 2 юзерхуки:

### useData - хук обробки інформації. З усіх продуктів хук витягує бренди/категорії, після чого повертає список продуктів, усередині якого будуть масиви з унікальними брендами та категоріями, що надалі використовуватиметься для фільтрів;

### usePagination - даний хук відразу формує новий масив продуктів, який відповідатиме списку фільтрів (підходити за ціною, брендами, категоріями), вже після цього займається сортуванням (новизною, ціною і т.д.). Якщо після першої фільтрації до нового масиву нічого не потрапило - йому присвоюється масив з усіма продуктами. Ну і у фіналі – новий список продуктів повертається вже у масиві, усередині якого вкладені масиви, по 10 продуктів у кожному. Цей хук викликається при оновленні станів фільтрів

<a name="Компоненти"></a>

## Компоненти ([Початок](#Початок))

### Як я писав раніше – сайт використовує апп роутинг, тому головний файл для сайту – index.tsx. Усередині нього вже йде рендеринг шапки сайту (Header.tsx) та основної частини сайту (Shop.tsx). У шапці сайту знаходиться іконка кошика, яка показує кількість предметів у ній (на даний момент це весь функціонал кошика, можливо пізніше я його оновлю)

### Shop.tsx так само ділиться на 2 частини: верхня, з сортуванням + нижня. Нижня ділиться на: фільтри + картки товару. У сортуванні ми можемо шукати товар за заголовком, або ж сортувати товар за новизною, ціною та рейтингом. Кнопка пошуку цієї частини сайту має лише дикоративну функцію. У фільтрах у нас є 2 акардіони з чексбоксами брендів та категорій (які беруться зі стану продуктів, куди в свою чергу потрапляють після користувача-хука useData). Також нижче акардіонів знаходиться слайдер з 2 кружками для вибору діапазону цін. На обох кінцях слайдера є показники мін та макс значень (зліва слайдера мін, справа макс), а також є інпути, всередині яких відображається актуальне значення мін та макс значень (і за допомогою яких можна змінювати те саме значення, користуючись інпутами замість слайдерів) . Праворуч від фільтрів у нас є картки з товарами. На картках показано таку інормацію: головна фотографія товару, % знижки, іконка для додавання товару в кошик, назва, рейтинг, ціна після знижки та ціна до знижки. Спочатку іконка для додавання товару в кошик напівпрозора та чорна. Після натискання – товар потрапляє у кошик, а іконка стає непрозорою, колір змінюється на червоний. Повторним кліком ми прибираємо товар із кошика. Якщо ми клацаємо на картку товару – відкриється сторінка з товаром, а всі інші елементи на екрані (крім шапки сайту) – пропадуть. Усередині товару ми бачимо більш докладну інформацію, а так само в окремий контейнер розміщені всі фотографії товару (гортати фотографії можна користуючись горизонтальним скролл-баром). З цієї ж сторінки ми можемо додати/прибрати товар у кошик, а також повернуться назад у меню. Внизу всіх товарів на головній сторінці ми бачимо пагінацію сайту

### Також використовувався компонент ProductItem. Що б було простіше та зручніше – я виніс картку продукту в цей компонент. При рендеринг карток товару на сторінці - просто список продуктів перебирається з масиву, виводячи компонент з потрібними пропсами

![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/2.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/3.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/4.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/5.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/6.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/7.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/8.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/9.png)
![screen](https://github.com/DenisGradov/first-next-shop/blob/main/git-img/10.png)
<br/>
<a name="Інші_елементи"></a>

## Прочие элементы ([Початок](#Початок))

### При розробці сайту я використовував інші елементи, в основному - інтерфейси MUI бібліотеки, такі як: слайдер, кнопки, аккардіони і т.д. Я не думаю, що їм потрібно приділяти багато часу. Просто знайте, що вони є

<a name="Git"></a>

## Git ([Початок](#Початок))

### Так само в проекті я використовував контроль версій гіт, роблячи комміти на різних стадіях (гіт я почав використовувати в проекті не відразу при створенні). В один з моментів довелося навіть робити злиття гілок, щоб відкотити той жах, що я накодив :D

<a name="компоненти_список"></a>

## Використані компоненти ([Початок](#Початок))

| Название компонента                      | Значение                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| index.tsx                                | Рендеринг шапки та головної частини сайту, запит до АПІ, виклик пагінації та інші важливі функції |
| Header.tsx                               | Шапка сайту                                                                                       |
| ProductItem.tsx                          | Картка товару                                                                                     |
| AccordionIndeterminateCheckbox.еsx       | MUI компонент Акордеон зі списком фільтрів                                                        |
| AccordionIndeterminateCheckboxMobile.tsx | MUI компонент Акордеон зі списком фільтрів для мобільної версії сайту                             |
| IndeterminateCheckbox.tsx                | MUI компонент Чексбокси для брендів та категорій (для фільтрів)                                   |
| Input.tsx                                | MUI компонент Інпут для пошуку за заголовком                                                      |
| PaginationOutlined.tsx                   | MUI компонент пагінації                                                                           |
| UnstyledButtonsSimple(2,3).tsx           | MUI компонент кнопок: пошук, назад, кошик                                                         |
| UnstyledSelectBasic.tsx                  | MUI компонент випадаючого списку сортування                                                       |

### Подивитися сайт ви можете тут: [сайт](https://first-next-shop-razreslaw-denisgradovs-projects.vercel.app)

### При використанні сайту може знадобитися [розширення](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf), якщо виникатиме помилка CORS
