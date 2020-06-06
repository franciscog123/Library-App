"use strict";

let bookOne = new Book("War and Peace","Leo Tolstoy", 1225, false);
let bookTwo= new Book(`You don't know JS`, "Kyle Simpson", 67, false);
let bookThree= new Book(`The HitchHiker's Guide to the Galaxy`, 'Arthur Dent', 208, false);

let myLibrary = [bookOne, bookTwo, bookThree];
let table;

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

render(myLibrary);


function addBookToLibrary(title, author, pages, isRead)
{
    myLibrary.push(new Book(title, author, pages, isRead));
}

function render(array)
{
    //if array isn't empty, display objects in table
    if(Array.isArray(array) && array.length)
    {
        table=document.createElement("Table");
        table.setAttribute("class","myTable");
        container.appendChild(table);

        let header;
        let row;

        row = document.createElement("tr");
            row.setAttribute("class","myTR");
            table.appendChild(row);

        //generate table headers
        for (let value of Object.keys(new Book)) 
        {
            header=document.createElement("th");
            header.setAttribute("class","myTH");
            header.textContent=value.charAt(0).toUpperCase()+value.substring(1);
            row.appendChild(header);
        }

        let cell;

        array.forEach((item, index)=> {

            //generate rows
            row = document.createElement("tr");
            row.setAttribute("class","myTR");
            table.appendChild(row);

            //generate values for each row
            Object.values(item).forEach((value)=> {
                cell=document.createElement("td");
                cell.textContent=value;
                cell.setAttribute("class","myTD");
                row.appendChild(cell);
            })
            
        });
    }
    else
    {
        //let user know if no objects
        let para = document.createElement("p");
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
    console.log(nameInput.value);
    let authorInput=document.querySelector("input[name='authorInput']");
    console.log(authorInput.value);
    let pagesInput=document.querySelector("input[name='pagesInput']");
    console.log(pagesInput.value);
    let isRead=document.querySelector("input[name='isReadInput']");
    console.log(isRead.checked);

    //TODO: check for empty input
    if((nameInput!==null && nameInput !=="") && (authorInput !== null && authorInput !== "") && (pagesInput !== null && pagesInput !== ""))
    {
        myLibrary.push(new Book(nameInput.value, authorInput.value, pagesInput.value, isRead.value));
        table.remove();
        render(myLibrary);
    }
}