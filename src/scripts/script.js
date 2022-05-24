 // Список курсов
 let courses = [{
         name: "Courses in England",
         prices: [0, 100]
     },
     {
         name: "Courses in Germany",
         prices: [500, null]
     },
     {
         name: "Courses in Italy",
         prices: [100, 200]
     },
     {
         name: "Courses in Russia",
         prices: [null, 400]
     },
     {
         name: "Courses in China",
         prices: [50, 250]
     },
     {
         name: "Courses in USA",
         prices: [200, null]
     },
     {
         name: "Courses in Kazakhstan",
         prices: [56, 324]
     },
     {
         name: "Courses in France",
         prices: [null, null]
     },
 ];
 const rezult = document.getElementById('list');
 let price = 0;

 // Определение цены - диапазон или одна цена для дальнейшего вывода на страницу
 function checkPrice(index) {
     if (courses[index].prices[0] != null) {
         if (courses[index].prices[1] != null) {
             price = `${courses[index].prices[0]} - ${courses[index].prices[1]}`;
         } else {
             price = `${courses[index].prices[0]}`;
         }
     } else {
         if (courses[index].prices[1] != null) {
             price = `${courses[index].prices[1]}`;
         } else {
             price = 'Бесплатно';
         }
     }
 }

 // Вывод курсов на страницу

 rezult.innerHTML = '';
 for (let i = 0; i < courses.length; i++) {
     checkPrice(i);
     rezult.innerHTML += `<div class="card"><h3 class="title">${courses[i].name}</h3><span class="price">Цена: ${price} ₽</span></div>`
 }



 const minCost = document.getElementById('min-cost');
 const maxCost = document.getElementById('max-cost');
 const btnSearch = document.getElementById('search');

 let mistake = document.getElementById('validation');

 btnSearch.addEventListener('click', () => {
     if (isNaN(parseFloat(minCost.value)) && isNaN(parseFloat(maxCost.value))) {
         rezult.innerHTML = 'Нет подходящих курсов'
     } else {
         filterPrices(parseFloat(minCost.value), parseFloat(maxCost.value))
         //filterPrices(minCost.value, maxCost.value)
     }

 })

 // Функция фильтрации
 function filterPrices(min, max) {
     rezult.innerHTML = '';

     if (!isNaN(min) && isNaN(max)) { // Если "от" не пустое, а "до" пустое
         for (let i = 0; i < courses.length; i++) {
             checkPrice(i)
             if (min <= courses[i].prices[0]) {
                 rezult.innerHTML += `<div class="card"><h3 class="title">${courses[i].name}</h3><span class="price">Цена: ${price} ₽</span></div>`
             }
         }
     } else if (isNaN(min) && !isNaN(max)) { // Если "от" пустое, а "до" не пустое
         for (let i = 0; i < courses.length; i++) {
             checkPrice(i)
             if (max >= courses[i].prices[0] && max >= courses[i].prices[1]) {
                 rezult.innerHTML += `<div class="card"><h3 class="title">${courses[i].name}</h3><span class="price">Цена: ${price} ₽</span></div>`
             }
         }
     } else { // Если оба input не пустые
         if (min > max) { // Блокирование 
             minCost.style.border = 'solid 1px rgb(192, 59, 59)';
             minCost.style.color = 'rgb(192, 59, 59)';
             setTimeout("minCost.style.border = 'none'", 5000);
             setTimeout("minCost.style.color = 'rgb(129, 129, 129)'", 5000);
         } else {
             for (let i = 0; i < courses.length; i++) {
                 checkPrice(i)

                 if (min <= courses[i].prices[0] && max >= courses[i].prices[1]) {
                     rezult.innerHTML += `<div class="card"><h3 class="title">${courses[i].name}</h3><span class="price">Цена: ${price} ₽</span></div>`
                 }

             }
         }

     }
 }