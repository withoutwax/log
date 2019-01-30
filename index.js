const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');
const inspirationList = document.querySelector('.inspirations');

// NAVBAR SETUP
const setupUI = (user) => {
    
    if (user) {
        const accountDetail = `<div>Logged in as ${user.email}</div>`;
        accountDetails.innerHTML = accountDetail;

        // NAV BAR
        // console.log(loggedInLinks);
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        accountDetails.innerHTML = '';

        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// DISPLAY CONTENT
const setupGuide = (data) => {
    if (data.length) {

        let html = '';
        let currentUser = firebase.auth().currentUser;

        data.forEach(doc => {
            const insp = doc.data();

            if (currentUser.uid == insp.uid) {
                const div = `
                <div>
                    <h3 class="collapsible-header">${insp.title}</h3>
                    <li class="collapsible-body">${insp.inspiration01}</li>
                </div>
                `;
                html += div;
            }
        });

        inspirationList.innerHTML = html;
    } else {
        inspirationList.innerHTML = '<h5>Log in to view your inspiration lists</h5>';
    }
}