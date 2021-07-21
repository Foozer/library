let myLibrary = [];
const display = document.querySelector('#display');
const form = document.querySelector('.book-entry-form');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.bookRead = function() {
        let readText = ''
        if (!read) {
            readText = 'Not read yet'
        } else {
            readText = 'Read'
        }
        return readText
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);    
}

function displayLibrary() {
    clearCurrentDisplay();
    form.style.display = "none";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookDisplay = document.createElement('p');
        bookDisplay.classList.add('book-card');
        bookDisplay.textContent = `Title:  ${myLibrary[i].title}\nAuthor: ${myLibrary[i].author}\nPages: ${myLibrary[i].pages}\nRead: ${myLibrary[i].bookRead()}\n`;
        display.appendChild(bookDisplay);
        const bookDeleteBtn = document.createElement('button');
        bookDeleteBtn.dataset.index = i;
        bookDeleteBtn.textContent = 'Delete';
        bookDeleteBtn.classList.add('delete-button');
        bookDisplay.appendChild(bookDeleteBtn);
        if(myLibrary[i].bookRead() === 'Not read yet') {
            const toggleReadBtn = document.createElement('button');
            toggleReadBtn.dataset.index = i;
            toggleReadBtn.textContent = 'Mark as read';
            toggleReadBtn.classList.add('toggle-read-button');
            bookDisplay.appendChild(toggleReadBtn);
        }
    }
    deleteButton();
    markAsReadButton();
}

function deleteButton() {
    const deleteBtn = document.querySelectorAll('.delete-button')
    if (deleteBtn) {
        deleteBtn.forEach(function(button) {
            button.addEventListener('click', () => {
                deleteBookFromLibrary(button.dataset.index);
            });
        })
    }
}

function deleteBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    displayLibrary();
}

function markAsReadButton() {
    const markAsReadBtn = document.querySelectorAll('.toggle-read-button');
    if (markAsReadBtn) {
        markAsReadBtn.forEach(function(button) {
            button.addEventListener('click', () => {
                changeBookReadStatus(button.dataset.index);
            });
        })
    }
}

function changeBookReadStatus(bookIndex) {
    myLibrary[bookIndex].read = true;
    console.log(myLibrary[bookIndex].read);
    displayLibrary();
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
    form.style.display = "block";
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const lotr = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1004', true);
const foundation = new Book('Foundation', 'Isaac Asimov', '234', false);
const theQueensGambit = new Book('The Queens Gambit', 'Walter Tevis', '286', true);

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

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

function checkIfBookRead() {
    let bookRead = false;
    if (read.checked == true) {
        bookRead = true;
    }
    return bookRead;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    bookRead = checkIfBookRead();
    const newBook = new Book(title.value, author.value, pages.value, bookRead);
    addBookToLibrary(newBook);
    title.value = '';
    author.value = '';
    pages.value = '';
    displayLibrary();
    //form.submit();
});

//local storage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}