const BaseUrl = 'https://gritsquare-default-rtdb.europe-west1.firebasedatabase.app/users';


export async function getAllUsers() {
    const url = BaseUrl + '.json';

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        }

        const userObj = await res.json();
        return userObj;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null; 
    }
}

export async function postUser(user) {
    const url = BaseUrl + '.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }
    };

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Failed to post user: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data; 
    } catch (error) {
        console.error('Error posting user:', error);
        return null; 
    }
}

/** 
export async function deleteAllMessages(id){
    const url = BaseUrl + `/${id}.json`;
    const options = {
        method: 'DELETE'
    }
    
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}
    **/

/** 
export async function patchBanned(id, banned){
    console.log(id, banned)

    const url = BaseUrl + `/${id}.json`;
    const options = {
        method: 'PATCH', 
        body: JSON.stringify( {banned} ),
        headers: {
            'Content-type': 'application/json'
        }
    }
}
    **/

export async function patchBanned(id, banned) {
    console.log("Patching user:", id, "Banned:", banned);

    const url = BaseUrl + `/${id}.json`;
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ banned }), 
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`Failed to patch user: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Successfully updated banned status:", data);
        return data; 
    } catch (error) {
        console.error("Error patching banned status:", error);
        return null; 
    }
}