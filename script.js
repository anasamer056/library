const databse = (function(){
    const books = [];
    getBooks = ()=> books;
    addBook = (book)=> books.push(book);
    removeBook = (bookIndex)=> books.splice(bookIndex, 1);  
    return {books, getBooks, addBook, removeBook};
})()

const bookgrid = (function(){
    const bookGrid = document.querySelector("#book-grid");
    
    function clear() {
        bookGrid.innerHTML = "";
    }
    
    function update(books) {
        // Clear grid to start on a clean slate
        clear();
    
        books.forEach((book, index)=> {
            // Create the card
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-index", index)
    
            // Create title, author, pages
            const title = document.createElement("h3");
            title.textContent = book.title;
            
            const author = document.createElement("h4");
            author.textContent = "By: " + book.author;
            
            const pages = document.createElement("h4");
            pages.textContent = "Pages: " + book.pages;
    
            // Create read status
            const spanClass = book.readStatus ? "read" : "not-read"
          
            const readStatus = document.createElement("div");
            readStatus.classList.add("flex-space-bet");
    
            const p = document.createElement("p");
            p.innerHTML = `Status: <span class="${spanClass}"></span>`;
            
    
            const changeBtn = document.createElement("button");
            changeBtn.classList.add("btn", "btn-text", "change-btn");
            changeBtn.textContent = "Change";
    
            readStatus.appendChild(p);
            readStatus.appendChild(changeBtn);
    
            // Create remove button
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("btn", "btn-red", "remove-btn");
            removeBtn.textContent = "Remove";        
            
            // Append all children 
            const elements = [title, author, pages, readStatus, removeBtn];
            for (const element of elements) {
                card.appendChild(element);
            }
            bookGrid.appendChild(card);
        })
    }
    return {clear, update};
})()

const displayController = (function(){
    const addBtn = document.querySelector("#add-btn");
    const closeBtn = document.querySelector("#cancel-btn");
    const addBookDialog = document.querySelector("#add-book");
    const addBookForm = document.querySelector("#add-book-form")
    const dialogWrapper = document.querySelector("#wrapper");
    
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
        databse.addBook(book);
        bookgrid.update(databse.getBooks());
        addBookForm.reset();
    })
    
    
    // Close dialog when user clicks outside it. 
    addBookDialog.addEventListener("click", (e)=> {
        addBookDialog.close("cancel");
    });
    dialogWrapper.addEventListener("click", (e)=>{
        e.stopPropagation();
    })  
})()


function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = Boolean(readStatus);
}

Book.prototype.changeReadStatus = function () {
    this.readStatus = this.readStatus ? false : true;
}