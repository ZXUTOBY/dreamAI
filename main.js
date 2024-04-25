import './style.css'

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {

    e.preventDefault();
    const data = new FormData(form);
    showSpinner();

    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      })
    });

    if (response.ok) {
      const {image} = await response.json();

      const result = document.querySelector('#result');
      result.innerHTML = `<img src=${image} width="512" />`;
    } else {
      result.innerHTML = 'Image will go here';
      const err = await response.text();
      alert(err);
      console.error(err);
    }
    hideSpinner();
  }
);



function showSpinner(){
  const button = document.querySelector('button');
  const result = document.getElementById('result');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
  result.innerHTML = 'Loading ...';
}

function hideSpinner(){
  const button = document.querySelector('button');
  const result = document.querySelector('#result');
  button.disabled = false;
  button.innerHTML = 'Dream';
}
