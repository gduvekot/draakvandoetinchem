function showResult() {
    const form = document.getElementById('quiz-form');
    let answers = {
        A: 0,
        B: 0,
        C: 0
    };

    const selections = form.querySelectorAll('select');
    selections.forEach((select) => {
        const selectedValue = select.value;
        answers[selectedValue]++;
    });

    let result = '';
    if (answers.A > answers.B && answers.A > answers.C) {
        result = 'Je bent Kirjan!';
    } else if (answers.B > answers.A && answers.B > answers.C) {
        result = 'Je bent Piet!';
    } else if (answers.C > answers.A && answers.C > answers.B) {
        result = 'Je bent Adderachie!';
    }
    else {
        result = 'Je bent niemand';
    }

    alert(result);
}

function uploadFanart() {
    const input = document.getElementById("fanart-input");
    const previewContainer = document.getElementById("fanart-preview");
    const loadingScreen = document.getElementById("loading-screen");

    if (input.files.length === 0) {
        alert("Kies een afbeelding om te uploaden!");
        return;
    }

    const file = input.files[0];
    if (!file.type.startsWith("image/")) {
        alert("Alleen afbeeldingen zijn toegestaan!");
        return;
    }

    loadingScreen.style.display = "flex";

    setTimeout(() => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            imgElement.alt = "Geüploade fanart";

            const fanartItem = document.createElement("div");
            fanartItem.classList.add("fanart-item");
            fanartItem.appendChild(imgElement);

            previewContainer.appendChild(fanartItem);

            loadingScreen.style.display = "none";
        };
        reader.readAsDataURL(file);

        input.value = "";
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let itemsToShow = 3;
    const merchItems = document.querySelector('.merch-items');
    const totalItems = merchItems.children.length;

    function updateItemsToShow() {
        if (window.innerWidth <= 480) {
            itemsToShow = 1;
        } else if (window.innerWidth <= 768) {
            itemsToShow = 2;
        } else {
            itemsToShow = 3;
        }
        if (currentIndex > totalItems - itemsToShow) {
            currentIndex = Math.max(0, totalItems - itemsToShow);
        }
        updateCarousel();
    }

    function updateCarousel() {
        const itemWidth = merchItems.querySelector('div').offsetWidth + 20;
        const offset = -(currentIndex * itemWidth);
        merchItems.style.transform = `translateX(${offset}px)`;
    }

    function naarLinks() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function naarRechts() {
        if (currentIndex < totalItems - itemsToShow) {
            currentIndex++;
            updateCarousel();
        }
    }

    document.querySelector('.arrow-left').addEventListener('click', naarLinks);
    document.querySelector('.arrow-right').addEventListener('click', naarRechts);

    window.addEventListener('resize', updateItemsToShow);

    updateItemsToShow();
});

