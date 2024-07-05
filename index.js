document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById('gallery');
    const yearElement = document.getElementById('year');

    // Set the current year in the footer
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;

    // Fetch data from Harvard Art Museums API
    const fetchArtworks = async () => {
        const apiKey = '013d682e-a3b9-4685-a5f7-bc5ca2caf6d7';
        // const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=50&classification=Paintings&hasimage=1`;
        const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=100&sort=random`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayArtworks(data.records);
        } catch (error) {
            console.error('Error fetching data:', error);
            gallery.innerHTML = '<p>Error loading artworks. Please try again later.</p>';
        }
    };

    const displayArtworks = (artworks) => {
        artworks.forEach(artwork => {
            const artElement = document.createElement('div');
            artElement.className = 'artwork';

            const imageElement = document.createElement('img');
            imageElement.src = artwork.primaryimageurl;
            imageElement.alt = artwork.title;

            const titleElement = document.createElement('h2');
            titleElement.textContent = artwork.title;

            const artistElement = document.createElement('p');
            artistElement.textContent = `Artist: ${artwork.people ? artwork.people[0].name : 'Unknown'}`;

            const dateElement = document.createElement('p');
            dateElement.textContent = `Date: ${artwork.dated}`;

            const downloadButton = document.createElement('button');
            downloadButton.className = 'download-button';
            downloadButton.innerText = 'Download';

            downloadButton.addEventListener('click', () => downloadImage(artwork.primaryimageurl));

            artElement.appendChild(imageElement);
            artElement.appendChild(titleElement);
            artElement.appendChild(artistElement);
            artElement.appendChild(dateElement);
            artElement.appendChild(downloadButton);

            gallery.appendChild(artElement);
        });
    };

    const downloadImage = (url) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'artwork.jpg'; // You can set a more dynamic name here
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading image', error);
            });
    };

    fetchArtworks();
});
