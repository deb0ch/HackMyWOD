
import { EventResponse } from './types';


/**
 * Was the booking API call a success and an event was booked.
 * The field 'success' will only appear in case of failure.
 * @param bookResponse: The json object from the API response
 */
function isBookSuccess(bookResponse: Record<string, unknown>): boolean {
  return !Object.prototype.hasOwnProperty.call(bookResponse, 'success');
}


function getEvent(events: Array<EventResponse>, startTime: Date, name: string)
: EventResponse | undefined {
  return events.find(event =>
    event.name.includes(name)
    && new Date(event.start).toISOString() === startTime.toISOString()
  );
}


function getStartDate(event: EventResponse): Date{
  return new Date(event.start);
}


async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


export {
  isBookSuccess,
  getEvent,
  getStartDate,
  sleep,
}
