
function handleFormSubmit() {
    onSearchClick();
}

function onSearchClick() {
    const query = document.getElementById('searchInput').value;
    fetchGifs(query);
}

function clearInput() {
    document.getElementById('searchInput').value = ''; 
}

function fetchGifs(query) {
    const apiKey = '768BSJJ7yudt7s9YuxYjZpjExQVm4xTu';
    const url = `https://api.giphy.com/v1/gifs/${query ? 'search' : 'trending'}?api_key=${apiKey}&q=${query}&limit=27`;

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

// Load trending GIFs
fetchGifs();