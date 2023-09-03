const textareaFrom = document.querySelector('#textareaFrom');
const textareaTo = document.querySelector('#textareaTo');
const btnTranslate = document.querySelector('#btnTranslate');
const selects = document.querySelectorAll('select');

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Portuguese",
};

selects.forEach((tag) => {
    for (let country in countries) {
        let selected;
        if (tag.className.includes("selectFrom") && country == "pt-BR") {
            selected = "selected";
        } else if (tag.className.includes("selectTo") && country == "en-GB") {
            selected = "selected";
        }

        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

        tag.insertAdjacentHTML("beforeend", option);

    }
});

btnTranslate.addEventListener("click", () => {
    if (textareaFrom.value) {
        loadTranslations();
    } else {
        textareaTo.value = '';
    }
});

function loadTranslations() {
    fetch(
        `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data && data.responseData && data.responseData.translatedText) {
                textareaTo.value = data.responseData.translatedText; 
            } else {
                textareaTo.value = 'Tradução não disponível.';
            }
        })
        .catch((error) => {
            console.error('Ocorreu um erro:', error);
        });
}
