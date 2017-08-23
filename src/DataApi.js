class DataApi {
    constructor(rawData) {
        this.rawData = rawData;
    }

    getPitStops() {
        return this.rawData._embedded.pitstops;
    }
}

export default DataApi;
