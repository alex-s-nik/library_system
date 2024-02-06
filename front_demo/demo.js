readers = library_data["readers"]


findReaderInput = document.getElementById("find-reader_input")
resultsBlock = document.getElementById("find_reader_result")

function highlightSubstringWithHTML(textToHighlight, highlightedSubstr, css_class) {
    /*
    * Подсветить подстроку highlightedSubstr в тексте textToHighlight css-классом css_class.
    * Регистр не учитывается.
    * Пример возврата: "this <span class=/"highlight/">is</span> text"
    */
    const substrIndex = textToHighlight.toLowerCase().indexOf(highlightedSubstr)
    return textToHighlight.slice(0, substrIndex) + "<span class=\"" + css_class + "\">" + textToHighlight.slice(substrIndex, substrIndex + highlightedSubstr.length) + "</span>" + textToHighlight.slice(substrIndex + highlightedSubstr.length, textToHighlight.length)
}

function findReaderByNameAndCard(event) {
    stringToFind = event.target.value.toLowerCase()
    // обнулить список найденных читателей при пустом запросе,
    // например, в случае когда пользователь что-то ввел, ему нашлись
    // читатели, а потом пользователь все стер в строке поиска
    // и ему вывалился полный список всех читателей
    if (stringToFind === "") {
        resultsBlock.innerText = ""
        return
    }

    // поиск совпадений по ФИО или по читательскому билету
    const result = readers.filter(
        (reader) => 
        (
            reader["name"].toLowerCase().includes(stringToFind) || reader["card"].toLowerCase().includes(stringToFind)
        )
    )

    //вывод всех найденных пользователей
    const maxRecordsForOutput = 10 
    const highlightedCSSClass = "find-reader__highlighted-text"
    let resultHTMLToPrint = ""
    let count = 0

    let reader_name, reader_card
    result.forEach(reader => {
        if (++count <= maxRecordsForOutput) {
            // формирование вывода с выделением совпадения
            reader_name = reader["name"]
            if (reader["name"].toLowerCase().includes(stringToFind)) {
                reader_name = highlightSubstringWithHTML(reader["name"], stringToFind, highlightedCSSClass)
            }

            reader_card = reader["card"]
            if (reader["card"].toLowerCase().includes(stringToFind)) {
                reader_card = highlightSubstringWithHTML(reader["card"], stringToFind, highlightedCSSClass)
            }
            

            //resultHTMLToPrint += "<p class=\"find_results__reader\">" + "<a href=\"#\">" + reader_name + " " + reader_card + "</a>" + "</p>"
            resultHTMLToPrint += "<p class=\"find_results__reader\">" + "<a class=\"btn btn-light\" href=\"#\" role=\"button\">" + reader_name + " " + reader_card + "</a>" + "</p>"
        }
    });
    if (count > maxRecordsForOutput) {
        resultHTMLToPrint += "и еще " + (count - maxRecordsForOutput) + " ..."
    }
    resultsBlock.innerHTML = resultHTMLToPrint
}

findReaderInput.addEventListener("input", findReaderByNameAndCard)