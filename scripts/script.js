function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}
Book.prototype.addCard = function () {
    const card = document.createElement("div");
    card.classList.add("book");
    card.classList.add(this.read ? 'read-book' : 'unread-book');
    card.setAttribute("data-index", myLibrary.indexOf(this));
    card.innerHTML =
        `<h2>${this.title}</h2>
            <h3>by ${this.author}</h3>
            <h3>${this.pageCount} pages</h3>
            <div class="options">
                <div class="edit-but button ${this.read ? 'read' : 'unread'}">${this.read ? 'Read' : 'Not Read'}</div>
                <div class="delete-but button"><i class="fas fa-trash"></i></div>
        </div>`;
    const deleteBut = card.querySelector(".delete-but");
    deleteBut.addEventListener("click", deleteBook);
    const readStatusButton = card.querySelector(".edit-but");
    readStatusButton.addEventListener("click", toggleReadStatus);

    booksList.insertBefore(card, booksList.lastElementChild);
}

function initialize() {
    booksList.innerHTML =
        `<div class="book add-book button">
            <strong> <i class="fas fa-plus"></i></strong>
        </div>`;
    myLibrary.forEach((book) => {
        book.addCard();
    });

    switchDayNightMode();
    switchDayNightMode();
}

function addBook() {
    let title = addBookFormElement.querySelector("#add-book-title-field").value;
    let author = addBookFormElement.querySelector("#add-book-author-field").value;
    let pageCount = addBookFormElement.querySelector("#add-book-page-count-field").value;
    let read = addBookFormElement.querySelector("#add-book-read-status-field").value;
    const newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
    newBook.addCard();
    toggleAddBookForm();
}

function toggleReadStatus() {
    const bookCard = findAncestorByClass(this, "book");
    if (myLibrary[bookCard.getAttribute("data-index")].read === true) {
        myLibrary[bookCard.getAttribute("data-index")].read = false;
        bookCard.classList.remove("read-book");
        bookCard.classList.add("unread-book");
        this.classList.remove("read");
        this.classList.add("unread");
        this.textContent = "Not Read";
    }
    else {
        myLibrary[bookCard.getAttribute("data-index")].read = true;
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
    myLibrary.splice(bookCard.getAttribute("data-index"), 1);
    bookCard.remove();
}

function switchDayNightMode() {
    document.documentElement.style = "";
    if (dayNightModeSwitch.getAttribute("data-mode") === "day") {
        for (key in nightModePalatte) {
            document.documentElement.style.setProperty(key, nightModePalatte[key]);
            dayNightModeSwitch.setAttribute("data-mode", "night");
        }  
    }
    else if (dayNightModeSwitch.getAttribute("data-mode") === "night") {
        for (key in dayModePalatte) {
            document.documentElement.style.setProperty(key, dayModePalatte[key]);
            dayNightModeSwitch.setAttribute("data-mode", "day");
        }
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


const myLibrary = [
    new Book("Pride and Prejudice", "Jane Austen", 500, true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 200, false),
    new Book("Wuthering Heights", "Charlotte Bronte", 350, false),
    new Book("The Killing of a Mockingbird", "Neil Harper Lee", 350, true),
    new Book("Emma", "Jane Austen", 600, false),
];
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
