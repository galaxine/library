/**
 * The book obejcts are being pushed into this array
 */
let library = [];
/**
 * The book class created the old-school style. For learning purposes
 * @param {String} name Name of the book
 * @param {String} author Name of the author
 * @param {Number} pages Pages
 * @param {Boolean} read already set to false, 
 */
function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        console.table([this.name, this.author, this.pages, this.read]);
    }
    this.toggle = function() {
        if (this.read == true) {
            this.read == false;
        } else {
            this.read == true;  
        }
    }
}

/**
 * Add books to the library through a function
 */
function addBooksToLibrary(name, author, pages, read) {
    if (read == undefined) {
        library.push(new Book(name, author, pages));
    } else {
        library.push(new Book(name, author, pages, read));
    }
}


function loopThroughLibrary() {
    library.forEach(book => {
        book.info();
    });
}
//console.log(loopThroughLibrary())


/* Modal part */
const openModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay");

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
/*
Getting the results of the modal.
*/

let formElem = document.getElementById("form-elem");
//handles three things: 
//getting the information from the form
//resetting th form
//adding the inserted information to the new Book element
//adding the informations to a card
//adding the
formElem.onsubmit = function (event) {
    event.preventDefault();
    let title = event.target.elements[0];
    let author = event.target.elements[1];
    let pages = event.target.elements[2];
    let read = event.target.elements[3].checked;

    let addition = new Book(title.value, author.value, pages.value, read);
    library.push(addition);
    console.log("book is added")
    //reset the targets.
    title.value = ""
    author.value = ""
    pages.value = ""
    read.value = "off";
    gridMenu.append(
        createAndInsertToCard(
            addition.name, addition.author, addition.pages, addition.read));
    gridMenu.lastChild.dataset.bookNr = library.length - 1;
    gridMenu.lastChild.lastChild.dataset.bookNr = library.length - 1;
}

// get access 
let gridMenu = document.querySelector(".grid-menu");


// create a card with their sections as a test, if it works. Make a html/css dummy for a good grid menu:
let card = document.createElement("div");
card.classList.add("card");

function createAndInsertToCard(name, author, pages, read) {
    let card = document.createElement("div");
    card.classList.add("card");
    let cardTitle = document.createElement("div");
    let cardAuthor = document.createElement("div");
    let cardPages = document.createElement("div");
    let cardReadParent = document.createElement("div");
    let cardReadText = document.createElement("div");
    let cardRead = document.createElement("button");
    
    //add data attribute to the 
    cardRead.dataset.read = read;
    cardRead.dataset.readNr = library.length - 1;
    if (read == true) {
        cardRead.innerHTML = "Read";
        cardRead.style.backgroundColor = "green";
    } else {
        cardRead.innerHTML = "Not Read";
        cardRead.style.backgroundColor = "salmon";
    }

    cardReadParent.append(cardReadText, cardRead);
    cardReadParent.style.display = "flex";
    let button = document.createElement("button");
    cardTitle.innerHTML = `Book Title:\n${name}`;
    cardAuthor.innerHTML = `Author:\n${author}`;
    cardPages.innerHTML = `Pages:\n${pages}`;
    cardReadText.innerHTML= "Read: \n"
    button.innerHTML = "remove";
    button.setAttribute("type", "submit");
    card.append(cardTitle, cardAuthor, cardPages, cardReadParent, button);
    return card;
}
/**
 * When the submit button 
 * @param {*} event The PointerEvent 
 */
gridMenu.onclick = function (event) {
    event.preventDefault();
    let clicked = event.target;
    let cards = gridMenu.children;
    // use library as index and go through the for loop of the cards
    if (clicked.dataset.bookNr) {
        for (let index = 0; index < cards.length; index++) {
            if (clicked.dataset["bookNr"] === cards[index].dataset["bookNr"]) {
                console.log(library[index].info())
                //remove the book at the library
                delete library[index];
             }
        }
        
        library = library.filter(elem => typeof(elem) !== "undefined");
        while (gridMenu.hasChildNodes()) {
            gridMenu.removeChild(gridMenu.firstChild);
        }

        library.forEach(book => {
            gridMenu.appendChild(
                createAndInsertToCard(
                    book.name, book.author, book.pages, book.read
                )
            );
            gridMenu.lastChild.dataset.bookNr = library.indexOf(book);
            gridMenu.lastChild.lastChild.dataset.bookNr = library.indexOf(book);
        });
    } else if (clicked.hasAttributes("data-read")){
        if(clicked.dataset.read == "true"){
            clicked.dataset.read = false;
            library[clicked.dataset.readNr].toggle()
            clicked.style.backgroundColor = "salmon";
            clicked.innerHTML = "not Read";
        } else if (clicked.dataset.read == "false") {
            clicked.dataset.read = true;
            library[clicked.dataset.readNr].toggle()
            clicked.style.backgroundColor = "green";
            clicked.innerHTML = "Read";
        }
    }
}
