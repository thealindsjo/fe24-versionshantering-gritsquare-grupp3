import {getAllUsers} from './firebase.js';

export const messageDiv = document.getElementById('messageColumn');

export function displayAllUsers(userObj) {
    //console.log(memberObj)

    messageDiv.innerHTML = '';

    for (const firebaseID in userObj) {
        console.log(firebaseID, userObj[firebaseID]);

        const container = document.createElement('div');
        const userP = document.createElement('p');


        container.id = firebaseID;
        userP.innerText = userObj[firebaseID].userName;
        userP.style.fontWeight = 'bold';

        container.append(userP);
        messageDiv.append(container);

        const showMessage = document.createElement('p');
        showMessage.innerText = `${userObj[firebaseID].userMessage}`;
        messageDiv.append(showMessage);

    }
}