class DataApi {
    constructor(rawData){
        this.rawData = rawData;
    }
    toObjects(arr){
        return arr.reduce((acc,curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
    }
    getPitStops(){
        return this.toObjects(this.rawData.pitstops)
    }
}
export default DataApi