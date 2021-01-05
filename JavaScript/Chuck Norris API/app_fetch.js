// Adding the Event Listener to the button
document.querySelector('.get-jokes').addEventListener('click', getJokes);

// Getting the Jokes
function getJokes(e) {

  const numberOfJokes = document.getElementById('number').value;

  if (numberOfJokes === '') {
    alert("Please Enter a Number");
  }

  else {
    fetch(`http://api.icndb.com/jokes/random/${numberOfJokes}`)

      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        let output = '';

        data.value.forEach(function (loop) {

          output += `<li>${loop.joke}</li>`;

        });

        document.querySelector('.jokes').innerHTML = output;

        document.getElementById('number').value = '';
      })

      .catch(function (err) {
        console.log(err);

      });

  }

  e.preventDefault();
}