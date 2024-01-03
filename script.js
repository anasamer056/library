
const addBtn = document.querySelector("#add-btn");
const addBookDialog = document.querySelector("#add-book");
const addBookForm = document.querySelector("#add-book-form")
const closeBtn = document.querySelector("#cancel-btn");
const backDrop = window.getComputedStyle(addBookDialog, "::backdrop");
const saveBtn = document.querySelector("#save-btn");
const dialogWrapper = document.querySelector("#wrapper");
const bookGrid = document.querySelector("#book-grid");

const books = [];

console.dir(addBookForm);

addBtn.addEventListener("click", ()=>{
    addBookDialog.showModal();
})

closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    addBookDialog.close("cancel");
    addBookForm.reset();
})

addBookForm.addEventListener("submit", ()=>{
    const data = new FormData(addBookForm);
    const book = new Book(
        data.get("title"),
        data.get("author"),
        data.get("pages"),
        data.get("read")
    )
    books.push(book);
    console.dir(books);
    updateBookGrid();
    addBookForm.reset();
})

// Close dialog when user clicks outside it. 
addBookDialog.addEventListener("click", (e)=> {
    addBookDialog.close("cancel");
});
dialogWrapper.addEventListener("click", (e)=>{
    e.stopPropagation();
})

function clearBookGrid() {
    bookGrid.innerHTML = "";
}

function updateBookGrid() {
    // Clear grid to start on a clean slate
    clearBookGrid();

    for (const book of books) {
        // Create the card
        const card = document.createElement("div");
        card.classList.add("card");

        // Create title, author, pages
        const title = document.createElement("h3");
        title.textContent = book.title;
        
        const author = document.createElement("h4");
        author.textContent = book.author;
        
        const pages = document.createElement("h4");
        pages.textContent = book.pages;

        // Create read status
        let isRead; 
        let spanClass;
        if (book.readStatus) {
            isRead = "read";
            spanClass = "read";
        } else {
            isRead = "not read";
            spanClass = "not-read"
        }

        const readStatus = document.createElement("div");
        readStatus.classList.add("flex-space-bet");

        const p = document.createElement("p");
        p.innerHTML = `Status: <span class="${spanClass}">${isRead}</span>`;
        

        const changeBtn = document.createElement("button");
        changeBtn.classList.add("btn", "btn-text");
        changeBtn.textContent = "Change";

        readStatus.appendChild(p);
        readStatus.appendChild(changeBtn);

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn", "btn-red");
        removeBtn.textContent = "Remove";        
        
        // Append all children 
        const elements = [title, author, pages, readStatus, removeBtn];
        for (const element of elements) {
            card.appendChild(element);
        }
        bookGrid.appendChild(card);
    }
}


function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = Boolean(readStatus);
}