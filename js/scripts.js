document.addEventListener("DOMContentLoaded", function () {
    // -----------------------------
    // 1. Slider Functionality
    // -----------------------------
    const slider = document.querySelector(".image-slider img");
    if (slider) {
      const images = [
        "images/slider1.jpg",
        "images/slider2.jpg",
        "images/slider3.png"
      ];
      let currentIndex = 0;
      // Set the first image immediately
      slider.src = images[currentIndex];
      // Change the image every 3 seconds (adjust as desired)
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        slider.src = images[currentIndex];
      }, 3000);
    }
  
    // -----------------------------
    // 2. Recipe Dynamic Content
    // -----------------------------
    // This code is only relevant on index.html when using query parameters.
    const params = new URLSearchParams(window.location.search);
    const recipeParam = params.get("recipe");
  
    if (recipeParam) {
      // Hide home content and show recipe content.
      document.getElementById("homeContent").style.display = "none";
      document.getElementById("recipeContent").style.display = "block";
  
      // Define recipes data.
      const recipes = {
        "avocado-toast": {
          title: "Avocado Toast",
          image: "images/recipe1.jpg",
          ingredients: [
            "1 avocado",
            "2 slices of wholegrain bread",
            "Salt, pepper, and olive oil"
          ],
          instructions: [
            "Toast the bread.",
            "Mash the avocado.",
            "Spread the avocado on the toast and season to taste."
          ]
        },
        "quinoa-salad": {
          title: "Quinoa Salad",
          image: "images/recipe2.jpg",
          ingredients: [
            "1 cup quinoa",
            "Mixed greens",
            "Cherry tomatoes",
            "Olive oil and lemon juice"
          ],
          instructions: [
            "Cook the quinoa.",
            "Mix with greens and tomatoes.",
            "Dress with olive oil and lemon juice."
          ]
        },
        "berry-smoothie": {
          title: "Berry Smoothie",
          image: "images/recipe3.png",
          ingredients: [
            "1 cup mixed berries",
            "1 banana",
            "1 cup almond milk",
            "Honey to taste"
          ],
          instructions: [
            "Combine all ingredients in a blender.",
            "Blend until smooth.",
            "Serve chilled."
          ]
        }
      };
  
      if (recipes[recipeParam]) {
        const recipe = recipes[recipeParam];
        document.getElementById("recipeTitle").textContent = recipe.title;
        document.getElementById("recipeImage").src = recipe.image;
        document.getElementById("recipeImage").alt = recipe.title;
  
        // Populate ingredients list.
        const ingredientsList = document.getElementById("ingredientsList");
        ingredientsList.innerHTML = "";
        recipe.ingredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.textContent = ingredient;
          ingredientsList.appendChild(li);
        });
  
        // Populate instructions list.
        const instructionsList = document.getElementById("instructionsList");
        instructionsList.innerHTML = "";
        recipe.instructions.forEach((step) => {
          const li = document.createElement("li");
          li.textContent = step;
          instructionsList.appendChild(li);
        });
      } else {
        // If no matching recipe is found.
        document.getElementById("recipeTitle").textContent = "Recipe Not Found";
        document.getElementById("recipeContent").innerHTML +=
          "<p>Sorry, the recipe you're looking for does not exist.</p>";
      }
    } else {
      // If no recipe parameter exists, show the home content.
      if(document.getElementById("homeContent")){
        document.getElementById("homeContent").style.display = "block";
      }
      if(document.getElementById("recipeContent")){
        document.getElementById("recipeContent").style.display = "none";
      }
    }
  
    // -----------------------------
    // 3. Contact Form Validation
    // -----------------------------
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        let feedback = "";
  
        if (name.value.trim() === "") {
          valid = false;
          feedback += "Please enter your name.<br>";
        }
        if (email.value.trim() === "") {
          valid = false;
          feedback += "Please enter your email.<br>";
        } else {
          // Basic email format validation
          const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
          if (!emailPattern.test(email.value.trim())) {
            valid = false;
            feedback += "Please enter a valid email.<br>";
          }
        }
        if (message.value.trim() === "") {
          valid = false;
          feedback += "Please enter a message.<br>";
        }
  
        const formFeedback = document.getElementById("formFeedback");
        if (!valid) {
          formFeedback.innerHTML = feedback;
          formFeedback.style.color = "red";
        } else {
          formFeedback.innerHTML = "Your message has been sent!";
          formFeedback.style.color = "green";
          // Optionally clear the form after submission
          contactForm.reset();
        }
      });
    }
  });
  