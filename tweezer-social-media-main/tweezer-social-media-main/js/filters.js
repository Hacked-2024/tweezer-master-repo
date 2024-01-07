document.addEventListener("DOMContentLoaded", function () {
    // Check if there is data for filters
    const savedFilters = sessionStorage.getItem('filters');
    if (savedFilters) {
        const filters = JSON.parse(savedFilters);

        // Fill in the buttons based on saved filters
        filters.forEach(filter => {
            const button = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
            if (button) {
                // Do not use button.checked for non-checkbox buttons
                button.classList.add('active'); // Add a class to indicate active state
            }
        });
    }
});

const filters = [];

function handleFilterButtonClick(button) {
    const filterValue = button.dataset.filter;

    // Check if the filter is already in the array
    const index = filters.indexOf(filterValue);

    if (index === -1) {
        // If not in the array, add it
        filters.push(filterValue);
        button.classList.add('active'); // Add a class to indicate active state
    } else {
        // If already in the array, remove it
        filters.splice(index, 1);
        button.classList.remove('active'); // Remove the class to indicate inactive state
    }

    console.log(filters); // Optional: Log the array to see the changes
}

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleFilterButtonClick(button);
    });
});

function submitForm() {
    const customFilterInput = document.getElementById('customFilter');
    const misinformationFilter = document.getElementById('misinformationFilter').checked;

    // Save to sessionStorage
    sessionStorage.setItem('filters', JSON.stringify(filters));
    sessionStorage.setItem('misinformationFilter', JSON.stringify(misinformationFilter));

    // For testing purposes, log the saved information
    console.log('Filters:', filters);
    console.log('Misinformation Filter:', misinformationFilter);
}
