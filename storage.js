     
     let addresses = []

     function moveAddress() {
      const inputText = document.getElementById("pac-input").value;
      if (inputText !== '') {
          if (addresses.includes(inputText)) {
              const confirmToSave = window.confirm(`The location "${inputText}" is already saved, do you want to save it again?`)
              if (confirmToSave) {
                  addresses.splice(addresses.indexOf(inputText), 1);
                  addresses.unshift(inputText);
              } else {
                  return
              }
          } else {
              addresses.unshift(inputText);
          }
          localStorage.setItem('Addresses', JSON.stringify(addresses));
          renderAddresses();
      } else {
          alert("Input field is empty, please provide a valid location")
      }
  }
  
  function renderAddresses() {
    document.getElementById("addressContainer").innerHTML = '';
    addresses.forEach((address) => {
        const insideBox = document.createElement("div");
        insideBox.classList.add("insideBox")
        const insideButton = document.createElement("button");
        insideButton.classList.add("insideButton");
  
        // Split the address string by the comma
        const addressArray = address.split(',');
  
        // Create separate elements for the text before and after the comma
        const boldText = document.createElement("b");
        boldText.innerText = addressArray[0];
        const italicText = document.createElement("i");
        italicText.innerText = addressArray[1];
  
        // Append the elements to the button
        insideButton.appendChild(boldText);
        insideButton.appendChild(document.createTextNode(', '));
        insideButton.appendChild(italicText);
  
        insideButton.addEventListener("click", function() {
            document.getElementById("pac-input").value = address;
            const event = new Event('change', { bubbles: true });
            document.getElementById("pac-input").dispatchEvent(event);
        });
        insideBox.appendChild(insideButton);
        document.getElementById("addressContainer").appendChild(insideBox);
    });
  }
      
      function returnAddress(){
            const storedValue = JSON.parse(localStorage.getItem('Addresses'));
            if(storedValue){
               storedValue.forEach((element,index) => {
                  const insideBox = document.createElement("div");
                  insideBox.classList.add("insideBox")
                  const insideButton = document.createElement("button");
                  insideButton.classList.add("insideButton");
                  insideButton.innerHTML = `<h5>Address ${index+1}</h5><p> ${element}</p>`;
                  insideButton.addEventListener("click", () => {
                     document.getElementById("pac-input").value = element;
                     // calling the search function of the SearchBox
                     searchBox.getPlaces();
                  });
                  insideBox.appendChild(insideButton);
                  document.getElementById("floatingBox").appendChild(insideBox);
               });
            }
         }
      
      function clearAddresses() {
          localStorage.removeItem('Addresses');
          addresses = []
          document.getElementById("addressContainer").innerHTML = '';
          document.getElementById("pac-input").value = '';
      }
      
      function autoSaveAddress() {
          if(document.getElementById("pac-input").value.trim() !== "")
              moveAddress()
      }
      document.getElementById("pac-input").addEventListener("change", autoSaveAddress);