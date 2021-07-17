let myLibrary = [];
const display = document.querySelector('#display');
const bookEntryForm = document.querySelector('.book-entry-form');

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
    clearCurrentDisplay();
    bookEntryForm.style.display = "none";
    myLibrary.forEach(book => {
        const bookDisplay = document.createElement('p');
        bookDisplay.classList.add('book-card');
        bookDisplay.textContent = `Title:  ${book.title}\nAuthor: ${book.author}\nPages: ${book.pages}\nRead: ${book.read}`;
        display.appendChild(bookDisplay);
    });
}

function clearCurrentDisplay() {
    let bookDisplay = display.lastElementChild;
    while (bookDisplay) {
        display.removeChild(bookDisplay);
        bookDisplay = display.lastElementChild;
    }
}

function addBook() {
    clearCurrentDisplay();
    bookEntryForm.style.display = "block";
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

const addBookBtn = document.querySelector("#add-book");

addBookBtn.addEventListener('click', () => {
    addBook();
});
