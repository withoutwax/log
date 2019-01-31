// COLLAPSIBLE LIST
let collapsibleHeader = document.querySelectorAll('.collapsible-header');

// console.log('collapsibleHeader', collapsibleHeader);

for (let i = 0; i < collapsibleHeader.length; i++) {
    collapsibleHeader[i].addEventListener('click', () => {
        console.log('Clicked Title!');
        let panel = collapsibleHeader[i].nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// MODAL
let modals = document.querySelectorAll('.modal');
let modalTriggers = document.querySelectorAll('.modal-trigger');
// console.log(modalTriggers);

let activeModal;

for (let i = 0; i < modalTriggers.length; i++) {
    modalTriggers[i].addEventListener('click', () => {
        // get data-target attribute from the nav button
        let modalTriggerType = modalTriggers[i].getAttribute('data-target');
        
        for (let j = 0; j < modals.length; j++) {
            // console.log(modals[j]);

            if (modals[j].style.display == "block") {
                modals[j].style.display = "none";
                activeModal = undefined;
            } else if(modalTriggerType == modals[j].id) {
                modals[j].style.display = "block";
                activeModal = modals[j];
            }
        }
    });
}

let modalClose = document.querySelectorAll('.modal-close');

for (let i = 0; i < modalClose.length; i++) {
    modalClose[i].addEventListener('click', () => {
        if (activeModal != undefined) {
            activeModal.style.display = "none";
            activeModal = undefined;
        }
    });
}