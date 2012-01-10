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
  
  function storeData(){
      var id = Math.floor(Math.random()*123456789);
      //Gather form field data
      
      getCheckboxValue();
      var item           = {};
          item.group     = ["Group", $('groups').value]; 
          item.range     = ["Level of Importance", $('range').value];
          item.name      = ["Name of Person", $('name').value];
          item.date      = ["Date:", $('date').value];
          item.tom       = ["Time of Meeting", $('tom').value];
          item.available = ["Available for Meeting:", availableValue];
          item.notes     = ["Notes", $('notes').value];
      //Save data to local storage
      localStorage.setItem(id, JSON.stringify(item));
          
          
  }
  
  function getData(){
      toggleControls("on");
      if(localStorage.length === 0){
          alert("Local Storage is empty.");
      }    
      var makeDiv = document.createElement('div');
      makeDiv.setAttribute("id","items");
      var makeList = document.createElement('ul');        
      makeDiv.appendChild(makeList);
      document.body.appendChild(makeDiv);
      $('items').style.display = "block";
      for(var i=0, len=localStorage.length; i<len; i++){
          var makeli = document.createElement('li');
          makeList.appendChild(makeli);
          var key = localStorage.key(i);
          var value = localStorage.getItem(key);
          var obj = JSON.parse(value);  
          var makeSubList = document.createElement('ul');
          makeli.appendChild(makeSubList);
          for(var n in obj){
               var makeSubli = document.createElement('li');
               makeSubList.appendChild(makeSubli);
               var optSubText = obj[n][0]+" "+obj[n][1];
               makeSubli.innerHTML = optSubText;
               
          }
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
  
  //Variable defaults  
  var apptGroups = ["Type of Appointment","Personal", "Business", "Other"],
      availableValue = "No"
  ;    
  makeCats();


  //Set Link & Submit Click Events
  var displayLink = $('displayLink');
  displayLink.addEventListener("click", getData);
  var clearLink = $('clear');
  clearLink.addEventListener("click", clearLocal);
  var save = $('submit');
  save.addEventListener("click", storeData);
  
});