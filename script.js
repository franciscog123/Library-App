"use strict";

let para;

let myLibrary=[];
myLibrary=JSON.parse(localStorage.getItem('library'));

//adding books if there are none in localStorage
if(myLibrary == null || myLibrary.length==0)
{
    addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
    addBookToLibrary(`You don't know JS`, "Kyle Simpson", 67, false);
    addBookToLibrary(`The HitchHiker's Guide to the Galaxy`, 'Arthur Dent', 208, false);
}

function populateStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

//remapping myLibrary array as a new book object. When the array is retrieved from localStorage, 
//the prototype is lost since Json.parse only converts a JSON string into regular javascript object.
//so the toggleReadStatus prototype method can't be called without this workaround. 
myLibrary.forEach(function(item, index,arr)
{
    arr[index]=new Book(arr[index].title, arr[index].author,arr[index].pages, arr[index].isRead);
})

let booksContainer;
//let table;
let container = document.querySelector('.container');

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

Book.prototype.toggleReadStatus = function() { 
    this.isRead = !this.isRead;
    populateStorage();
}

render(myLibrary);


function addBookToLibrary(title, author, pages, isRead)
{
    if(myLibrary != null && myLibrary.length == 0)
    {
        if(para!=null)
            para.remove();  
    }
    if(myLibrary==null)
        myLibrary=[];
    myLibrary.push(new Book(title, author, pages, isRead));
    populateStorage();  
}

function render(array)
{
    //if array isn't empty, display objects in table
    if(Array.isArray(array) && array.length)
    {
        booksContainer=document.createElement("div");
        booksContainer.setAttribute("class", "booksContainer");
        container.append(booksContainer);

        let card;

        //generateBookCards
        array.forEach((item, index)=> 
        {
            card = document.createElement("div");
            card.setAttribute("class","bookCard");
            booksContainer.appendChild(card);

            let bookCardTop=document.createElement("div");
            bookCardTop.setAttribute("class","bookCard-top");
            card.appendChild(bookCardTop);

            //add google material icon and use it as delete button
            let i = document.createElement('i');
            i.className = 'material-icons md-18';   
            let text = document.createTextNode('delete');
            i.appendChild(text);
            bookCardTop.appendChild(i);
            i.setAttribute("data-key", index);
            i.addEventListener("click", deleteRow);

            let title=document.createElement("div");
            title.setAttribute("class", "title");
            title.textContent=item.title;
            bookCardTop.appendChild(title);

            let author = document.createElement("div");
            author.setAttribute("class","author");
            author.textContent=item.author;
            bookCardTop.appendChild(author);

            let bookCardBottom=document.createElement("div");
            bookCardBottom.setAttribute("class", "bookCard-bottom");
            card.appendChild(bookCardBottom);

            let pages=document.createElement("div");
            pages.setAttribute("class","pages");
            pages.textContent=item.pages;
            bookCardBottom.appendChild(pages);

            let isReadDiv=document.createElement("div");
            isReadDiv.setAttribute("class","isRead");
            isReadDiv.textContent="Read it?"
            bookCardBottom.appendChild(isReadDiv);

            //add isRead button and use it an edit button to modify the isRead status
            let isReadButton = document.createElement('button');
            isReadButton.className = 'isReadButton';   
            isReadButton.textContent=item.isRead;
            isReadDiv.appendChild(isReadButton);

            isReadButton.setAttribute("data-key", index);
            isReadButton.addEventListener("click", (e) => {

                let readStatusIndex=e.target.dataset.key;
                let readStatus=myLibrary[readStatusIndex];
                myLibrary[readStatusIndex].toggleReadStatus();
                booksContainer.remove();
                render(myLibrary);
            });

            if (isReadButton.textContent=="false")
            isReadButton.textContent="no";
            else if (isReadButton.textContent=="true")
            isReadButton.textContent="yes";
        });
    }
    else
    {
        //let user know if no objects
        para = document.createElement("p");
        para.setAttribute("id","myPara");
        para.textContent="Uh oh! You don't have any books. Try adding some."
        container.appendChild(para);
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function submitForm(e)
{
    let nameInput=document.querySelector("input[name='nameInput']");
    let authorInput=document.querySelector("input[name='authorInput']");
    let pagesInput=document.querySelector("input[name='pagesInput']");
    let isRead=document.querySelector("input[name='isReadInput']");

    if((nameInput.value !== null && nameInput.value !=="") && (authorInput.value !== null && authorInput.value !== "") && (pagesInput.value !== null && pagesInput.value !== ""))
    {
        addBookToLibrary(nameInput.value, authorInput.value, pagesInput.value, isRead.checked);
        nameInput.value="";
        authorInput.value="";
        pagesInput.value="";
        if(typeof booksContainer !== 'undefined')
            booksContainer.remove();
        render(myLibrary);
    }
}

function deleteRow(e)
{
    let row=e.target.dataset.key;
    myLibrary.splice(row,1)
    booksContainer.remove();
    populateStorage();
    render(myLibrary);
}