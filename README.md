# node-website

A re-work of my website, written with NodeJS. Uses a 'packaged app model', where
each page, its routing logic and style sheets are packaged in a single folder.

## Packaged App Model

The idea of keeping everything relating to a page or an app together in one
area. This keeps main server logic separate from app-level logic, and can
allow for the use of `git-submodule`s for apps.

The website has the follwoing structures:

#### Path structure

Apps are considered to be pages following the domain name, `aoneill.me`

```
https://aoneill.me/ -> Root website
https://aoneill.me/app1 -> One app
https://aoneill.me/app2 -> Another app
```

### File Structure

Apps are isolated into separate folders, and each controls it's logic.
Omitted from the diagram are containers for stylesheets and static content
for the overarching website and each app.

```
/root/
  server.js
  routes.js
  ...
  apps/
    app1/
      routes.js
      ...
    app2/
      routes.js
      ...
```
