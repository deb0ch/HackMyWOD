import fetch from 'node-fetch';

import { BookResponse, EventResponse, OrderLine } from './types';


const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidGhvbWFzLmRlLmJlYXVjaGVuZUBnbWFpbC5jb20iLCJ1c2VyX2xhbmd1YWdlIjoiZnIiLCJ1c2VyX3V1aWQiOiIzMjE4OTZiMS1hMWNlLTRlMGItODExZC0wNjViZjE3NGY4NWMiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwidXNlcl9kaXNwbGF5X25hbWUiOiJUaG9tYXMgZGUgQmVhdWNow6puZSIsInNjb3BlIjpbImVtYWlsIiwicHJvZmlsZSIsIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIl0sInN1YiI6IjMyMTg5NmIxLWExY2UtNGUwYi04MTFkLTA2NWJmMTc0Zjg1YyIsImNsaWVudF9pZCI6IjcxNGU0OWJkLTZiNmMtNGM4MS04YjJhLWE0NzhkNWYzNTcwYiIsImlhdCI6IjE1OTg5NDkzMjYiLCJleHAiOiIxNjMwNDg1MzI2In0.EgmFbWZ8sYK1HBHnafqeUo0DOlgrHM6pvo7vBXLRmKw';


async function getEvents(eventTime: Date): Promise<EventResponse[]> {
  const timeStart = new Date(eventTime);
  timeStart.setHours(timeStart.getHours() - 1);
  const timeEnd = new Date(eventTime);
  timeEnd.setDate(timeEnd.getDate() + 1);
  const eventsArgs = [
    'appointments=true',
    'classes=true',
    'courses=true',
    `from=${encodeURIComponent(timeStart.toISOString())}`,
    'locationUUIDs',
    'page=0',
    'preventions=true',
    'providerId=ec233996-3901-4df0-882e-c28a8ff3a8eb',
    'retreats=true',
    'size=20',
    `to=${encodeURIComponent(timeEnd.toISOString())}`,
    'trainersUuids&workshops=true',
  ];
  const eventsUrl = `https://event-service.fitogram.pro/events?${eventsArgs.join('&')}`;
  const eventsResponse = await fetch(eventsUrl, {
    // "credentials": "include",
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:80.0) Gecko/20100101 Firefox/80.0',
    },
    method: 'GET',
    // "mode": "cors",
  });
  const eventsJson = await eventsResponse.json() as EventResponse[];

  return eventsJson;
}


async function getOrderLines(eventId: string): Promise<OrderLine[]> {
  const orderLinesUrl = `https://api.fitogram.pro/event/${eventId}/customers/1195463/orderlines?`;
  const orderLines = await fetch(orderLinesUrl, {
    // "credentials": "include",
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'fr',
      Authorization: `Bearer ${jwtToken}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:80.0) Gecko/20100101 Firefox/80.0',
      'X-Application': 'widget',
      'X-Version': '2.2.7-b4715',
      'app-id': 'BOOKING_TOOL_PAGE',
      'app-version': '2.2.7-b4715',
    },
    // "referrer": "https://widget.fitogram.pro/reebok-crossfit-louvre/?f=location/7746657f-c896-44db-aaa7-8820bdb0be40&w=/event/2700f5a0-06e9-40ac-80d3-92ffebd3fe45",
    method: 'GET',
    // "mode": "cors"
  });
  const ordersJson = await orderLines.json() as OrderLine[];

  return ordersJson;
}


async function postBookEvent(eventId: string, orderLineId: string): Promise<BookResponse> {
  const bookArgs = [
    'customerId=1195463',
    `eventId=${eventId}`,
    `orderLineId=${orderLineId}`,
    'origin=BOOKING_TOOL_PAG',
    'sendMail=true',
  ];
  const bookUrl = `https://api.fitogram.pro/bookings?${bookArgs.join('&')}`;
  const bookResponse = await fetch(bookUrl, {
    // "credentials": "include",
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'fr',
      Authorization: `Bearer ${jwtToken}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:80.0) Gecko/20100101 Firefox/80.0',
      'X-Application': 'widget',
      'X-Version': '2.2.7-b4715',
      'app-id': 'BOOKING_TOOL_PAGE',
      'app-version': '2.2.7-b4715',
    },
    // "referrer": "https://widget.fitogram.pro/reebok-crossfit-louvre/?f=location/7746657f-c896-44db-aaa7-8820bdb0be40&w=/event/2700f5a0-06e9-40ac-80d3-92ffebd3fe45",
    method: 'POST',
    // "mode": "cors"
  });
  const bookJson = await bookResponse.json() as BookResponse;

  return bookJson;
}


export {
  getEvents,
  getOrderLines,
  postBookEvent,
};
