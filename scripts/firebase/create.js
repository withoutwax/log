// =========================================================
// DATE CONFIGURATION
const projectForm = document.querySelector('#project-form');

let today = new Date();
let dd = today.getDate();
let mm = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today); // If you wish to use the numberic value, use: today.getMonth() + 1; // January is 0!
let yyyy = today.getFullYear();



// =========================================================
// CREATE NEW LOG
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Only show content that is related to the logged in user.
    let user = firebase.auth().currentUser;

    let categoryIndex = createForm['category'].options.selectedIndex;
    // console.log(createForm['category'].options[categoryIndex].text);

    db.collection('log').add({
        title: createForm['title'].value,
        description: createForm['description'].value,
        url: createForm['url'].value,
        category: createForm['category'].options[categoryIndex].text,
        date: {
            mm: mm,
            dd: dd,
            yyyy: yyyy
        },
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        uid: user.uid
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        modal.style.display = "none";
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

// =========================================================
// UPDATE DATA



// =========================================================
// =========================================================
// COMING SOON
// =========================================================
// =========================================================
// CREATE NEW PROJECT
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Only show content that is related to the logged in user.
    let user = firebase.auth().currentUser;

    let categoryIndex = projectForm['project-category'].options.selectedIndex;
    // console.log(projectForm['category'].options[categoryIndex].text);

    db.collection('project').add({
        name: projectForm['project-name'].value,
        description: projectForm['project-description'].value,
        url: projectForm['project-url'].value,
        category: projectForm['project-category'].options[categoryIndex].text,
        date: {
            mm: mm,
            dd: dd,
            yyyy: yyyy
        },
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        uid: user.uid
    }).then(() => {
        const modal = document.querySelector('#modal-project');
        modal.style.display = "none";
        projectForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});
