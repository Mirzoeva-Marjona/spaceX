export interface Flight {
    flight_number: number;
    name: string;
    date_utc: string;
    details: string;
    upcoming: boolean;
    links: {
        patch: {
            small: string;
        }
    }
}