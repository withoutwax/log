// AUTH STATE
auth.onAuthStateChanged(user => {

    if (user) {
        console.log('USER LOGGED IN:', user);

        // Get data from firestore
        db.collection('log').where("uid", "==", user.uid).orderBy("createdAt", "desc").onSnapshot(snapshot => {
            setupGuide(snapshot.docs) // sending data to setupGuides in index.js
            setupUI(user);
        });
    } else {
        setupUI();
        setupGuide([]);
    }

});

// SIGN UP
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // User email & password
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Sign Up process
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log('SIGN UP SUCCESS');

        const modal = document.querySelector('#modal-signup');
        modal.style.display = "none";
        signupForm.reset();
    });
});

// LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // User email & password
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log('LOG-IN SUCCESS');

        const modal = document.querySelector('#modal-login');
        modal.style.display = "none";
        loginForm.reset();
    });
});

//LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('USER SIGNED OUT');
    });
});

// CREATE NEW LOG
const createForm = document.querySelector('#create-form');

let today = new Date();
let dd = today.getDate();
let mm = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today); // If you wish to use the numberic value, use: today.getMonth() + 1; // January is 0!
let yyyy = today.getFullYear();

// console.log('today:', today, 'dd: ', dd, 'mm:', mm, 'yyyy:', yyyy);
// console.log(new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today));

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