const searchText = document.getElementById('input-field');
const searchBtn = document.getElementById('search-btn');
const errorDiv = document.getElementById('error-div');
const searchResult = document.getElementById('items-div');
const invalidErrorDiv = document.getElementById('invalid-error');

//............./ spinner /...............//
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//............./ Search Button Event Handler /...............//
searchBtn.addEventListener('click', function () {
    let search = searchText.value;

    //fixing empty input error 
    if (search === "") {
        errorDiv.innerHTML = ` <h3 class="text-center p-3 w-50 mx-auto rounded-3"><span class="text-danger mb-2">Warning!! <br> </span> <span class ="text-muted">Search field can't be
        Empty, Write something to see the result.</span>
    </h3> `;
        return;
    }

    //clear the error div
    errorDiv.textContent = '';
    //showing spinner
    toggleSpinner('block');

    //searching items by input Button
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
});

const displayBooks = books => {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = '';
    //fixing irravalent Book Name error
    if (searchText.value !== 'books.title') {
        invalidErrorDiv.innerHTML = ` <h3 class=" bg-secondary text-center p-3 w-50 mx-auto rounded-3 shadow-lg"> <span class="text-warning mb-3"> Irravalent Book Name !!<br> </span> Search Instead <span class= "text-light"> 'Python,Smashing JavaScript,Java'</span>etc. 
        </h3> `;
        //clear the parent div (items-div)
        searchResult.textContent = '';
        //spinner off again
        toggleSpinner('none');
    }

    books.forEach(book => {
        searchResult.innerHTML = ` <h3 class="text-danger text-center p-3 w-50 mx-auto"> ${books.length}<small class= "text-muted"> Results Found for ${searchText.value} !! </small>
        </h3> `;
        //clear the irravalent input
        invalidErrorDiv.textContent = '';
        //creating book cards Dynamically
        const div = document.createElement("div");
        div.classList.add('col-md-3', 'col-12', 'rounded-3', 'border', 'p-2', 'm-3', 'shadow-lg', 'overflow-hidden');
        div.innerHTML = `
               <div class="rounded overflow-hidden p-2">
                               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
                                   class="w-100" alt="Images Not Found"/>
                           </div> 
                           <div class="py-2 text-center">
                               <h6 class="fw-bold">${book.title}</h6>
                               <p> <span class="text-info">Author:</span> ${book.author_name}</p>
                               <p><span class="text-info">Publisher:</span> ${book.publisher?.[0] ?? 'Not found'}</p>
                               <p>First Published in
                               <span class="text-info">${book.first_publish_year}</span>
                               </p>   
                           </div>
               `;
        bookContainer.appendChild(div);

    });
    //clear the input search field text
    searchText.value = '';

}