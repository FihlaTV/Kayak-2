const headers = {
    'Accept': 'application/json'
};
export function searchhotelsAPI(payload) {
    console.log("its api" + payload.src_city+payload.capacity);
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {...headers, 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    };
    return fetch('http://localhost:3002/hotels/searchHotels', requestOptions)
        .then((response) => {
            return response;

        });
}
export function bookhotelAPI(payload)
{
    console.log("its api"+payload);
    const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode: 'cors',
        headers: { ...headers,'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    return fetch('http://localhost:3002/hotels/bookHotel', requestOptions)
        .then((response) =>{
            return response;

        });
}