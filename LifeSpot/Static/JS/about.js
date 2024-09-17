/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
* 
* */
function newComment() {
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true
        return
    }

    // Запросим текст
    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    // Сохраним текущее время
    this.date = new Date().toLocaleString()
}
function getComment() {
    // Создаем объект обычного комментария
    let comment = new newComment();

    if (comment.empty) {
        return;
    }
    
    
    // Запросим, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?')

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment)
        // и добавим ему нужное свойство
        review.rate = 0;

        // Добавляем отзыв с возможностью пользовательских оценок
        writeReview(review)
    } else {
        // Добавим простой комментарий без возможности оценки
        writeReview(comment)
    }
}

/*
* Запишем отзыв на страницу 
* 
* */
function writeReview(review) {
    let likeCounter = '';
    let commetnId = Math.random();
    // Для проверки, является ли объект отзывом, используем свойство hasOwnProperty
    if (review.hasOwnProperty('rate')) {
        likeCounter += '<button id ="'+commetnId+'" onclick="addLike(this.id)">' + '❤️ '+ review.rate+'</button>';
    }

    // Запишем результат
    document.getElementsByClassName('reviews')[0].innerHTML += ' <div class="review-    text">\n' + `<p> <i> <b>${review['author']}</b> ${review['date']}${likeCounter}</i></p>` + `<p>${review['text']}</p>` + '</div>';
}
function addLike(id) {
    let elem = document.getElementById(id);
    let array = elem.innerText.split(' ')
    let resultNum = parseInt(array[array.length - 1], 10);
    resultNum += 1
    array[array.length - 1] = `${resultNum}`
    elem.innerText = array.join(' ')
}