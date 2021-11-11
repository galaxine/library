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
function Book(name, author, pages, read = false) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        console.table([this.name, this.author, this.pages, this.read]);
    }
}


let hobbits = new Book("The hobbits", "J.K.Cowlin", 328);
let sexasutra = new Book("Sexasutra", "Nigga", 334);
let fuckmeatCatalogue = new Book("The Encyclopedia of females selected and engineered for sexual and breeding purposes", "the science team", 328)

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

library.push(hobbits);
library.push(sexasutra);
library.push(fuckmeatCatalogue);


function loopThroughLibrary() {
    library.forEach(book => {
        book.info();
    });
}
console.log(loopThroughLibrary())


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

const resultList = document.getElementById('results');