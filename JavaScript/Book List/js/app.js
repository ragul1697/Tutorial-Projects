// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() { }

// Create Table Prototype
UI.prototype.addBookToList = function (book) {

  const list = document.getElementById('book-list');

  const row = document.createElement('tr');

  row.innerHTML = ` <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td> <a href="#" class="delete">X</a> </td> `;

  list.appendChild(row);
}

// Show Alert Prototype
UI.prototype.showAlert = function (message, className) {

  // Creating an Element
  const div = document.createElement('div');

  // Adding Classes
  div.className = `alert ${className}`;

  // Append the message to div
  div.appendChild(document.createTextNode(message));

  // Get the Parent for Inserting into DOM
  const container = document.querySelector('.container');

  const form = document.querySelector('#book-form');

  // Inserting before form
  container.insertBefore(div, form);

  // Setting Time
  setTimeout(
    function () {
      document.querySelector('.alert').remove();
    },
    3000);
}

// Delete book Prototype
UI.prototype.deleteBook = function (target) {

  if (target.className == 'delete') {
    target.parentElement.parentElement.remove();
  }

}

// Clear Fields Prototype
UI.prototype.clearFields = function () {

  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
}



// Event Listener for Form Submit
document.getElementById('book-form').addEventListener('submit', function (e) {

  // Get the Values from Form
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate Book Object
  const book = new Book(title, author, isbn);

  // Instantiate UI Object
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {

    // Error Alert
    ui.showAlert('Please fill in all the details..', 'error');
  }
  else {

    // Adding form value to Table
    ui.addBookToList(book);

    ui.addBooksToLocalStorage(book);

    // Success Alert
    ui.showAlert('Book Added', 'success');

    // Clear the Input Fields
    ui.clearFields();

  }

  e.preventDefault();
});

// Event Listener for Delete books
document.getElementById('book-list').addEventListener('click', function (e) {

  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert('Book Removed', 'success');

  ui.removeBooksFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});


// Local Storage

// Add Books to Local Storage
UI.prototype.addBooksToLocalStorage = function (book) {

  const books = ui.getBooksFromLocalStorage();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

// Get Books from Local Storage
UI.prototype.getBooksFromLocalStorage = function () {

  const ui = new UI();

  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  }

  else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;

}

// Display Books from Local Storage to UI
UI.prototype.displayBooksFromLocalStorage = function () {

  const books = ui.getBooksFromLocalStorage();

  books.forEach(function (book) {

    const ui = new UI();

    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = ` <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td> <a href="#" class="delete">X</a> </td> `;

    list.appendChild(row);
  });
}

// Remove Books from Local Storage
UI.prototype.removeBooksFromLocalStorage = function (isbn) {

  const books = ui.getBooksFromLocalStorage();

  books.forEach(function (book, index) {

    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));

}

const ui = new UI();

// DOM Event load
document.addEventListener('DOMContentLoaded',
  ui.displayBooksFromLocalStorage());
