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
        errorDiv.innerHTML = ` <h3 class="text-center p-3 w-50 mx-auto rounded-3"><span class="text-danger my-2">Warning!! <br> </span>Search field can't be
        Empty, Write something to see the result.
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
    //fixing irravalent input error
    if (searchText.value !== 'books.title') {
        invalidErrorDiv.innerHTML = ` <h3 class=" text-center p-3 w-50 mx-auto rounded-3"> <span class="text-danger my-2"> Irravalent Input <br> </span> Search Instead <span class= "text-success"> 'Smashing JavaScript,Python,java'</span>etc Names. 
        </h3> `;
        //clear the parent div (items-div)
        searchResult.textContent = '';
        //spinner off again
        toggleSpinner('none');
    }

    books.forEach(book => {
        searchResult.innerHTML = ` <h4 class=" text-danger text-center p-3 w-50 mx-auto rounded-3"> ${books.length} Results Found for ${searchText.value} !!
        </h4> `;
        //clear the irravalent input
        invalidErrorDiv.textContent = '';
        //creating book cards Dynamically
        const div = document.createElement("div");
        div.classList.add('col-3', 'rounded-3', 'border', 'p-2', 'm-3', 'shadow-lg', 'overflow-hidden');
        div.innerHTML = `
               <div class="rounded overflow-hidden p-2">
                               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
                                   class="w-100" alt="" />
                           </div> 
                           <div class="py-2 text-center">
                               <h5 class="fw-bolder" >${book.title}</h5>
                               <p>Author: ${book.author_name}</p>
                               <p>First Published in ${book.first_publish_year}</p>   
                           </div>
               `;
        bookContainer.appendChild(div);
    });
    //clear the input search field text
    searchText.value = '';
}