const BaseUrl = 'https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/users';


export async function postUser(user) {
    const url = BaseUrl + '.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    //console.log(data);
}


export async function postMessage(message) {
    const url = BaseUrl + '.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    //console.log(data);
}
