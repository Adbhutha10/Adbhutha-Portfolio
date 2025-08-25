const hamb = document.querySelector('.header .nav-bar .nav-list .hamb');
 const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
 const header = document.querySelector('.header.container');
 const menu_items = document.querySelectorAll('.header .nav-bar .nav-list ul li a');

 hamb.addEventListener('click', () => {
	hamb.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if(scroll_position > 250){
        header.style.backgroundColor = '#29323c';
    }else{
        header.style.backgroundColor = 'transparent';
    }
});

menu_items.forEach((item) => {
	item.addEventListener('click', () => {
		hamb.classList.remove('active');
		mobile_menu.classList.remove('active');
	});
});

// Contact form submission via Fetch (Formspree)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatus.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        // Set _replyto so replies go to sender
        if (!formData.get('_replyto')) {
            formData.set('_replyto', formData.get('email'));
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (response.ok) {
                formStatus.textContent = 'Thanks! Your message has been sent.';
                contactForm.reset();
            } else {
                formStatus.textContent = 'Something went wrong. Please try again later.';
            }
        } catch (err) {
            formStatus.textContent = 'Network error. Please check your connection and try again.';
        }
    });
}