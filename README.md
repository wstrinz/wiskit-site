# wiskit-site

The small public site for Wiskit: what it is, where to get it, the contact-code page and the
privacy policy. Static files in `public/`, served by nginx (`Dockerfile`, `nginx.conf`).

- `public/links.js`: the App Store link, the Windows download and the contact email, in one place.
- `public/c/`: `https://<site>/c#<code>`. A contact QR code points here. The code stays in the URL
  fragment (never sent to the server); "Open in Wiskit" hands it to the app's `wiskit-contact:`
  link, where the app shows who it is and asks before adding.
- `public/privacy/`: the privacy policy the App Store listing links to.

Local preview: `python -m http.server 8765 --directory public`.
