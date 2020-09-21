
import { getEvents, getOrderLines, postBookEvent } from './fetch';
import { EventResponse }                           from './types';
import { isBookSuccess, getEvent, sleep }          from './utils';


async function retryBookEvent(event: EventResponse, orderLineId: string) {
    let success = false;
    let count = 0;
    do {
        console.log(`Trying (${count}): ${JSON.stringify(event, null, 2)}`)
        count++;
        const bookResponse = await postBookEvent(event.id, orderLineId);
        success = isBookSuccess(Object(bookResponse));
        await sleep(5000);
    } while (!success);
}


async function main() {
    const date = new Date(2020, 8, 24, 18, 30);
    const name = 'Louvre 3 - Wod GYM';

    const events = await getEvents(date);
    const myEvent = getEvent(events, date, name)
    if (myEvent) {
        console.log(`Waiting for event : \n${JSON.stringify(myEvent, null, 2)}`);
        const orderLines = await getOrderLines(myEvent.id);
        retryBookEvent(myEvent, orderLines[0].id);
    } else {
        console.log('Event not found');
    }
}


main();
