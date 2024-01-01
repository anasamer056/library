
const addBtn = document.querySelector("#add-btn");
const addBookDialog = document.querySelector("#add-book");
const closeBtn = document.querySelector("#cancel-btn");


addBtn.addEventListener("click", ()=>{
    addBookDialog.showModal();
})

closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    addBookDialog.close("cancel")
})