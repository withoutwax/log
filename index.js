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
        let exist_date = {};

        data.forEach(doc => {
            const log = doc.data(); 
            let log_div = ``;
            current_date = log.date.mm + log.date.dd + log.date.yyyy;
            if (current_date in exist_date) {
                log_div = `
                <div class="main-log">
                    <p>${log.category}</p>
                    <h3 class="collapsible-header">${log.title}</h3>
                    <li class="collapsible-body">${log.description}</li>
                </div>
                `
            } else {
                exist_date[current_date] = true;
                log_div = `
                <h1 class="main-date-header">${log.date.mm} ${log.date.dd}, ${log.date.yyyy}</h1>
                <div class="main-log">
                    <p>${log.category}</p>
                    <h3 class="collapsible-header">${log.title}</h3>
                    <li class="collapsible-body">${log.description}</li>
                </div>
                `;
            }

            html += log_div;
        });

        logList.innerHTML = html;
    } else {
        logList.innerHTML = '<h5>Log in to view your log lists</h5>';
    }
}