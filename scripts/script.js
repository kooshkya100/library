function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}
Book.prototype.addCard = function () {
    booksList.removeChild(booksList.lastElementChild);
    booksList.innerHTML +=
        `<div class='book ${this.read ? 'read-book' : 'unread-book'}' data-index=${myLibrary.indexOf(this)}>
            <h2>${this.title}</h2>
            <h3>by ${this.author}</h3>
            <h3>${this.pageCount} pages</h3>
            <div class="options">
                <div class="edit-but button ${this.read ? 'read' : 'unread'}">${this.read ? 'Read' : 'Not Read'}</div>
                <div class="delete-but button"><i class="fas fa-trash"></i></div>
            </div>
        </div>
        <div class="book add-book button">
                <strong><i class="fas fa-plus"></i></strong>
        </div>`;
}

function initialize() {
    booksList.innerHTML =
        `<div class="book add - book button">
            < strong > <i class="fas fa-plus"></i></strong >
        </div >`;
    myLibrary.forEach((book) => {
        book.addCard();
    });
}

function addBook(title, author, read) {
    const newBook = new Book(title, author, read);
    myLibrary.push(newBook);
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

function deleteBook() {
    const bookCard = findAncestorByClass(this, "book");
    myLibrary.splice(bookCard.getAttribute("data-index"), 1);
    bookCard.remove();
}

const myLibrary = [
    new Book("Pride and Prejudice", "Jane Austen", 500, true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 200, false),
    new Book("Wuthering Heights", "Charlotte Bronte", 350, false),
    new Book("The Killing of a Mockingbird", "Neil Harper Lee", 350, true),
];
const booksList = document.querySelector("div.books-list");

initialize();

/* Post-initialization */
const readStatusButtons = document.querySelectorAll(".edit-but");
readStatusButtons.forEach((button) => {
    button.addEventListener("click", toggleReadStatus);
});

const deleteButtons = document.querySelectorAll(".delete-but");
deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteBook);
});





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
