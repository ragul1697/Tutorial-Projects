document.querySelector('.get-jokes').addEventListener('click', getJokes);

// Getting the Jokes
function getJokes(e) {

  const numberOfJokes = document.getElementById('number').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);

  xhr.onload = function () {

    if (this.status === 200) {
      // Parsing the String to Object
      const response = JSON.parse(this.responseText);

      let output = '';

      if (response.type === 'success') {

        response.value.forEach(function (joke) {

          output += `<li>${joke.joke}</li>`;

        });
      }

      else {
        output += 'Something went wrong..';
      }

      // Displaying the Output to DOM
      document.querySelector('.jokes').innerHTML = output;

      document.getElementById('number').value = '';
    }
  }

  xhr.send();

  e.preventDefault();

}