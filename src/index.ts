
import { getEvents, getOrderLines, postBookEvent } from './fetch'


async function main() {
    const events = await getEvents(new Date(2020, 8, 22, 18, 45));
    const eventId = events[0].id;
    const orderLineId = await getOrderLines(eventId);
    postBookEvent(eventId, orderLineId);
}


main();
