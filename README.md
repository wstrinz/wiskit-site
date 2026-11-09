# wiskit-site

The small public site for Wiskit: what it is, where to get it, the contact-code page and the
privacy policy. Static files in `public/`, served by nginx (`Dockerfile`, `nginx.conf`).

- `public/links.js`: the App Store link, the Windows download and the contact email, in one place.
- `public/c/`: `https://<site>/c#<code>`. A contact QR code points here. The code stays in the URL
  fragment (never sent to the server); "Open in Wiskit" hands it to the app's `wiskit-contact:`
  link, where the app shows who it is and asks before adding.
- `public/privacy/`: the privacy policy the App Store listing links to.

## Invite-only home page

The site is lightly keyed so casual visitors don't find the downloads. `https://<site>/k/<key>` sets a
cookie (a year) and shows the full home page (`public/_home/`); without it, `/` is a small public page
with support and privacy links (the App Store listing's marketing and support URLs point at `/`). The
contact page shows its install buttons only alongside a valid code, so invite links work without the key.
Help, privacy and the review page stay public. Everything is `noindex` (`X-Robots-Tag`, `robots.txt`).

The key is the deployment's `SITE_KEY` environment variable (A-Z a-z 0-9 _ -, 16+ characters), never
this repo. `nginx.conf.template` is rendered at container start; the container refuses to start without
a usable key (`require-site-key.sh`), because an empty key would let a cookie-less request match. This
is a convenience gate, not access control: `links.js` and this repo are public.

Local preview: `python -m http.server 8765 --directory public` (no key logic; the full home page is
`/_home/`). The real routes need the image: `docker run -e SITE_KEY=… -p 8080:80 <image>`.
