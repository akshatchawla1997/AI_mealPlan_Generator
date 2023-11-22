// Replace 'YOUR_EDAMAM_APP_ID' and 'YOUR_EDAMAM_APP_KEY' with your actual Edamam API credentials
const edamamAppId = 'bb6c1772';
const edamamAppKey = '3025fd3afee5fb9a1ff8f2df2db34f88';

function generateMealPlan() {
    const numberOfMeals = document.getElementById("numberOfMeals").value;
    const dietPreference = document.getElementById("dietPreference").value;
    const healthSpecification = document.getElementById("healthSpecification").value;
    const calories = document.getElementById("calories").value;

    // Make an API request to Edamam's Nutrition Analysis API
    const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${edamamAppId}&app_key=${edamamAppKey}`;

    const mealPlanTableContainer = document.getElementById("mealPlanTableContainer");
    mealPlanTableContainer.innerHTML = ''; // Clear previous results

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingr: [], // You can add ingredients here if needed
            title: 'Meal Plan',
            yield: numberOfMeals,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Process the data and display the meal plan
        displayMealPlan(data);
    })
    .catch(error => {
        console.error('Error fetching meal plan:', error);
    });
}

function displayMealPlan(mealPlanData) {
    const mealPlanTableContainer = document.getElementById("mealPlanTableContainer");

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Table headers (weekdays)
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const headersRow = document.createElement("tr");
    weekdays.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headersRow.appendChild(th);
    });
    thead.appendChild(headersRow);
    table.appendChild(thead);

    // Table data (meal names, recipe images, ingredients)
    const mealNames = ['Breakfast', 'Lunch', 'Dinner', 'Snack1', 'Snack2']; // Adjust based on the number of meals
    mealNames.forEach(meal => {
        const row = document.createElement("tr");

        // Add meal name cell
        const mealNameCell = document.createElement("td");
        mealNameCell.textContent = meal;
        row.appendChild(mealNameCell);

        // Add recipe image cell (placeholder, replace with actual data)
        const imageCell = document.createElement("td");
        const image = document.createElement("img");
        image.src = 'https://via.placeholder.com/50'; // Placeholder image URL
        image.alt = `${meal} Image`;
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        // Add ingredients cell (placeholder, replace with actual data)
        const ingredientsCell = document.createElement("td");
        ingredientsCell.textContent = 'Ingredient 1, Ingredient 2, ...'; // Placeholder data
        row.appendChild(ingredientsCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    mealPlanTableContainer.appendChild(table);
}
