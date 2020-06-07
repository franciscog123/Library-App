"use strict";

let bookOne = new Book("War and Peace","Leo Tolstoy", 1225, false);
let bookTwo= new Book(`You don't know JS`, "Kyle Simpson", 67, false);
let bookThree= new Book(`The HitchHiker's Guide to the Galaxy`, 'Arthur Dent', 208, false);

let myLibrary = [bookOne, bookTwo, bookThree];
let table;
let para;

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

//TODO change something?

Book.prototype.toggleReadStatus = () => 
{   
    this.isRead = !this.isRead;
}

render(myLibrary);

function addBookToLibrary(title, author, pages, isRead)
{
    if(myLibrary.length == 0)
    {
        para.remove();
    }
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

        //create an additional header for delete/edit buttons
        header=document.createElement("th");
        header.setAttribute("class","myTH");
        row.appendChild(header);

        let cell;
        let button;
        let editButton;

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

            //generate remove buttons and add them as table data
            cell=document.createElement("td");
            cell.setAttribute("class","myTD");
            
            button=document.createElement("button");
            button.setAttribute("class", "removeButtons");
            button.textContent="Remove";
            cell.appendChild(button);
            row.appendChild(cell);
            
            button.setAttribute("data-key", index);
            button.addEventListener("click",deleteRow)
            
            //generate toggle readStatus button and add them to table
            editButton=document.createElement("button");
            editButton.setAttribute("class", "editReadButtons");
            editButton.textContent="Edit Read";
            cell.appendChild(editButton);

            editButton.setAttribute("data-key", index);
            editButton.addEventListener("click", (e) => {

                let readStatusIndex=e.target.dataset.key;
                let readStatus=myLibrary[readStatusIndex];
                console.log("Changing\n"+readStatus.info());
                //readStatus.toggleReadStatus();
                myLibrary[readStatusIndex].toggleReadStatus();
                console.log("Changed\n"+readStatus.info());
                table.remove();
                render(myLibrary);
            })
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
        table.remove();
        render(myLibrary);
    }
}

function deleteRow(e)
{
    let row=e.target.dataset.key;
    myLibrary.splice(row,1)
    table.remove();
    render(myLibrary);
}