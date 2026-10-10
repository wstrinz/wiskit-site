// A contact code arrives as https://<site>/c#<code> (the part after # never reaches the
// server). The code is base64url; anything else is ignored. "Open in Wiskit" hands it to the
// app's own wiskit-contact: link, where the app shows who it is and asks before adding.
function showCode() {
	let code = '';
	try {
		code = decodeURIComponent(location.hash.slice(1)).trim();
	} catch {
		code = '';
	}
	const valid = /^[A-Za-z0-9_-]{16,4096}$/.test(code);
	document.getElementById('has-code').hidden = !valid;
	document.getElementById('no-code').hidden = valid;
	const open = document.getElementById('open-in-wiskit');
	if (valid) open.setAttribute('href', `wiskit-contact:${code}`);
	else open.removeAttribute('href');
}

document.addEventListener('DOMContentLoaded', showCode);
window.addEventListener('hashchange', showCode);
