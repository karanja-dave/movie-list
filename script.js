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
list.addEventListener("click", function(e){
    if (e.target.className === 'delete') {
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }

    if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement;
    const nameSpan = li.querySelector('.name');

    if (e.target.textContent === 'Edit') {
        // Switch to edit mode
        const currentText = nameSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';

        li.insertBefore(input, nameSpan);
        li.removeChild(nameSpan);

        e.target.textContent = 'Save'; // change button text
    } else {
        // Save mode
        const input = li.querySelector('.edit-input');
        const newSpan = document.createElement('span');
        newSpan.textContent = input.value || "Untitled Movie";
        newSpan.className = 'name';

        li.insertBefore(newSpan, input);
        li.removeChild(input);

        e.target.textContent = 'Edit'; // change button back
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

        // appending spans to a list
        li.appendChild(movieName)
        li.append(editBtn)
        li.appendChild(deleteBtn)

        // appending new list to the unordered list (append to DOM)
        list.appendChild(li)


        // reset the form-clear form once you input movie and press Add button 
        addMovieForm.reset()



    })



})