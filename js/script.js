/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        bg = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type = "checkbox"]');


    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value.toUpperCase();
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0,22)}...`
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm);
            sortMovies(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }
        addForm.reset()
    })

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        })
    }


    const makeChanges = () => {
        genre.textContent = 'драма'
        bg.style.cssText = 'background: url(../img/bg.jpg) center center/cover no-repeat'
    }


    const sortMovies = (films) => {
        films.sort();
    }


    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortMovies(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});