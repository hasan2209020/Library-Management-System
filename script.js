function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
}

function addBook() {
  const title = document.getElementById('bookTitle').value.trim();
  const author = document.getElementById('bookAuthor').value.trim();
  const isbn = document.getElementById('bookISBN').value.trim();
  const copies = document.getElementById('bookCopies').value.trim();
  const imageURL = document.getElementById('bookImage').value.trim();

  if (!title || !author || !isbn || !copies || !imageURL) {
    alert("Please fill all book fields.");
    return;
  }

  fetch('http://localhost:5000/add-book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, isbn, copies, image: imageURL })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      alert("✅ Book added to database!");

      // Update book table
      const table = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
      const newRow = table.insertRow();
      newRow.innerHTML = `
        <td><img class="book-cover" src="${imageURL}" alt="${title}"></td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td>${copies}</td>
      `;

      // Update book carousel
      const carousel = document.querySelector('.book-carousel');
      const bookDiv = document.createElement('div');
      bookDiv.innerHTML = `
        <img src="${imageURL}" alt="${title}" height="200" width="140"
             style="border-radius: 8px; cursor: pointer; border: 2px solid #4B0082;"
             onclick="alert('${title} by ${author}')">
        <span>${title}</span>
      `;
      carousel.insertBefore(bookDiv, carousel.firstChild);

      // Update total books count
      const totalBooksElement = document.getElementById('totalBooks');
      totalBooksElement.textContent = parseInt(totalBooksElement.textContent) + 1;

      // Clear input fields
      document.getElementById('bookTitle').value = '';
      document.getElementById('bookAuthor').value = '';
      document.getElementById('bookISBN').value = '';
      document.getElementById('bookCopies').value = '';
      document.getElementById('bookImage').value = '';
    } else {
      alert("❌ Error: " + data.message);
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("⚠️ Request failed: " + err.message);
  });
}

function filterBooks() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#bookTable tbody tr");

  rows.forEach(row => {
    const title = row.cells[1].textContent.toLowerCase();
    const author = row.cells[2].textContent.toLowerCase();
    row.style.display = title.includes(input) || author.includes(input) ? "" : "none";
  });
}

document.addEventListener('DOMContentLoaded', function() {
  let current = 0;
  const images = document.querySelectorAll('.hero-image');

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 5000);
});
