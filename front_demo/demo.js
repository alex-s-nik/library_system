readers = library_data["readers"]
books = library_data["books"]

/* ======== для find_reader.html =========*/
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
            resultHTMLToPrint += "<p class=\"find_results__reader\">" + "<a class=\"btn btn-light\" href=\"reader_lending.html?reader_id=" + reader["id"] +"\" role=\"button\">" + reader_name + " " + reader_card + "</a>" + "</p>"
        }
    });
    if (count > maxRecordsForOutput) {
        resultHTMLToPrint += "и еще " + (count - maxRecordsForOutput) + " ..."
    }
    resultsBlock.innerHTML = resultHTMLToPrint
}
try {
    findReaderInput.addEventListener("input", findReaderByNameAndCard)
} catch {
    console.log("....")
}


/* ==end=of== для find_reader.html ========== */

/* ========== для reader_lending.html ========== */

const reader_id_for_page = new URLSearchParams(window.location.search).get("reader_id")
const reader_for_page = readers.find((reader) => reader["id"] == reader_id_for_page)

const reader_name = reader_for_page["name"]
const reader_info = "Читательский билет № " + reader_for_page["card"]

const reader_name_element = document.getElementById("reader_lending__reader-info__name")
reader_name_element.innerText = reader_name

const reader_info_element = document.getElementById("reader_lending__reader-info__info")
reader_info_element.innerText = reader_info

/* заполнение таблицы выданных книг */
const reader_lending_facts_element = document.getElementById("reader_lending__reader-info__books_info_table")

const reader_lending_facts = reader_for_page["lending_facts"]
reader_lending_facts.forEach((fact) => {
    current_book_id = fact["book_id"]
    current_book = books.find((book) => book["id"] == current_book_id)

    current_book_info = current_book["title"] + " " + current_book["author"] + " " + current_book["pages"] + " с. " + current_book["year"]
    current_book_taken_date = fact["taken_date"]
    current_book_returned_date = fact["returned_date"] === null ? "" : fact["returned_date"]

    td_title = document.createElement('td')
    td_title.innerText = current_book_info
    td_taken_date = document.createElement('td')
    td_taken_date.innerText = current_book_taken_date
    td_returned_date = document.createElement('td')
    td_returned_date.innerText = current_book_returned_date

    reader_info_element_row = reader_lending_facts_element.insertRow()
    reader_info_element_row.appendChild(td_title)
    reader_info_element_row.appendChild(td_taken_date)
    reader_info_element_row.appendChild(td_returned_date)
})

/* ==end=of== для reader_lending.html ========== */

