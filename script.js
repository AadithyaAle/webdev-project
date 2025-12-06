let quotes = []

const quoteInput = document.getElementById('quoteInput')
const addBtn = document.getElementById('addBtn')
const quoteList = document.getElementById('quoteList')

function renderQuotes(){
    quoteList.innerHTML="";

    quotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.textContent=quote;

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'

        deleteBtn.addEventListener('click',() =>{
            deleteQuote(index);
        });

        li.appendChild(deleteBtn);
        quoteList.appendChild(li);
    });
}

function addQuote(){
    const text = quoteInput.value.trim();

    if(text==="") return;

    quotes.push(text);
    quoteInput.value = "";

    localStorage.setItem("quotes", JSON.stringify(quotes));

    renderQuotes();
}

function deleteQuote(index){
    quotes.splice(index, 1);

    localStorage.setItem("quotes", JSON.stringify(quotes));

    renderQuotes();
}

addBtn.addEventListener('click', addQuote);

quoteInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        addQuote();
    }
});

const savedQuotes = localStorage.getItem("quotes");

if(savedQuotes){

    quotes = JSON.parse(savedQuotes);
    renderQuotes();
}

const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme){
    if(theme=='light'){
        document.body.classList.add('light-mode');
        themeToggle.textContent = 'Dark mode'
    }else{
        document.body.classList.remove("light-mode");
        themeToggle.textContent = 'Light Mode';
    }
}

const savedTheme= localStorage.getItem('theme');
if(savedTheme){
    applyTheme(savedTheme);
} else{
    applyTheme('dark');
}

themeToggle.addEventListener('click', ()=>{
    const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
})
