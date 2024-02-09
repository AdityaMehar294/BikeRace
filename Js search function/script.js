$(".menu-toggle-btn").click(function(){
    $(this).toggleClass("fa-times");
    $(".navigation-menu").toggleClass("active")
})
const availableKeywords = ["TVS Raider", "Revolt RV400", "Bajaj Pulser NS125", "Hero Splendor", "Royal Enfield Hunter350", "Suzuki Gixxer", "Ola S1 pro", "TVS iQube", "Bajaj Chetak", "Ather 450X", "Ola S1 x", "Vida V1 Pro", "Motovolt Urbn E-Bike", "Hero Lectro H5", "Emotorad Desert Eagle"];

function display(result) {
    const resultBox = document.querySelector(".result-box");
    resultBox.innerHTML = '';

    if (result.length > 0) {
        const resultList = document.createElement("ul");
        result.forEach(keyword => {
            const listItem = document.createElement("li");
            listItem.textContent = keyword;
            resultList.appendChild(listItem);
        });
        resultBox.appendChild(resultList);
    } else {
        resultBox.textContent = 'No matching results.';
    }

    const cardTitles = document.querySelectorAll(".card-title");

    cardTitles.forEach(cardTitle => {
        const card = cardTitle.closest(".card");
        const displayStyle = result.includes(cardTitle.textContent.toLowerCase()) ? "block" : "none";
        card.style.display = displayStyle;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let inputBox = document.getElementById("input-box");

    inputBox.addEventListener("input", function () {
        let result = [];
        let input = inputBox.value.toLowerCase();

        if (input.length) {
            result = availableKeywords.filter((keyword) => {
                return keyword.toLowerCase().includes(input);
            });

            display(result);
        } else {
            // Show all cards if the input is empty
            document.querySelectorAll(".card").forEach(card => {
                card.style.display = "block";
            });
            document.querySelector(".result-box").innerHTML = '';
        }
    });

    document.querySelector(".result-box").addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const selectedSuggestion = event.target.textContent;
            inputBox.value = selectedSuggestion;
            document.querySelector(".result-box").innerHTML = '';

            const cardTitles = document.querySelectorAll(".card-title");
            cardTitles.forEach(cardTitle => {
                const card = cardTitle.closest(".card");
                const displayStyle = selectedSuggestion.toLowerCase() === cardTitle.textContent.toLowerCase() ? "block" : "none";
                card.style.display = displayStyle;
            });
        }
    });

    // Handle case when input field is empty
    inputBox.addEventListener("blur", function () {
        if (inputBox.value.trim() === '') {
            document.querySelectorAll(".card").forEach(card => {
                card.style.display = "block";
            });
            document.querySelector(".result-box").innerHTML = '';
        }
    });
});