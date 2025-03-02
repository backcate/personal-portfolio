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
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.swiper-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    // Only initialize the slider if elements exist
    if (slider && prevButton && nextButton) {
        let currentPosition = 0;

        function updateSliderPosition() {
            slider.style.transform = `translateX(${currentPosition}px)`;
            
            // Enable/disable buttons based on position
            prevButton.disabled = currentPosition >= 0;
            nextButton.disabled = Math.abs(currentPosition) >= (slider.scrollWidth - slider.clientWidth);
        }

        function calculateSlideDistance() {
            const column = document.querySelector('.column');
            if (column) {
                return column.offsetWidth + parseInt(getComputedStyle(column).marginRight);
            }
            return 100; // Default value if column not found
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
    }
});

// ----------------- | Hover Effect |
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-hover-trigger]').forEach(trigger => {
        // Find closest parent card
        const card = trigger.closest('.card');
        if (card) {
            // Find all targets within this card
            const targets = card.querySelectorAll('[data-hover-target]');
            
            // Add hover events
            trigger.addEventListener('mouseenter', () => {
                targets.forEach(target => target.classList.add('active'));
            });
            
            trigger.addEventListener('mouseleave', () => {
                targets.forEach(target => target.classList.remove('active'));
            });
        }
    });
});

// ----------------- | Contact |
document.addEventListener('DOMContentLoaded', () => {
    let ConName = document.getElementById('contact_name');
    let NameError = document.getElementById('name_error');
    let ConEmail = document.getElementById('contact_email');
    let EmailError = document.getElementById('email_error');
    let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    let ConMessage = document.getElementById('contact_message');
    let MessageError = document.getElementById('message_error');
    let CheckError = document.getElementById('check_error');
    let CheckFixt = document.getElementById('check_fixt');
    
    // Only set up contact form if elements exist
    if (ConName && ConEmail && ConMessage) {
        let hadError = false; // Track if there was an error

        window.sub = function() {
            // Reset status messages
            if (CheckError) CheckError.style.display = 'none';
            if (CheckFixt) CheckFixt.style.display = 'none';
            
            let hasError = false;

            if (ConName.value == '') {
                if (NameError) NameError.innerHTML = 'Please fill out this field.';
                hasError = true;
                ConName.focus();
            }
            
            if (ConEmail.value == '') {
                if (EmailError) EmailError.innerHTML = 'Please fill out this field.';
                hasError = true;
                if (!ConName.value == '') ConEmail.focus();
            } else if (!regex.test(ConEmail.value)) {
                if (EmailError) EmailError.innerHTML = 'Please enter a valid email address.';
                hasError = true;
                if (!ConName.value == '') ConEmail.focus();
            }
            
            if (ConMessage.value == '') {
                if (MessageError) MessageError.innerHTML = 'Please fill out this field.';
                hasError = true;
                if (!ConName.value == '' && !ConEmail.value == '') ConMessage.focus();
            }

            if (hasError) {
                hadError = true; // Set flag when there's an error
                if (CheckError) {
                    CheckError.innerHTML = 'One or more fields have an error. Please check and try again.';
                    CheckError.style.display = 'block';
                }
                return false;
            }
            return true;
        }

        function errvalid() {
            if (ConName.value != '' && NameError) {
                NameError.innerHTML = '';
            }
            if (ConEmail.value != '' && EmailError) {
                EmailError.innerHTML = '';
            }
            if (ConMessage.value != '' && MessageError) {
                MessageError.innerHTML = '';
            }
            if (regex.test(ConEmail.value) && EmailError) {
                EmailError.innerHTML = '';
            }
            
            // Check if all conditions are met AND there was a previous error
            if (ConName.value != '' && ConEmail.value != '' && ConMessage.value != '' && regex.test(ConEmail.value)) {
                if (CheckError) CheckError.style.display = 'none';
                if (hadError && CheckFixt) { // Only show success message if there was a previous error
                    CheckFixt.innerHTML = 'All condition is complete.';
                    CheckFixt.style.display = 'block';
                }
            }
        }

        ConName.addEventListener('blur', errvalid);
        ConEmail.addEventListener('blur', errvalid);
        ConMessage.addEventListener('blur', errvalid);
    }
});

// ----------------- | Popup Image |
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing gallery');
    
    // Get all elements using more specific selectors
    const images = Array.from(document.querySelectorAll('.image-call'));
    const popup = document.querySelector('.image-popup');
    const closeBtn = document.querySelector('.close-btn');
    const imageName = document.querySelector('.image-name');
    const largeImage = document.querySelector('.large-image');
    const imageIndex = document.querySelector('.numbering');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    console.log('Images found:', images.length);
    console.log('Popup element found:', !!popup);
    
    // Initialize index for tracking current image
    let index = 0;
    
    // Make sure elements exist before adding event listeners
    if (!popup || images.length === 0) {
        console.error('Required gallery elements not found');
        return;
    }
    
    // Function to update the popup image
    const updateImage = (i) => {
        if (i < 0 || i >= images.length) return;
        
        // Get the actual src from the thumbnail
        const originalSrc = images[i].getAttribute('src');
        console.log('Original src:', originalSrc);
        
        // Check if elements exist before updating
        if (largeImage) largeImage.src = originalSrc;
        if (imageName) imageName.textContent = originalSrc;
        if (imageIndex) imageIndex.textContent = i+1 < 10 ? `0${i+1}` : `${i+1}`;
        
        index = i;
    };
    
    // Add click event listeners to each thumbnail
    images.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            console.log(`Image ${i+1} clicked`);
            updateImage(i);
            if (popup) popup.classList.add('active');
        });
    });
    
    // Close button event
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            popup.classList.remove('active');
        });
    }
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (!popup || !popup.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            popup.classList.remove('active');
        } else if (e.key === 'ArrowLeft' && index > 0) {
            updateImage(index - 1);
        } else if (e.key === 'ArrowRight' && index < images.length - 1) {
            updateImage(index + 1);
        }
    });
    
    // Left arrow event
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            console.log('Left arrow clicked');
            if (index > 0) {
                updateImage(index - 1);
            }
        });
    }
    
    // Right arrow event
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            console.log('Right arrow clicked');
            if (index < images.length - 1) {
                updateImage(index + 1);
            }
        });
    }
    
    // Close popup when clicking outside the image
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    }
});
