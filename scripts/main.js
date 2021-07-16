let myLibrary = [];
const display = document.querySelector('#display');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        let readText = ''
        if (!read) {
            readText = 'not read yet'
        } else {
            readText = 'read'
        }
        return(`${title} by ${author}, ${pages} pages, ${readText}.`)
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    myLibrary.forEach(book => {
        const bookDisplay = document.createElement('p');
        bookDisplay.classList.add('book-card');
        bookDisplay.textContent = book.info();
        display.appendChild(bookDisplay);
    });
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const lotr = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1004', false);
const foundation = new Book('Foundation', 'Isaac Asimov', '234', false);
const theQueensGambit = new Book('The Queens Gambit', 'Walter Tevis', '286', false);

addBookToLibrary(theHobbit);
addBookToLibrary(lotr);
addBookToLibrary(foundation);
addBookToLibrary(theQueensGambit);

const showLibraryBtn = document.querySelector("#show-library");

showLibraryBtn.addEventListener('click', () => {
    displayLibrary();
});
