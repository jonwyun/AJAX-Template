(() => {

    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
    const hotspotAnnotation = document.querySelectorAll(".HotspotAnnotation");
  
    const materialList = document.querySelector("#material-list");
    const materialTemplate = document.querySelector("#material-template");
    let spinner = `<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ffa500">
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"/>
                </path>
            </g>
        </g>
    </svg>`
    
  
    //This information needs to be removed then pulled with an AJAX Call using the Fetch API
    //this is the api url https://swiftpixel.com/earbud/api/infoboxes"
  
    // const infoBoxes = [
    //   {
    //     title: 'Noise-cancelling microphones',
    //     text: 'Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.',
    //     image: 'images/ear-piece.jpg'
    //   },
    //   {
    //     title: 'Comfortable fit',
    //     text: 'Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place.',
    //     image: 'images/ear-piece.jpg'
    //   },
    //   {
    //     title: '360 AUDIO',
    //     text: '360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience.',
    //     image: 'images/ear-piece.jpg'
    //   },
    //   {
    //     title: 'Ultra Fast Charging',
    //     text: 'Charge your earbuds in 30 minutes or less with our hyper charging technology.',
    //     image: 'images/ear-piece.jpg'
    //   },
    // ];
  
      //This information needs to be removed then pulled with an AJAX Call using the Fetch API
      //this is the api url https://swiftpixel.com/earbud/api/materials"
  
    // const materialListData = [
    //   {
    //     heading: "Precision-Crafted Polymers",
    //     description: "Our earbuds are meticulously molded from high-quality plastics, ensuring a blend of elegance, comfort, and resilience that's second to none."
    //   },
    //   {
    //     heading: "Luxurious Silicone Harmony",
    //     description: "Our uniquely engineered ear tips are cocooned in plush silicone, delivering an opulent embrace for your ears, ensuring an unrivaled fit and exquisite audio experience."
    //   },
    //   {
    //     heading: "Rubberized Cables",
    //     description: "Experience the unparalleled freedom of movement with our flexible rubber cables that promise durability without compromise."
    //   },
    //   {
    //     heading: "Enhanced Comfort Sensors",
    //     description: "A touch of magic in the form of built-in microphones and sensors empowers your earbuds to obey your every command, making your audio journey seamless and enchanting."
    //   },
    //   {
    //     heading: "Artistic Mesh Guard",
    //     description: "Shielded by artful mesh screens, our speakers remain untarnished, keeping your listening experience pristine."
    //   }
    // ];
  
    //functions
    function modelLoaded() {
      hotspots.forEach(hotspot => {
        hotspot.style.display = "block";
      });
    }
  
    function loadInfoBoxes() {
      hotspotAnnotation.forEach(anno => {
        anno.innerHTML = spinner;
      });
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoboxes => {
        hotspotAnnotation.forEach(anno => {
          anno.innerHTML = "";
        });

        hotspots.innerHTML = "";
        infoboxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index+1}`);
          
          const headingElement = document.createElement('h2');
          headingElement.textContent = infoBox.heading;
    
          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = infoBox.description;

          const img = document.createElement("img");
          img.src = `/images/earbud${index + 1}.jpg`;
    
          selected.appendChild(headingElement);
          selected.appendChild(descriptionElement);
          selected.appendChild(img);
          });
        })
        .catch(error => {
          hotspotAnnotation.forEach(anno => {
            anno.innerHTML = "Data failed to load";
          });
          console.error(error);
        });
    }
    loadInfoBoxes();
  
    function loadMaterialInfo() {
      materialList.innerHTML = spinner;
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
        materialList.innerHTML ="";
        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
    
          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;
    
          materialList.appendChild(clone); 
        });
      })
      .catch(error => {
        materialList.innerHTML = "Data failed to load";
        console.error(error);
      });
    }
    loadMaterialInfo();
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //Event listeners
    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();
  
  