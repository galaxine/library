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
    this.info = function() {
        console.table([this.name, this.author, this.pages, this.read]);
    }
    this.setRead = function() {
        if (this.read == "on"){
            this.read == true
        } else{
            this.read == false
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

formElem.onsubmit = function (event){
    event.preventDefault();
    console.log(event.target.elements)
    let title = event.target.elements[0];
    let author = event.target.elements[1];
    let pages = event.target.elements[2];
    let read = event.target.elements[3];
    
    let addition = new Book(title.value, author.value, pages.value, read.value);
    library.push(addition);
    console.log("book is added")
    //reset the targets.
    title.value = ""
    author.value = ""
    pages.value = ""
    read.checked = false;
    
    
}

