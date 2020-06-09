"use strict";

let para;

let myLibrary=JSON.parse(localStorage.getItem('library'));

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
    myLibrary.push(new Book(title, author, pages, isRead));
    populateStorage();  
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

        array.forEach((item, index)=> 
        {

            //generate rows
            row = document.createElement("tr");
            row.setAttribute("class","myTR");
            table.appendChild(row);

            let i;//variable for google icon
            let text;

            //generate values for each row
            Object.values(item).forEach((value)=> 
            {
                cell=document.createElement("td");
                cell.textContent=value;
                cell.setAttribute("class","myTD");

                //make the displayed content for isRead property a bit friendlier for users
                if(cell.textContent == "true")
                {
                    cell.textContent="yes"
                }
                else if(cell.textContent == "false")
                {
                    cell.textContent="no"
                }

                if(cell.textContent=="yes"||cell.textContent=="no")
                {
                    //generate google material icon and use it as toggle read status button
                    i = document.createElement('i');
                    i.className = 'material-icons';   
                    text = document.createTextNode('edit');
                    i.appendChild(text);
                    cell.appendChild(i);
                    row.appendChild(cell);

                    i.setAttribute("data-key", index);
                    i.addEventListener("click", (e) => {

                        let readStatusIndex=e.target.dataset.key;
                        let readStatus=myLibrary[readStatusIndex];
                        myLibrary[readStatusIndex].toggleReadStatus();
                        table.remove();
                        render(myLibrary);
                    });
                }

                row.appendChild(cell);
            })

            //generate remove buttons and add them as table data
            cell=document.createElement("td");
            cell.setAttribute("class","myTD");
            
            //add google material icon and use it as delete button
            i = document.createElement('i');
            i.className = 'material-icons';   
            text = document.createTextNode('delete');
            i.appendChild(text);
            cell.appendChild(i);
            row.appendChild(cell);

            i.setAttribute("data-key", index);
            i.addEventListener("click", deleteRow);

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
        if(typeof table !== 'undefined')
            table.remove();
        render(myLibrary);
    }
}

function deleteRow(e)
{
    let row=e.target.dataset.key;
    myLibrary.splice(row,1)
    table.remove();
    populateStorage();
    render(myLibrary);
}