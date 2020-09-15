
import fetch from 'node-fetch';


async function getEvent(time: Date) {
    const eventTime = new Date(time);
    eventTime.setHours(eventTime.getHours() + 2);  // Need to add 2 hours to get the correct one
    const timeEnd = new Date(eventTime);
    timeEnd.setHours(timeEnd.getHours() + 1);
    const eventsArgs = [
        "appointments=true",
        "classes=true",
        "courses=true",
        `from=${encodeURIComponent(eventTime.toISOString())}`,
        "locationUUIDs",
        "page=0",
        "preventions=true",
        "providerId=ec233996-3901-4df0-882e-c28a8ff3a8eb",
        "retreats=true",
        "size=1",
        `to=${encodeURIComponent(timeEnd.toISOString())}`,
        "trainersUuids&workshops=true"
    ];
    const eventsUrl = `https://event-service.fitogram.pro/events?${eventsArgs.join('&')}`;
    const eventsResponse = await fetch(eventsUrl, {
        // "credentials": "include",
        "headers": {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:80.0) Gecko/20100101 Firefox/80.0",
        },
        "method": "GET",
        // "mode": "cors",
    });
    const eventsJson = await eventsResponse.json();
    console.log(JSON.stringify(eventsJson, null, 2));

    return eventsJson;
}


async function main() {
    getEvent(new Date(2020, 8, 16, 18, 15));
}


main();
