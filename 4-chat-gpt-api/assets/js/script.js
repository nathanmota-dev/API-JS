const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
    if (inputQuestion.value && e.key === "Enter") {
        sendQuestion();
    }
});

const api_key = "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";

function sendQuestion() {
    var sQuestion = inputQuestion.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + api_key
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion, // valor do textarea
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.5, // criatividade da resposta
        }),
    })

        .then((response) => response.json())
        .then((json) => {

            // verifica se tem texto no input, caso tenha é adicionado 3 quebras de linha
            if (result.value) result.value += "\n";

            if (json.error?.message) { // verifica se tem erro

                result.value += `Error: ${json.error.message}`;

            } else if (json.choices?.[0].text) { // se tiver resposta retorna na text

                var text = json.choices[0].text || "Sem resposta";

                result.value += "Chat GPT: " + text;
            }

            result.scrollTop = result.scrollHeight;
        })

        .catch((error) => console.error("Error: ", error))

        .finally(() => {
            inputQuestion.value = "";
            inputQuestion.disabled = false;
            inputQuestion.focus();
        });

    if (result.value) result.value += "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true; // desabilita o input quando envia a pergunta

    result.scrollTop = result.scrollHeight; // joga o scroll de resposta pra baixo
}
