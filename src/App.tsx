import React, {useEffect, useState} from 'react';
import "./styles.css";
import {FilterComponent} from "./сomponents/filter.component";
import {CardComponent} from "./сomponents/card.component";
import {findFlight, findLaunchSite, findRocket} from "./services/data.service";
import {Flight} from "./models/flight";
import {Rocket} from "./models/rocket";
import {LaunchSize} from "./models/launch-site";

export default function App() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [rockets, setRockets] = useState<Rocket[]>([]);
    const [launchSite, setLaunchSite] = useState<LaunchSize[]>([]);

    const [filterRocket, setFilterRocket] = useState<string>("");
    const [filterLaunchesSite, setFilterLaunchesSite] = useState<string>("");
    const [error, setError] = useState<string>();

    useEffect(() => {
        findRocket<Array<Rocket>>()
            .then(rcs => {
                return setRockets(rcs);
            })
            .catch(reason => setError(reason.text));
        findLaunchSite<Array<LaunchSize>>()
            .then(lss => {
                return setLaunchSite(lss);
            })
            .catch(reason => setError(reason.text));
    }, [])

    useEffect(() => {
        findFlight<Array<Flight>>(filterRocket, filterLaunchesSite)
            .then(fls => {
                return setFlights(fls)
            })
            .catch(reason => setError(reason.text));
    }, [filterRocket, filterLaunchesSite]);

    function filterRocketChanged(value: string) :void {
        setFilterRocket(value);
    }

    function filterLaunchSiteChanged(value: string) :void {
        setFilterLaunchesSite(value);
    }

    return (
        <div className="app">
            <h1>Launches</h1>
            <h2>{error}</h2>
            <div className={"filter-holder"}>
                <FilterComponent  title={"Launches site"} options={launchSite} onChange={filterLaunchSiteChanged}/>
                <FilterComponent title={"Rocket"} options={rockets} onChange={filterRocketChanged}/>
            </div>
            <div>
                {flights.map(flight =>
                    <CardComponent key={flight.flight_number}
                                   imgUrl={flight.links.patch.small}
                                   title={flight.name}
                                   text={flight.upcoming ? "Upcoming" : flight.details}
                                   date={new Intl.DateTimeFormat("ru").format(new Date(flight.date_utc))}/>
                )}
            </div>
        </div>
    );
}
