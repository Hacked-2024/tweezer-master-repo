document.addEventListener("DOMContentLoaded", async function () {
    var filters = sessionStorage.getItem('filters');
    var savedMisinformationFilter = sessionStorage.getItem('misinformationFilter');
    const postCards = document.querySelectorAll('.card');

    if (filters && filters !== "") {
        const promises = Array.from(postCards).map(async (postCard) => {
            const caption = postCard.querySelector('.caption').innerText;
            const result = await performAsyncPostRequest(caption, filters);

            if (result && result.filtered === "0") {
                postCard.classList.add('good-post');
            }
        });
        await Promise.all(promises);
    } else {
        const promises = Array.from(postCards).map(async (postCard) => {
            postCard.classList.add('good-post');
        });
    }

    if (savedMisinformationFilter == true) {
        const promises = Array.from(postCards).map(async (postCard) => {
            const caption = postCard.querySelector('.caption').innerText;
            const result = await detectMisinformation(caption);

            if (result && parseFloat(result.truthfulness) >= 7) {
                const misinformationSection = postCard.querySelector('.misinformation');
                if (misinformationSection) {
                    misinformationSection.style.display = 'block';
                }
            }
        });
        await Promise.all(promises);
    }

    var cardContent = [];

    function saveCardContent(imageSrc, caption) {
        cardContent.push([imageSrc, caption]);
    }

    var cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
        var imageSrc = card.querySelector(".post-img").src;
        var caption = card.querySelector(".caption").innerText;
        saveCardContent(imageSrc, caption);
    });

    console.log("Card Content:", cardContent);

    function handleViewAnywayButtonClick(event) {
        var card = event.target.closest(".card");
        if (card) {
            card.classList.add("good-post");
        }
    }

    var viewAnywayButtons = document.querySelectorAll(".btn-danger");
    viewAnywayButtons.forEach(function (button) {
        button.addEventListener("click", handleViewAnywayButtonClick);
    });

    var openPostFormButton = document.getElementById("open-post-form");
    var newPostFormContainer = document.getElementById("new-post-form");

    openPostFormButton.addEventListener("click", function () {
        newPostFormContainer.style.display = newPostFormContainer.style.display === "none" ? "block" : "none";
    });

    // Function to add a new post
function addNewPost() {
    var imageInput = document.getElementById("imageInput");
    var captionInput = document.getElementById("captionInput");

    // Get the container for posts
    var postsContainer = document.querySelector(".posts .container");

    // Create a new card div
    var newCard = document.createElement("div");
    newCard.className = "card";

    // Card Header with User Information
    var cardHeader = document.createElement("div");
    cardHeader.className = "card-header bg-white";
    cardHeader.innerHTML =
        '<img src="img/no-profile.webp" alt="Profile Picture" class="rounded-circle profile"> <span class="ml-2 font-weight-bold">@username</span>';

    // Card Body with Post Image
    var cardBody = document.createElement("div");
    cardBody.className = "card-body p-0";
    var postImage = document.createElement("img");

    // Check if an image is selected
    if (imageInput.files.length > 0) {
        var reader = new FileReader();

        reader.onload = function (e) {
            postImage.src = e.target.result;
            postImage.alt = "Post Image";
            postImage.className = "img-fluid post-img";
            cardBody.appendChild(postImage);
        };

        reader.readAsDataURL(imageInput.files[0]);
    }

    // Card Footer with Like and Comment Icons
    var cardFooter = document.createElement("div");
    cardFooter.className = "card-footer bg-white";
    cardFooter.innerHTML = `
        <div class="d-flex">
        <div>
        <i class="far fa-heart"></i>
        <span class="ml-1"><svg class="like-icon" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 6.0002c-1.7994-2.097-4.8062-2.7451-7.0608-0.82485-2.2546 1.9202-2.572 5.1308-0.80145 7.4019 1.4721 1.8882 5.927 5.8707 7.3871 7.1597 0.1633 0.1442 0.245 0.2163 0.3403 0.2446 0.0831 0.0247 0.1741 0.0247 0.2573 0 0.0953-0.0283 0.1769-0.1004 0.3403-0.2446 1.4601-1.289 5.915-5.2715 7.3871-7.1597 1.7705-2.2711 1.4918-5.5018-0.8015-7.4019s-5.249-1.2722-7.0484 0.82485z" clip-rule="evenodd" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            </span>
    </div>
            <div>
                <i class="far fa-comment"></i>
                <span class="ml-1"><svg class="comment-icon" fill="none" viewBox="0 -.5 25 25" xmlns="http://www.w3.org/2000/svg">
                    <path d="m5.5 12c-1.2e-4 2.613 1.4551 5.0085 3.7741 6.2127 2.319 1.2042 5.1156 1.0165 7.2529-0.4867l2.973 0.274v-6c0-3.866-3.134-7-7-7-3.866 0-7 3.134-7 7z" clip-rule="evenodd" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                    <path d="m9.5 13.25c-0.41421 0-0.75 0.3358-0.75 0.75s0.33579 0.75 0.75 0.75v-1.5zm4 1.5c0.4142 0 0.75-0.3358 0.75-0.75s-0.3358-0.75-0.75-0.75v1.5zm-4-4.5c-0.41421 0-0.75 0.3358-0.75 0.75s0.33579 0.75 0.75 0.75v-1.5zm6 1.5c0.4142 0 0.75-0.3358 0.75-0.75s-0.3358-0.75-0.75-0.75v1.5zm-6 3h4v-1.5h-4v1.5zm0-3h6v-1.5h-6v1.5z" fill="#000"/>
                </svg></span>
            </div>
        </div>
    `;

    // Create caption
    var captionElement = document.createElement("div");
    captionElement.className = "caption";
    var captionText = document.createElement("p");
    captionText.innerText = captionInput.value; // Use caption input value
    captionElement.appendChild(captionText);

    // Append elements to the post card
    newCard.appendChild(cardHeader);
    newCard.appendChild(cardBody);
    newCard.appendChild(cardFooter);
    cardFooter.appendChild(captionElement);

    // Add the div under caption
    var textOverCardDiv = document.createElement("div");
    textOverCardDiv.className = "text-over-card";
    textOverCardDiv.innerHTML = `
        <p>This post was blocked because it may contain harmful content.</p>
        <button class="btn btn-danger view-anyway">View Anyway</button>
  
        `;
    cardFooter.appendChild(textOverCardDiv);

    // Attach click event to "View Anyway" button for user-added posts
    var viewAnywayButton = textOverCardDiv.querySelector(".view-anyway");
    viewAnywayButton.addEventListener("click", handleViewAnywayButtonClick);
    if (filters && filters !== "") {
            const caption = captionInput.value;
            console.log(caption)
            const result = performPostRequest(caption, filters);

            if (result && result.filtered === "0") {
                newCard.classList.add('good-post');
            }
        ;
    } else {
        newCard.classList.add('good-post');
    }

    // Insert the new card at the top
    postsContainer.insertBefore(newCard, postsContainer.firstChild);

    // Clear the form inputs
    imageInput.value = "";
    captionInput.value = "";
}

    var postForm = document.getElementById("post-form");

    postForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addNewPost(savedMisinformationFilter == true);
        newPostFormContainer.style.display = "none";
    });
});

async function performPostRequest(textInput, filter) {
    try {
        const response =  fetch('http://127.0.0.1:5000/filter-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textInput, filter }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during post request:', error.message);
    }
}

async function performAsyncPostRequest(textInput, filter) {
    try {
        const response = await fetch('http://127.0.0.1:5000/filter-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textInput, filter }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during post request:', error.message);
    }
}

async function detectMisinformation(textInput) {
    try {
        const response = await fetch('http://127.0.0.1:5000/fact-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error during post request:', error.message);
    }
}

async function detectMisinformationNoAwait(textInput) {
    try {
        const response = fetch('http://127.0.0.1:5000/fact-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error during post request:', error.message);
    }
}
