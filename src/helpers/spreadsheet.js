import config from "../config";
/**
 * Load the data from the spreadsheet
 * Get the right values from it and assign.
 */
export default function load(callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.spreadsheetId,
                range: "P+L!C1:T",
                majorDimension: "COLUMNS"
            })
            .then(
                response => {
                    const data = response.result.values;
                    const cars = data.map(car => ({
                        date: car[0],
                        net: car[2],
                        rent: car[4]
                        // year: car[0],
                        // make: car[1],
                        // model: car[2]
                    })) || [];
                    callback({
                        cars
                    });
                },
                response => {
                    //callback(false, response.result.error);
                }
            );
    });
}

