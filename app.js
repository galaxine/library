/**
 * The book obejcts are being pushed into this array
 */
let library = [];
/**
 * The book class created the old-school style. For learning purposes
 * @param {String} name
 * @param {String} author 
 * @param {Number} pages 
 * @param {Boolean} read already set to false
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
/**
 * Adding the books to the library
 */
function addBooksToLibrary(name, author, pages) {
    library.push(new Book(name, author, pages));
}