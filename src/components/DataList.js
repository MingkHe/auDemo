import React, { Component } from 'react';
import config from "../config";
import  load from "../helpers/spreadsheet";

class DataList extends Component {
    state = {
        cars: [],
        error: null
    }

    componentDidMount() {
        // 1. Load the JavaScript client library.
        window.gapi.load("client", this.initClient);
    }

    initClient = () => {
        // 2. Initialize the JavaScript client library.
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                // Your API key will be automatically added to the Discovery Document URLs.
                discoveryDocs: config.discoveryDocs
            })
            .then(() => {
                // 3. Initialize and make the API request.
                load(this.onLoad);
            });
    };

    onLoad = (data, error) => {
        if (data) {
            const cars = data.cars;
            this.setState({cars});
        } else {
            this.setState({error})
        }
    };

    render() {
        const {cars, error} = this.state;
        if (error) {
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <ul>
                    <div>
                        date sales rent
                    </div>
                    {cars.map((car, i) => (
                        <li key = {i}>
                            {car.date}{car.net} {car.rent}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default DataList;
