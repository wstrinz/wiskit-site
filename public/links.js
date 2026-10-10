// The one place to change links. Empty means "not available yet"; the pages say so.
window.WISKIT_LINKS = {
	// The App Store page (unlisted link) once Apple approves the app.
	appStore: '',
	// The latest Windows installer.
	windows: '',
	// Support and privacy contact.
	email: 'wiskitapp@gmail.com'
};

// Fill every element marked data-link="appStore|windows|email".
document.addEventListener('DOMContentLoaded', () => {
	const links = window.WISKIT_LINKS;
	for (const el of document.querySelectorAll('[data-link]')) {
		const key = el.getAttribute('data-link');
		const value = links[key];
		if (value) {
			el.setAttribute('href', key === 'email' ? `mailto:${value}` : value);
			if (key === 'email') el.textContent = value;
			el.removeAttribute('aria-disabled');
		} else {
			el.removeAttribute('href');
			el.setAttribute('aria-disabled', 'true');
			const soon = el.getAttribute('data-soon');
			if (soon) el.textContent = soon;
		}
	}
});
