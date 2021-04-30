function toObject<T>(json: Promise<Response>): Promise<T> {
    return json.then(response => {
            return response.json()
        }
    )
        .then(data => {
            return data.docs
        })
        .catch(error => {
            console.error('Error in fetching data', error);
            return []
        });
}

interface FlightRequest {
    query: {
        rocket?: string
        launchpad?: string
    }
    options: {
        select: string[]
        limit: number
    }
}

export function findFlight<T>(filterRocket: string, filterLaunchesSite: string): Promise<T> {
    let value : FlightRequest = {
        query: {
        },
        options: {
            select: ["name", "flight_number", "date_utc", "details", "upcoming", "links.patch.small"],
            limit: 1000000
        }
    };
    if (filterRocket && filterRocket !== "") {
        value.query.rocket = filterRocket;
    }
    if (filterLaunchesSite && filterLaunchesSite !== "") {
        value.query.launchpad = filterLaunchesSite;
    }

    return toObject<T>(fetch("https://api.spacexdata.com/v4/launches/query",
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(
                value
            )
        })
    );
}

export function findLaunchSite<T>(): Promise<T> {
    return toObject<T>(fetch("https://api.spacexdata.com/v4/launchpads/query",
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(
                {
                    query: {},
                    options: {
                        select: ["name", "id"],
                        limit: 1000000
                    }
                }
            )
        })
    );
}

export function findRocket<T>(): Promise<T> {
    return toObject<T>(fetch("https://api.spacexdata.com/v4/rockets/query",
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(
                {
                    query: {},
                    options: {
                        select: ["name", "id"],
                        limit: 1000000
                    }
                }
            )
        })
    );
}