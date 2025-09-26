/**
 * 
 * 
 * DOM: Document Object Model
 * use js to interact with html elememnts
 * 
 *  task: we want to add a new movie to our list
 *  
 *  Steps:
 *      -locate the <ul> element
 *      - in each list add 2 spans for movie name and delete
 */


// code tells JS to wait for HTML to run b4 it runs 
//otherwise the JS code should be written below the HTML code as we did previously
document.addEventListener('DOMContentLoaded',function(){

    // tells JS to look for an element labelled id="movie-list" then selecet the unordered list and store it object called list
    const list=document.querySelector("#movie-list ul")

    const forms=document.forms //gets all forms and store them in the form variable

    // deleting movies
    // let JS click on the delete button
    // deleting OR editing movies
list.addEventListener("click", function(e) {
    const target = e.target.closest('span'); // ensure we get the span even if icon was clicked
    if (!target) return;

    // DELETE
    if (target.classList.contains('delete')) {
        const li = target.parentElement;
        li.remove();
    }

    // EDIT
    if (target.classList.contains('edit')) {
        const li = target.parentElement;
        const existingInput = li.querySelector('input');

        if (!existingInput) {
            // Switch to edit mode
            const nameSpan = li.querySelector('.name');
            const currentText = nameSpan.textContent;

            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'edit-input';

            li.insertBefore(input, nameSpan);
            li.removeChild(nameSpan);

            // change icon to "save"
            target.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';

        } else {
            // Save mode
            const newSpan = document.createElement('span');
            newSpan.textContent = existingInput.value || "Untitled Movie";
            newSpan.className = 'name';

            li.insertBefore(newSpan, existingInput);
            li.removeChild(existingInput);

            // change icon back to "edit"
            target.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        }
    }
});



    // adding movies
    const addMovieForm = forms['add-movie']
    addMovieForm.addEventListener('submit',function(event){
        event.preventDefault() //ensures pages does not refresh when we click the add button in our form

        // code block 3 
        const value = addMovieForm.querySelector('input[type="text"]').value
        console.log(value); //for testing purposes-outputed in the console log

        //alert user to enter movie name when they click add withou inputing movie
        if(!value){
            alert("Please enter movie name") //an alert message pops up to ask user to enter movie name 
            console.log("Please add a movie name!");
            return
        }

        // creating elements that store added movies, the unordered list 
        const li=document.createElement('li') //using JS to create an element
        const movieName=document.createElement('span') //tell JS to create a span for movie name
        const editBtn = document.createElement('span');

        const deleteBtn=document.createElement('span') //tells JS to create a span for the delete button


        // adding content in code block 3
        movieName.textContent=value
        editBtn.textContent = 'Edit';
        deleteBtn.textContent='Delete'

        // adding classes to the spans created
        movieName.classList.add('name')
        editBtn.classList.add('edit');
        deleteBtn.classList.add('delete')

        // tell java to use icons instead of names for the edit and delete buttons when adding new movie to list
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';


        // appending spans to a list
        li.appendChild(movieName)
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)

        // appending new list to the unordered list (append to DOM)
        list.appendChild(li)


        // reset the form-clear form once you input movie and press Add button 
        addMovieForm.reset()



    })



})