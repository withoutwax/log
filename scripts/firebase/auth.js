// AUTH STATE
auth.onAuthStateChanged(user => {

    if (user) {
        console.log('LOGGED IN USER:', user);

        // Get data from firestore
        db.collection('categories').onSnapshot(snapshot => {
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

// CREATE NEW INSP
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Only show content that is related to the logged in user.
    let user = firebase.auth().currentUser;

    db.collection('categories').add({
        title: createForm['title'].value,
        inspiration01: createForm['insp01'].value,
        inspiration02: createForm['insp02'].value,
        inspiration03: createForm['insp03'].value,
        uid: user.uid
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        modal.style.display = "none";
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });

});