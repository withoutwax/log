const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');
const logList = document.querySelector('.logs');

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
            const log = doc.data();
            console.log(log);
            const log_div = `
                <div>
                    <h1>${log.date.mm} ${log.date.dd}, ${log.date.yyyy}</h1>
                    <p>${log.category}</p>
                    <h3 class="collapsible-header">${log.title}</h3>
                    <li class="collapsible-body">${log.description}</li>
                </div>
                `;
                html += log_div;
        });

        logList.innerHTML = html;
    } else {
        logList.innerHTML = '<h5>Log in to view your log lists</h5>';
    }
}