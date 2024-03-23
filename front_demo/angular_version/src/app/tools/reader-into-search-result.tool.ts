import { Reader } from "../interfaces/reader.inteface";
import { SearchResult } from "../interfaces/search-result.interface";

export function readerIntoSearchResult(reader: Reader, findPattern: string): SearchResult {
    let result: SearchResult = {
        reader_id: 0,
        textBeforeHighlight: '',
        highlightedText: '',
        textAfterHighlight: ''
    }

    if (!findPattern) return result;
    
    if (reader.name.toLowerCase().includes(findPattern.toLowerCase())) {
        const substrIndex = reader.name.toLowerCase().indexOf(findPattern.toLowerCase())
        result.textBeforeHighlight = reader.name.slice(0, substrIndex)
        result.textAfterHighlight = [reader.name.slice(substrIndex + findPattern.length, reader.name.length), reader.card].join(' ');
        result.highlightedText = reader.name.slice(substrIndex, substrIndex + findPattern.length);
    }

    else if (reader.card.toLowerCase().includes(findPattern.toLowerCase())) {
        const substrIndex = reader.card.toLowerCase().indexOf(findPattern.toLowerCase())
        result.textBeforeHighlight = [reader.name, reader.card.slice(0, substrIndex)].join(' ');
        result.textAfterHighlight = reader.card.slice(substrIndex + findPattern.length, reader.card.length);
        result.highlightedText = reader.card.slice(substrIndex, substrIndex + findPattern.length);
    }
    result.reader_id = reader.id;
    return result;
}