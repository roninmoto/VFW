//Joel Betterly
//Visual Frameworks Project 3
//Term 0112


//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

  //getElementById Function
  function $(x){
  var theElement = document.getElementById(x);      
  return theElement;
  }

  //Create select field element and populate with options.
  function makeCats(){
      var formTag = document.getElementsByTagName("form"),
          selectLi = $("select"),
          makeSelect = document.createElement("select");
      makeSelect.setAttribute("id", "groups");                  
      for (var i=0, j=apptGroups.length; i<j; i++){
           var makeOption = document.createElement("option");
           var optText = apptGroups[i];
           makeOption.setAttribute("value", apptGroups[i]);
           makeOption.innerHTML = optText;
           makeSelect.appendChild(makeOption);
      }    
      selectLi.appendChild(makeSelect);
  }
  
  //Find Values for check box
  function getCheckboxValue(){
      if($('available').checked){
          availableValue = $('available').value;              
      }else{
          availableValue = "No"
      }    
  }
  
  function toggleControls(n){
       switch(n){
            case "on":
                $('kaForm').style.display = "none";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "none"; 
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('kaForm').style.display = "block";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                break;
            default:
                return false;
        }                            
  }
  
  function storeData(key){
      // if no key, a brand new item & need new key
      if(!key){
          var id = Math.floor(Math.random()*123456789);
      }else{
      //set id to existing key we are editing will save over data
      //The key is same key thats been passed along from the editsubmit event
      //validate function, then passed here, into the store data function.
          id = key;
      }
      //Gather form field data
      getCheckboxValue();
      var item           = {};
          item.group     = ["Group: ", $('groups').value]; 
          item.range     = ["Level of Importance: ", $('range').value];
          item.name      = ["Name of Person: ", $('name').value];
          item.date      = ["Date: ", $('date').value];
          item.tom       = ["Time of Meeting: ", $('tom').value];
          item.available = ["Available for Meeting: ", availableValue];
          item.notes     = ["Notes: ", $('notes').value];
      //Save data to local storage
      localStorage.setItem(id, JSON.stringify(item));
      alert("Appointment has been saved!");
          
          
  }
  
  function getData(){
      toggleControls("on");
      if(localStorage.length === 0){
          alert("Local Storage is empty. JSON data was added.");
          autoFillData();
      }
      //Make Data from local Storage
      var makeDiv = document.createElement('div');
      makeDiv.setAttribute("id","items");
      var makeList = document.createElement('ul');        
      makeDiv.appendChild(makeList);
      document.body.appendChild(makeDiv);
      $('items').style.display = "block";
      for(var i=0, len=localStorage.length; i<len; i++){
          var makeli = document.createElement('li');
          var linksLi = document.createElement('li');
          makeList.appendChild(makeli);
          var key = localStorage.key(i);
          var value = localStorage.getItem(key);
          var obj = JSON.parse(value);  
          var makeSubList = document.createElement('ul');
          makeli.appendChild(makeSubList);
          getImage(obj.group[1], makeSubList);
          for(var n in obj){
               var makeSubli = document.createElement('li');
               makeSubList.appendChild(makeSubli);
               var optSubText = obj[n][0]+" "+obj[n][1];
               makeSubli.innerHTML = optSubText;
               makeSubList.appendChild(linksLi);
          }
          makeItemLinks(localStorage.key(i), linksLi);  //Create edit/delete item for local storage.
      }
  }
  
  //Get Image for selection
  function getImage(catName, makeSubList){
      var imageLi = document.createElement('li');
      makeSubList.appendChild(imageLi);
      var newImg = document.createElement('img');
      var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
      imageLi.appendChild(newImg);
  }
  
  //Auto Populate Local Storage
  function autoFillData(){
      for(var n in json){
          var id = Math.floor(Math.random()*123456789);
          localStorage.setItem(id, JSON.stringify(json[n]));
      }
  
  }
    
  //Make Item Links
  //Create the edit/delete links for each stored item when displayed
  function makeItemLinks(key, linksLi){
    //add edit single item link
    var editLink = document.createElement('a');
    editLink.href = "#";
    editLink.key = key;
    var editText = "Edit Appointment";
    editLink.addEventListener("click", editItem);
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);
    
    //Add Line Break
    var breakTag = document.createElement('br');
    linksLi.appendChild(breakTag);
    
    //add delete single item link
    var deleteLink = document.createElement('a');
    deleteLink.href = "#";
    deleteLink.key = key;
    var deleteText = "Delete Appointment";
    deleteLink.addEventListener("click", deleteItem);
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);
    
  }
  
  function editItem(){
    //grab the data from our item from Local Storage
    var value = localStorage.getItem(this.key);
    var item = JSON.parse(value);
    
    //show the form
    toggleControls("off");
    
    //populate form with current localStorage values
    $('groups').value     = item.group[1];
    $('range').value      = item.range[1];
    $('name').value       = item.name[1];
    $('date').value       = item.date[1];
    $('tom').value        = item.tom[1];
    if(item.available[1] =="Yes"){
      $('available').setAttribute("checked", "checked");
    }
    $('notes').value      = item.notes[1];
    
    //Remove the initial listener from the input 'save appt' button.
    save.removeEventListener("click", storeData);
    //Change submit button to edit button
    $('submit').value = "Edit Appointment";
    var editSubmit = $('submit');
    //save the key value established in this function as a property of the editSubmit event
    //so we can use that value when we save the data we edited.
    editSubmit.addEventListener("click", validate);
    editSubmit.key = this.key;
    
  }
  
  function deleteItem(){
      var ask = confirm("Deleting appointment cannot be undone, are you sure?");
      if(ask){
          localStorage.removeItem(this.key);
          alert("Appointment has been deleted!");
          window.location.reload();
      }else{
          alert("Appointment was not deleted!")
      }
  }    
  
  function clearLocal(){
      if(localStorage.length === 0){
          alert("There is no data to clear.")
      }else{
          localStorage.clear();
          alert("All data has been deleted");
          window.location.reload();
          return false;
      }    
  }
  
  function validate(e){
      //define the elements
      var getGroup  = $('groups');
      var getName   = $('name');
      var getDate   = $('date');
      var getTom    = $('tom');
      
      //reset error message
      errMsg.innerHTML = "";
      getGroup.style.border = "1px solid black";
      getName.style.border = "1px solid black"
      getDate.style.border = "1px solid black";
      getTom.style.border = "1px solid black";
      
      //Get Error Msg
      var messageAry = [];
      //Group Validation
      if(getGroup.value=="Make a Selection"){
        var groupError = "Please make a selection.";
        getGroup.style.border = "1px solid red";
        messageAry.push(groupError);
      }
      
      //Name Validation
      if(getName.value === ""){
        var nameError = "Please enter a Name.";
        getName.style.border = "1px solid red";
        messageAry.push(nameError);
      }
      
      //Date Validation
      if(getDate.value === ""){
        var dateError = "Please enter a Date.";
        getDate.style.border = "1px solid red";
        messageAry.push(dateError);
      }
      
      //Tom Validation
      if(getTom.value === ""){
        var tomError = "Please enter the Time of the Meeting.";
        getTom.style.border = "1px solid red";
        messageAry.push(tomError);
      }    
      
      //if any error, display error on screen
      if(messageAry.length >= 1){
        for(var i=0, j=messageAry.length; i < j; i++){
            var txt = document.createElement('li');
            txt.innerHTML = messageAry[i];
            errMsg.appendChild(txt);
        }
        e.preventDefault();
        return false;
      }else{
        //if all is ok, save the data.
        storeData(this.key);      
      }
      
  }
  
  //Variable defaults  
  var apptGroups = ["Make a Selection","Personal", "Business", "Other"],
      availableValue = "No",
      errMsg = $('errors');
  ;    
  makeCats();


  //Set Link & Submit Click Events
  var displayLink = $('displayLink');
  displayLink.addEventListener("click", getData);
  var clearLink = $('clear');
  clearLink.addEventListener("click", clearLocal);
  var save = $('submit');
  save.addEventListener("click", validate);
  
});