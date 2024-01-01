
const addBtn = document.querySelector("#add-btn");
const addBookDialog = document.querySelector("#add-book");
const addBookForm = document.querySelector("#add-book-form")
const closeBtn = document.querySelector("#cancel-btn");
const backDrop = window.getComputedStyle(addBookDialog, "::backdrop");
const saveBtn = document.querySelector("#save-btn");
const dialogWrapper = document.querySelector("#wrapper");


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
    console.dir(book)
    addBookForm.reset();
})

// Close dialog when user clicks outside it. 
addBookDialog.addEventListener("click", (e)=> {
    if (e.target === dialogWrapper){
        e.stopPropagation();
        return;
    }
    addBookDialog.close("cancel");
});




function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = Boolean(readStatus);
}