function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;   // TAKES STRING VALUE: EITHER "read" OR "unread"
}
Book.prototype.addCard = function () {
    const card = document.createElement("div");
    card.classList.add("book");
    card.classList.add((this.read === "read") ? 'read-book' : 'unread-book');
    card.setAttribute("data-index", myLibrary.indexOf(this));
    card.innerHTML =
        `<h2>${this.title}</h2>
            <h3>by ${this.author}</h3>
            <h3>${this.pageCount} pages</h3>
            <div class="options">
                <div class="edit-but button ${(this.read === "read") ? 'read' : 'unread'}">${(this.read === "read") ? 'Read' : 'Not Read'}</div>
                <div class="delete-but button"><i class="fas fa-trash"></i></div>
        </div>`;
    const deleteBut = card.querySelector(".delete-but");
    deleteBut.addEventListener("click", deleteBook);
    const readStatusButton = card.querySelector(".edit-but");
    readStatusButton.addEventListener("click", toggleReadStatus);

    booksList.insertBefore(card, booksList.lastElementChild);
}


function assignMyLibraryToStorage() {
    let dayNightModeTemp = localStorage.getItem("day-night-mode");
    localStorage.clear();
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        for (property in book) {
            localStorage.setItem(`book${myLibrary.indexOf(book)}.${property}`, book[property]);
        }
    }
    localStorage.setItem("day-night-mode", dayNightModeTemp);
}

function initialize() {
    if (localStorage.getItem("day-night-mode") === null) {
        localStorage.setItem("day-night-mode", "day");
    }
    if (localStorage.getItem("day-night-mode") === "day") {
        switchDayNightMode();
        switchDayNightMode();
    }
    else if (localStorage.getItem("day-night-mode") === 'night') {
        switchDayNightMode();
    }

    for (let i = 0; localStorage.getItem(`book${i}.title`) !== null; i++) {
        book = new Book(
            localStorage.getItem(`book${i}.title`),
            localStorage.getItem(`book${i}.author`),
            localStorage.getItem(`book${i}.pageCount`),
            localStorage.getItem(`book${i}.read`)
        );
        myLibrary.push(book);
    }


    booksList.innerHTML =
        `<div class="book add-book button">
            <strong> <i class="fas fa-plus"></i></strong>
        </div>`;
    myLibrary.forEach((book) => {
        book.addCard();
    });
}

function addBook() {
    let title = addBookFormElement.querySelector("#add-book-title-field").value;
    let author = addBookFormElement.querySelector("#add-book-author-field").value;
    let pageCount = addBookFormElement.querySelector("#add-book-page-count-field").value;
    let read = addBookFormElement.querySelector("#add-book-read-status-field").value;
    const newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
    for (property in newBook) { //Save newBook to local Storage
        localStorage.setItem(`book${myLibrary.length - 1}.${property}`, newBook[property]);
    }
    newBook.addCard();
    toggleAddBookForm();
}

function toggleReadStatus() {
    const bookCard = findAncestorByClass(this, "book");
    if (myLibrary[bookCard.getAttribute("data-index")].read === "read") {
        myLibrary[bookCard.getAttribute("data-index")].read = "unread";
        localStorage.setItem(`book${bookCard.getAttribute("data-index")}.read`, "unread");
        bookCard.classList.remove("read-book");
        bookCard.classList.add("unread-book");
        this.classList.remove("read");
        this.classList.add("unread");
        this.textContent = "Not Read";
    }
    else {
        myLibrary[bookCard.getAttribute("data-index")].read = "read";
        localStorage.setItem(`book${bookCard.getAttribute("data-index")}.read`, "read");
        bookCard.classList.add("read-book");
        bookCard.classList.remove("unread-book");
        this.classList.add("read");
        this.classList.remove("unread");
        this.textContent = "Read";
    }
}

function toggleAddBookForm() {
    if (addBookForm.classList.contains("display-none")) {
        addBookForm.classList.remove("display-none");
        grayBackground.classList.remove("display-none");
    }
    else {
        const formElement = addBookForm.querySelector("form");
        formElement.reset();
        addBookForm.classList.add("display-none");
        grayBackground.classList.add("display-none");
    }
}

function deleteBook() {
    const bookCard = findAncestorByClass(this, "book");
    const book = myLibrary[bookCard.getAttribute("data-index")];
    myLibrary.splice(bookCard.getAttribute("data-index"), 1);
    bookCard.remove();
    assignMyLibraryToStorage();
}

function switchDayNightMode() {
    document.documentElement.style = "";
    if (dayNightModeSwitch.getAttribute("data-mode") === "day") {
        for (key in nightModePalatte) {
            document.documentElement.style.setProperty(key, nightModePalatte[key]);
            dayNightModeSwitch.setAttribute("data-mode", "night");
        }
        localStorage.setItem("day-night-mode", "night");
    }
    else if (dayNightModeSwitch.getAttribute("data-mode") === "night") {
        for (key in dayModePalatte) {
            document.documentElement.style.setProperty(key, dayModePalatte[key]);
            dayNightModeSwitch.setAttribute("data-mode", "day");
        }
        localStorage.setItem("day-night-mode", "day");
    }

    dayNightModeSwitch.querySelector("[data-value='day']").classList.toggle("display-none");
    dayNightModeSwitch.querySelector("[data-value='night']").classList.toggle("display-none");
}


const dayModePalatte = {
    "--bgcolor": "white",
    "--header-bgcolor": "rgb(0 198 189)",
    "--forecolor": "#000722",
    "--unread-book-bg": "rgb(189 189 189)",
    "--read-book-bg": "rgb(0 198 189)",
    "--add-book-button-color": "rgb(0, 94, 253)",
    "--delete-button-bg": "#000722",
    "--delete-button-color": "white",
    "--edit-button-read-bg": "rgb(255 255 255)",
    "--edit-button-unread-bg": "#000722",
    "--edit-button-unread-color": "white",
    "--popup-form-bg": "white",
    "--popup-form-color": "black",
};
const nightModePalatte = {
    "--bgcolor": "rgb(27, 0, 39)",
    "--header-bgcolor": "rgb(29 0 136)",
    "--forecolor": "white",
    "--unread-book-bg": "rgb(133 0 0)",
    "--read-book-bg": "rgb(2 115 0)",
    "--add-book-button-color": "rgb(0, 94, 253)",
    "--delete-button-bg": "#ffffff",
    "--delete-button-color": "black",
    "--edit-button-read-bg": "rgb(0 15 255)",
    "--edit-button-unread-bg": "rgb(27, 0, 39)",
    "--edit-button-unread-color": "white",
    "--popup-form-bg": "rgb(27, 0, 39)",
    "--popup-form-color": "white",

};
const dayNightModeSwitch = document.querySelector(".day-night-mode-switch");
dayNightModeSwitch.addEventListener("click", switchDayNightMode);



const myLibrary = [];
const booksList = document.querySelector("div.books-list");

initialize();

/* Post-initialization */

const grayBackground = document.querySelector(".gray-background");
grayBackground.addEventListener("click", toggleAddBookForm);

const addBookForm = document.querySelector(".popup-form#add-book-form");
const addBookFormElement = addBookForm.querySelector("form");
addBookFormElement.addEventListener("submit", addBook);

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", toggleAddBookForm);





function findAncestorByClass(node, className) {
    if (node.tagName == "HTML") {
        return undefined;
    }
    if (node.parentElement.classList.contains(className)) {
        return node.parentElement;
    }
    else {
        return findAncestorByClass(node.parentElement, className);
    }
}

const tempBooks = [
    new Book("Pride and Prejudice", "Jane Austen", 500, "read"),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 200, "unread"),
    new Book("Wuthering Heights", "Charlotte Bronte", 350, "unread"),
    new Book("The Killing of a Mockingbird", "Neil Harper Lee", 350, "read"),
    new Book("Emma", "Jane Austen", 600, "unread"),
    new Book("David Copperfield", "Charles Dickens", 800, "unread"),
    new Book("The Catcher in The Rye", "J.D. Salinger", 800, "unread"),
    new Book("The Fault in Our Stars", "John Green", 100, "read"),
];
function addTempBooks() {
    localStorage.clear();
    for (let i = 0; i < tempBooks.length; i++) {
        const book = tempBooks[i];
        for (property in book) {
            localStorage.setItem(`book${tempBooks.indexOf(book)}.${property}`, book[property]);
        }
    }
    localStorage.setItem("day-night-mode", "night");
    initialize();
}
function clear() {
    localStorage.clear();
    initialize();
}