let bookOne = new Book("War and Peace","Leo Tolstoy", 1225, false);
let bookTwo= new Book(`You don't know JS`, "Kyle Simpson", 67, false);

let myLibrary = [bookOne, bookTwo];

//constructor
function Book(title, author, pages, isRead)
{
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isRead=isRead;
}

//creating function like this so it's not called every time Book object created
//all book objects will inherit this
Book.prototype.info = function() {
    return `Title: ${this.title}
    Author: ${this.author}
    Pages: ${this.pages}
    isRead: ${this.isRead}`;
}

function addBookToLibrary()
{
    let title=prompt("Input title:");
    let author=prompt("Input author:");
    let pages=prompt("Input pages:");
    let isRead=prompt("Input true if read or false if not read:");
    myLibrary.push(new Book(title, author, pages, isRead));
}