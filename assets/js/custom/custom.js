// ----------------- | Cursor Effect |
for(const header of document.getElementsByClassName("mouse-tracker")) {
    header.onmousemove = e => {
        for(const card of document.getElementsByClassName("cursor-effect")) {
            const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
           
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    }
}

// ----------------- | Menu Underline |
const changeLine = document.querySelectorAll('.nav-link-1');

changeLine.forEach(changLin => {
    changLin.addEventListener('click', function () {
        document.querySelector('.nav-activ')?.classList.remove('nav-activ');
        this.classList.add('nav-activ');
    });
});

// ----------------- | Offcanvas |
const offcanvas = document.querySelector('.offcanvas');
const backdrop = document.querySelector('.offcanvas-backdrop');
const menuLinks = document.querySelectorAll('.menu-list a');
let isOpen = false;

function toggleMenu() {
    isOpen = !isOpen;
    
    if (isOpen) {
        offcanvas.style.visibility = 'visible';
        offcanvas.classList.add('show');
        backdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add click events to backdrop
        backdrop.addEventListener('click', toggleMenu);
        backdrop.addEventListener('contextmenu', handleBackdropRightClick);
    } else {
        offcanvas.classList.remove('show');
        backdrop.classList.remove('show');
        document.body.style.overflow = '';
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
            if (!isOpen) { // Double check state
                offcanvas.style.visibility = 'hidden';
            }
        }, 300); // Match the transition duration
        
        // Remove backdrop events
        backdrop.removeEventListener('click', toggleMenu);
        backdrop.removeEventListener('contextmenu', handleBackdropRightClick);
    }
}

function handleBackdropRightClick(event) {
    event.preventDefault(); // Prevent default context menu
    if (isOpen) {
        toggleMenu();
    }
}

// Handle menu item clicks
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent immediate navigation
        const href = link.getAttribute('href');
        toggleMenu(); // Close the menu
        
        // Wait for menu close animation to complete before navigating
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Close menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isOpen) {
        toggleMenu();
    }
});

// ----------------- | Swiper Slide |
const slider = document.querySelector('.swiper-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentPosition = 0;

function updateSliderPosition() {
    slider.style.transform = `translateX(${currentPosition}px)`;
    
    // Enable/disable buttons based on position
    prevButton.disabled = currentPosition >= 0;
    nextButton.disabled = Math.abs(currentPosition) >= (slider.scrollWidth - slider.clientWidth);
}

function calculateSlideDistance() {
    const column = document.querySelector('.column');
    return column.offsetWidth + parseInt(getComputedStyle(column).marginRight);
}

function handleResize() {
    // Reset position when screen size changes
    currentPosition = 0;
    updateSliderPosition();
}

prevButton.addEventListener('click', () => {
    const slideDistance = calculateSlideDistance();
    if (currentPosition < 0) {
        currentPosition += slideDistance;
        updateSliderPosition();
    }
});

nextButton.addEventListener('click', () => {
    const slideDistance = calculateSlideDistance();
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    if (Math.abs(currentPosition) < maxScroll) {
        currentPosition -= slideDistance;
        updateSliderPosition();
    }
});

// Handle window resize
window.addEventListener('resize', handleResize);

// Initial button state
updateSliderPosition();

// ----------------- | Hover Effect |
document.querySelectorAll('[data-hover-trigger]').forEach(trigger => {
    // Find closest parent card
    const card = trigger.closest('.card');
    
    // Find all targets within this card
    const targets = card.querySelectorAll('[data-hover-target]');
    
    // Add hover events
    trigger.addEventListener('mouseenter', () => {
        targets.forEach(target => target.classList.add('active'));
    });
    
    trigger.addEventListener('mouseleave', () => {
        targets.forEach(target => target.classList.remove('active'));
    });
});

// ----------------- |  |
let ConName = document.getElementById('contact_name');
let NameError = document.getElementById('name_error');
let ConEmail = document.getElementById('contact_email');
let EmailError = document.getElementById('email_error');
let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
let ConMessage = document.getElementById('contact_message');
let MessageError = document.getElementById('message_error');
let CheckError = document.getElementById('check_error');
let CheckFixt = document.getElementById('check_fixt');
let hadError = false; // Track if there was an error

function sub() {
    // Reset status messages
    CheckError.style.display = 'none';
    CheckFixt.style.display = 'none';
    
    let hasError = false;

    if (ConName.value == '') {
        NameError.innerHTML = 'Please fill out this field.';
        hasError = true;
        ConName.focus();
    }
    
    if (ConEmail.value == '') {
        EmailError.innerHTML = 'Please fill out this field.';
        hasError = true;
        if (!ConName.value == '') ConEmail.focus();
    } else if (!regex.test(ConEmail.value)) {
        EmailError.innerHTML = 'Please enter a valid email address.';
        hasError = true;
        if (!ConName.value == '') ConEmail.focus();
    }
    
    if (ConMessage.value == '') {
        MessageError.innerHTML = 'Please fill out this field.';
        hasError = true;
        if (!ConName.value == '' && !ConEmail.value == '') ConMessage.focus();
    }

    if (hasError) {
        hadError = true; // Set flag when there's an error
        CheckError.innerHTML = 'One or more fields have an error. Please check and try again.';
        CheckError.style.display = 'block';
        return false;
    }
    return true;
}

function errvalid() {
    if (ConName.value != '') {
        NameError.innerHTML = '';
    }
    if (ConEmail.value != '') {
        EmailError.innerHTML = '';
    }
    if (ConMessage.value != '') {
        MessageError.innerHTML = '';
    }
    if (regex.test(ConEmail.value)) {
        EmailError.innerHTML = '';
    }
    
    // Check if all conditions are met AND there was a previous error
    if (ConName.value != '' && ConEmail.value != '' && ConMessage.value != '' && regex.test(ConEmail.value)) {
        CheckError.style.display = 'none';
        if (hadError) { // Only show success message if there was a previous error
            CheckFixt.innerHTML = 'All condition is complete.';
            CheckFixt.style.display = 'block';
        }
    }
}

ConName.addEventListener('blur', errvalid);
ConEmail.addEventListener('blur', errvalid);
ConMessage.addEventListener('blur', errvalid);

// ----------------- |  |

// ----------------- |  |
