const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');
const logList = document.querySelector('.logs');
const detailArea = document.querySelector('.detail');

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

        // console.log(data);

        data.forEach(doc => {
            const log = doc.data();

            let log_div = ``;
            current_date = log.date.mm + log.date.dd + log.date.yyyy;
            if (current_date in exist_date) {
                log_div = `
                <div class="main-log" style="margin-top:50px;" id="${doc.id}" onclick="detailPage(this)" >
                    <span class="log-category">${log.category}</span>
                    <div class="log-details">
                        <h3 class="log-header">${log.title}</h3>
                        <p class="log-url">${log.url}</p>
                        <p class="log-body">${log.description}</p>
                    </div>
                </div>
                `
            } else {
                exist_date[current_date] = true;
                log_div = `
                <h1 class="main-date-header">${log.date.mm} ${log.date.dd}, ${log.date.yyyy}</h1>
                <div class="main-log" id="${doc.id}" onclick="detailPage(this)">
                    <span class="log-category">${log.category}</span>
                    <div class="log-details">
                        <h3 class="log-header">${log.title}</h3>
                        <p class="log-url">${log.url}</p>
                        <p class="log-body">${log.description}</p>
                    </div>
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

// DISPLAY DETAIL
function detailPage(e) {
    console.log('Ready to display detail Page!');
    console.log('element', e);
    console.log('id', e.id);

    let log_data = db.collection('log').doc(e.id);

    // Valid options for source are 'server', 'cache', or
    // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
    // for more information.
    let getOptions = {
        source: 'cache'
    };
    log_data.get(getOptions).then(function (doc) {
        console.log(doc.data());

        const log = doc.data();

        detailArea.innerHTML = `
        <div class="edit-log button-03" id="edit-log"><a href="#">Edit</a></div>
        <span class="log-category">${log.category}</span>
        <h1 class="log-header">${log.title}</h1>
        <div class="log-details">
            <p class="log-url">${log.url}</p>
            <li class="log-body">${log.description}</li>
        </div>
        `;
        return log;
    }).then((log) => { // EDITING THE LOG

        let finishEdit = new Promise(function(resolve, reject) {
            document.querySelector('.edit-log').addEventListener('click', function() {
                
                console.log('Edit!!');
                detailArea.innerHTML = `
                <div class="edit-log button-03" id="edit-log" style="visibility:hidden;"><a href="#">Edit</a></div>
                <span class="log-category edit-category">${log.category}</span>
                <h1 class="log-header edit-header" contenteditable="true">${log.title}</h1>
                <div class="log-details edit-details">
                    <p class="log-url edit-url" contenteditable="true">${log.url}</p>
                    <li class="log-body edit-description" contenteditable="true">${log.description}</li>
                </div>
                <br />
                <div class="save-log button-01" id="save-log"><a href="#">Save</a></div>
                `;
                // Implement forms & functionality here.
                // USER 
                resolve();
            });
        });
        
        finishEdit.then(() => {
            document.querySelector('.save-log').addEventListener('click', function() {
                console.log(e.id);
                let newTitle = document.querySelector('.edit-header').innerHTML;
                let newUrl = document.querySelector('.edit-url').innerHTML;
                let newDescription = document.querySelector('.edit-description').innerHTML;

                db.collection('log').doc(e.id).update({ 
                    title: newTitle,
                    description: newDescription,
                    url: newUrl,
                    updatedAt: firebase.firestore.Timestamp.fromDate(new Date())
                });
                detailPage(e);
            });
        });
    });
}