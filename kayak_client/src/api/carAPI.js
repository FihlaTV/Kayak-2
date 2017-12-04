const headers = {
    'Accept': 'application/json'
};
export function searchcarsAPI(payload)
{
    console.log("its api"+payload.car_src_city);
    const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode: 'cors',
        headers: { ...headers,'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    return fetch('http://localhost:3002/cars/searchCars', requestOptions)
        .then((response) =>{
            return response;

        });
}
export function bookcarAPI(payload)
{
    console.log("its api"+payload);
    const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode: 'cors',
        headers: { ...headers,'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    return fetch('http://localhost:3002/cars/bookCar', requestOptions)
        .then((response) =>{
            return response;

        });
}