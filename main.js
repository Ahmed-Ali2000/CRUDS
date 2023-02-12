let titel = document.getElementById('titel');
let price = document.getElementById('price');
let taxse = document.getElementById('taxse');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'creat' ;
let temp ;

// get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxse.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML = '' ;
        total.style.background = '#ca2323';
    }
}

// creat product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        titel:titel.value.toLowerCase(),
        price:price.value,
        taxse:taxse.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    } 

    // count
    if( titel.value != '' 
        && price.value != '' 
        && category.value != ''
        && newPro.count < 100 ){
        if (mood === 'creat'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count ; i++){
                    dataPro.push(newPro);
                }
        }else{
            dataPro.push(newPro);
        }
        }else{
            
            dataPro[ temp ] = newPro ;
            mood = 'creat'
            submit.innerHTML = 'Creat'
            count.style.display = 'block';
        }
        clearData() 
    }


    //------------------
    showData()
    getTotal()
    // save localstorage
    localStorage.setItem('product',  JSON.stringify(dataPro))
    }

// clear input 
function clearData(){
    titel.value = '';
    price.value= '';
    taxse.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
    category.value= '';
}

// read
function showData()
{
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <th>${i}</th>
            <th>${dataPro[i].titel}</th>
            <th>${dataPro[i].price}</th>
            <th>${dataPro[i].taxse}</th>
            <th>${dataPro[i].ads}</th>
            <th>${dataPro[i].discount}</th>
            <th>${dataPro[i].total}</th>
            <th>${dataPro[i].category}</th>
            <th class="noone"><button onclick="ubdateItem( ${i} )" class="nooone" id="ubdate" >ubdate</button></th>
            <th class="noone"><button onclick="deleteItem( ${i} )" class="nooone" id="delate">delate</button></th>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
// delete all
    let butDeleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        butDeleteAll.innerHTML = `
        <button onclick="deleteAll()" class="custom-btn btn-9" >delate All (${dataPro.length})</button>`
    }else{
        butDeleteAll.innerHTML = '';
    }
}
showData()
// delete buttom
function deleteItem(i) 
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// delete all
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// update
function ubdateItem(i){

    titel.value = dataPro[i].titel;
    price.value = dataPro[i].price;
    taxse.value = dataPro[i].taxse;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = 'none'
    category.value = dataPro[i].category;
    getTotal()
    submit.innerHTML= 'Ubdate' ;
    mood = 'update' ;
    temp = i ;
    scroll({top: 0,
        behavior: 'smooth'
    })
}

// search
let searchMood = 'titel';

function getSearchMood(id)
{
    let search = document.getElementById ('search');
    if(id == 'searchTitele'){
        searchMood = 'titel';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By category';
    }
    search.focus()
    search.value = '' ;
    showData()
}

function searchData(value)
{
    let table = '';
    if (searchMood == 'titel'){

        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].titel.includes(value.toLowerCase())){
                table += `
                <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].titel}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxse}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th class="noone"><button onclick="ubdateItem( ${i} )" class="nooone" id="ubdate" >ubdate</button></th>
                    <th class="noone"><button onclick="deleteItem( ${i} )" class="nooone" id="delate">delate</button></th>
                </tr>`;
            }  
        }
    }else{
        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].titel}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxse}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th class="noone"><button onclick="ubdateItem( ${i} )" class="nooone" id="ubdate" >ubdate</button></th>
                    <th class="noone"><button onclick="deleteItem( ${i} )" class="nooone" id="delate">delate</button></th>
                </tr>`;
            }  
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clean data