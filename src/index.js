let todos = null;

window.onload = () => {
    let todoObject = sessionStorage.getItem('list');
    console.log(todoObject);

if(todoObject !== null){
    todos = JSON.parse(todoObject);
    for(let i=0; i<todos.length; i++){
        let li = document.createElement('li');
    
        li.classList.add('js-list-item');
        li.innerHTML = todos[i];
    
        li.innerHTML += '<span class="js-delete">X</span>';
        document.querySelector('.js-list').appendChild(li);
      
    }
}
else {
    todos = [];
}
}


          //on submit
document.querySelector(".js-submit").addEventListener('click', function(e){
    e.preventDefault;

    let inputVal = document.querySelector(".js-text-bar").value;
    let warning = document.querySelector('.warning');

    if(inputVal.length <= 0){
        warning.textContent = "Cannot add empty item!";
        warning.classList.add("warning-active");
        
        setTimeout(() => {
              warning.classList.remove("warning-active");
        }, 5000);
        return
    }

    if (todos.length > 0){

        if(todos.includes(inputVal)){
            warning.textContent = "You are trying to add something that already is in the list!";
            warning.classList.add("warning-active");
            
            setTimeout(() => {
                  warning.classList.remove("warning-active");
            }, 5000);
          
            return;
        }
}

if(/<\/?[a-z][\s\S]*>/.test(inputVal)){
    warning.textContent = "Invalid text type. Cannot take HTML tag input";
            warning.classList.add("warning-active");
            
            setTimeout(() => {
                  warning.classList.remove("warning-active");
            }, 5000);
          
            return;
}

    let li = document.createElement('li');
    
    li.classList.add('js-list-item');
  

    todos.push(inputVal);

    for(let i=0; i<todos.length; i++){
         li.innerHTML = todos[i];

         li.innerHTML += '<span class="js-delete">X</span>';
         document.querySelector('.js-list').appendChild(li);
       
    }

    sessionStorage.setItem('list', JSON.stringify(todos));

    document.querySelector(".js-text-bar").value = '';
}); 



var list = document.querySelector('ul');

list.addEventListener('click', function(event){
    if(event.target.tagName === "LI"){
       event.target.classList.toggle('done');
    }

    if(event.target.tagName === "SPAN"){
        let liItem = event.target.parentElement;
        liItem.style.display = 'none';

        //todo: properly splice data so correct list render
        let children = list.childNodes;
        for(let i = 0; i< children.length; i++){

            let currentText = liItem.textContent;

            if(currentText.includes(todos[i])){
                todos.splice(i, 1);
            }
        }

       console.log(todos);
       sessionStorage.setItem('list', JSON.stringify(todos));
    }
})