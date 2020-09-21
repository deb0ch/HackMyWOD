

interface BookSuccess {
    id: string,
}


interface BookFailure {
    success: boolean,
}


type BookResponse = BookSuccess | BookFailure;


interface EventResponse {
    id: string,
    name: string,
    start: string,
}


interface OrderLine {
    id: string,
}


export {
    BookFailure,
    BookSuccess,
    BookResponse,
    EventResponse,
    OrderLine
}
