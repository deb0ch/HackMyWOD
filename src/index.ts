import { getEvents, getOrderLines, postBookEvent } from './fetch';
import { EventResponse } from './types';
import { isBookSuccess, getEvent, sleep } from './utils';


async function retryBookEvent(event: EventResponse) {
  let success = false;
  let count = 0;
  do {
    console.log(`Trying (${count}):\n${JSON.stringify(event, null, 2)}\n`);
    count += 1;
    const orderLines = await getOrderLines(event.id);
    const orderLineId = orderLines[0].id;
    const bookResponse = await postBookEvent(event.id, orderLineId);
    success = isBookSuccess(Object(bookResponse));
    console.log(`Response :\n${
      JSON
        .stringify(bookResponse, null, 2)
        .slice(0, 500)
        .replace('\\r\\n', '\n')
    }\n`);
    await sleep(5000);
  } while (!success);
}


async function main() {
  const date = new Date(2020, 8, 23, 18, 15);
  const name = 'Louvre 3 - WOD RDC';

  const events = await getEvents(date);
  const myEvent = getEvent(events, date, name);
  if (myEvent) {
    console.log(`Waiting for event : \n${JSON.stringify(myEvent, null, 2)}`);
    retryBookEvent(myEvent);
  } else {
    console.log('Event not found');
  }
}


main();
