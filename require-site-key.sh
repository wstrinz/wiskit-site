#!/bin/sh
# Runs before nginx starts (docker-entrypoint.d). Refuse to start without a usable key: with an empty
# SITE_KEY, the home page's cookie check would match a request with no cookie at all.
case "${SITE_KEY:-}" in
    *[!A-Za-z0-9_-]*)
        echo "require-site-key: SITE_KEY may only use A-Z a-z 0-9 _ -" >&2
        exit 1
        ;;
esac
if [ "${#SITE_KEY}" -lt 16 ]; then
    echo "require-site-key: set SITE_KEY (16 or more characters)" >&2
    exit 1
fi
