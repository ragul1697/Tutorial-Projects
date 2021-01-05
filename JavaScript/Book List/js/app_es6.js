class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {

    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = ` <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.isbn}</td>
                      <td> <a href="#" class="delete">X</a> </td> `;

    list.appendChild(row);

  }

  showAlert(message, className) {

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

  deleteBook(target) {

    if (target.className == 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
  }
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

    // Add Book to Local Storage
    Store.addBooks(book);

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

  // Remove from Local Storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});


// Local Storage
class Store {

  static addBooks(book) {

    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {

    const books = Store.getBooks();

    books.forEach(function (book) {

      const ui = new UI;

      ui.addBookToList(book);

    });

  }

  static removeBooks(isbn) {

    const books = Store.getBooks();

    books.forEach(function (book, index) {

      if (book.isbn === isbn) {

        books.splice(index, 1);

      }
    });

    localStorage.setItem('books', JSON.stringify(books));


  }

}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);