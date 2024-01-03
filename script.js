
const addBtn = document.querySelector("#add-btn");
const addBookDialog = document.querySelector("#add-book");
const addBookForm = document.querySelector("#add-book-form")
const closeBtn = document.querySelector("#cancel-btn");
const backDrop = window.getComputedStyle(addBookDialog, "::backdrop");
const saveBtn = document.querySelector("#save-btn");
const dialogWrapper = document.querySelector("#wrapper");

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
    console.dir(books)
    addBookForm.reset();
})

// Close dialog when user clicks outside it. 
addBookDialog.addEventListener("click", (e)=> {
    addBookDialog.close("cancel");
});
dialogWrapper.addEventListener("click", (e)=>{
    e.stopPropagation();
})




function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = Boolean(readStatus);
}