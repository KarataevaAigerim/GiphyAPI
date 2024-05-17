function searchKeyPress(e) {
    if (e.keyCode === 13) {  // 13 is the enter key
        e.preventDefault();  // Prevent the default action to avoid form submission
        const query = document.getElementById('searchInput').value;
        fetchGifs(query);  // Fetch GIFs based on the entered query
    }
}

function fetchGifs(query) {
    const apiKey = '768BSJJ7yudt7s9YuxYjZpjExQVm4xTu';
    const url = query ? 
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20` :
        `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayGifs(data.data);
        })
        .catch(error => console.error('Error fetching data: ', error));
}

function displayGifs(gifs) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    gifs.forEach(gif => {
        const gifElement = document.createElement('div');
        gifElement.className = 'gallery__item';
        gifElement.innerHTML = `<img src="${gif.images.fixed_height.url}" alt="${gif.title}" class="gallery__image">`;
        gallery.appendChild(gifElement);
    });
}

// Load trending GIFs initially
fetchGifs();