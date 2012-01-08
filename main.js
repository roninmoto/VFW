//Joel Betterly
//Visual Frameworks Project 2
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
          selectLi = $('select'),
          makeSelect = document.createElement('select');
          makeSelect.setAttribute("id", "groups");
      for (var i=0, j=contactGroups.length; i<j; i++){
           var makeOption = document.createElement('option');
           var optText = contactGroups[i];
           makeOption.setAttribute("value", optText);
           makeOption.innerHTML = optText;
           makeSelect.appendChild(makeOption);
      }    
      selectLi.appendChild(makeSelect);
  }
  
  
  //Variable defaults
  var contactGroups = ["Type of Appointment","Personal", "Business", "Other"];
  makeCats();


  //Set Link & Submit Click Events
  var displayLink = $('displayLink');
  displayLink.addEventLister("click", getData);
  var clearLink = $('clear');
  clearLink.addEventLister("click", clearLocal);
  var save = $('submit');
  save.addEventLister("click", storeData);
  
});