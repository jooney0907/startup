# CS 260 Notes

[My startup - ](website))

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
<link> elements belong in the document <head> and associate external resources—like stylesheets—using attributes such as rel and href.

A <div> tag is a generic block-level container used to group other elements for styling or layout purposes.

#title matches the single element whose id is title, whereas .grid matches every element whose class list includes grid.

Padding is the space inside an element between its content and border; margin is the space outside the border that separates the element from neighbors.

When a container uses display: flex, its child images become flex items laid out in a row by default, wrapping or resizing according to the flex configuration.

A rule like padding: 10px 20px; adds 10 px of space above and below the content and 20 px on the left and right inside the element’s border.

An arrow-function declaration such as const f = () => expression; assigns an anonymous function to f and preserves lexical this binding.

[1,2,3].map(n => n * 2) returns a new array [2, 4, 6] without altering the original array.

document.getElementById('btn').addEventListener('click', () => console.log('clicked')); logs “clicked” each time the element is clicked.

document.querySelector('#something') retrieves the first element in the DOM whose id is something.

True DOM statements include: it models HTML as a node tree, scripts can traverse/modify nodes, and DOM property changes update what the browser renders.

<span> elements are inline by default.

div { background-color: red; } colors every <div> red.

Wrap an <img> inside an <a> to make the image a hyperlink, e.g., <a href="https://example.com"><img src="pic.jpg" alt="description"></a>.

The CSS box model layers from inside out are: content → padding → border → margin.

Assign the word “trouble” a class and target it: span.trouble { color: green; }, leaving other text like “double” unaffected.

for (let i = 0; i < 3; i++) { console.log(i); } prints 0, then 1, then 2.

document.getElementById('byu').style.color = 'green'; turns the text of the element with id byu green.

Opening tags: paragraph <p>, ordered list <ol>, unordered list <ul>, second-level heading <h2>, first-level heading <h1>, third-level heading <h3>.

Declare HTML5 with <!DOCTYPE html>.

Control-flow syntax examples: if (condition) { … } else { … }, for (init; condition; update) { … }, while (condition) { … }, and switch (value) { case …: break; default: … }.

Create an object with const obj = { key: 'value', method() { return 1; } };.

JavaScript objects are extensible: obj.newProp = 42; adds a new property at runtime.

Include JavaScript with <script src="file.js"></script> or inline <script>…</script>.

Change just the “animal” text via document.getElementById('animal').textContent = 'crow';, leaving other nodes (like “fish”) untouched.

JSON is a language-independent, text-based format using key/value pairs and arrays with double-quoted strings.

Command purposes: chmod (permissions), pwd (current directory), cd (change directory), ls (list), vim/nano (editors), mkdir (make directory), mv (move/rename), rm (remove), man (manual), ssh (secure shell), ps (processes), wget (download), sudo (run with elevated privileges).

ssh user@host opens a remote shell session.

ls -la lists all entries—including hidden files—with detailed metadata such as permissions, ownership, size, and timestamps.

For banana.fruit.bozo.click, .click is the top-level domain, bozo.click is the root domain, and banana.fruit is the chained subdomain.

Using HTTPS effectively requires a valid TLS certificate to provide encrypted, warning-free connections.

A DNS A record maps a hostname directly to an IPv4 address and cannot target another A record (aliases use CNAMEs).

Port 443 is reserved for HTTPS, port 80 for HTTP, and port 22 for SSH.

Promise.resolve('done').then(v => console.log(v)); prints done.

Networking / HTTP

Default ports

HTTP: 80

HTTPS: 443

SSH: 22

HTTP status code ranges

300s: Redirection (resource moved / use different URL)

400s: Client error (your request is bad: auth, not found, validation, etc.)

500s: Server error (server failed while handling a valid request)

Content-Type header

Tells the receiver what format the body is in (and how to parse it), e.g. application/json, text/html, multipart/form-data, etc.

Cookies

Secure cookie

Cookie is only sent over HTTPS, not plain HTTP.

HttpOnly cookie

Cookie is not accessible to JavaScript (document.cookie can’t read it). Helps against XSS stealing cookies.

SameSite cookie

Controls whether the browser sends the cookie on cross-site requests:

Strict: only same-site requests

Lax: sent on top-level navigations (common safe default)

None: sent cross-site only if Secure is also set (modern browsers)

Express / Node / Mongo (depends on the code shown)

Express middleware console.log output for GET /api/document

Cannot be determined without the exact middleware code/order.

Rule: Express runs middleware in the order registered. req.path would be /api/document, req.originalUrl might include querystring, mounted routers affect what req.url/req.baseUrl look like.

“Given Express service code… what does front-end fetch(...) return?”

Fetch returns a Promise that resolves to a Response object.

If the code does return fetch(...).then(r => r.json()), it returns a Promise of parsed JSON.

If it does await fetch(...) without .json(), you get the Response, not the data.

MongoDB query { name: "Mark" } matches which docs

Matches documents where name equals "Mark" (case-sensitive by default).

Also matches if name is an array containing "Mark" (Mongo equality matches array elements).

How should user passwords be stored?

Never plaintext, never reversible encryption.

Store a salted, slow hash using a password KDF like bcrypt, scrypt, or Argon2 (commonly Argon2id or bcrypt), with a per-user salt.

WebSockets

What will front end log? (depends on code)

Cannot be determined without the exact backend + frontend websocket code.

Rule: the frontend logs whatever is passed to its handlers (onopen, onmessage, onclose, onerror). If server sends "hi", onmessage typically logs event.data === "hi".

What is the websocket protocol intended to provide?

A persistent, full-duplex connection between client and server over one TCP connection, enabling real-time bidirectional messaging (vs request/response polling).

Acronyms

JSX: JavaScript XML (syntax used by React to describe UI)

JS: JavaScript

AWS: Amazon Web Services

NPM: Node Package Manager (and the package registry ecosystem)

NVM: Node Version Manager

React

What text content will a React component generate? (depends on component + props)

Cannot be determined without the component code + parameter values.

Rule: evaluate the component function with the given props, see what strings/elements it returns; rendered text is the concatenation of text nodes.

Given a set of React components that include each other, what will be generated?

Whatever the root component returns after expanding children; props flow down; final output is the rendered element tree.

What does React.useState do?

Adds state to a function component: returns [value, setValue]. Updating state triggers a re-render.

What are React Hooks used for?

To use React features (state, lifecycle/effects, context, refs, etc.) inside function components and reusable custom hooks.

Hooks you listed (what they do)

State Hook (useState): component state

Context Hook (useContext): read a context value (global-ish shared state)

Ref Hook (useRef): mutable container that persists across renders; often used to reference DOM nodes

Effect Hook (useEffect): run side effects after render (and cleanup)

Performance Hooks (commonly **useMemo / useCallback / useTransition / useDeferredValue):

memoize computed values (useMemo)

memoize function identities (useCallback)

keep UI responsive during expensive updates (useTransition, useDeferredValue)

React Router (general truths)

Without the exact snippet, typical true statements are:

Routes are matched by the URL, and the matching route’s element renders.

Nested routes render inside an <Outlet />.

<Link to="..."> navigates client-side (no full page reload).

useParams() reads path params (like :id).

useNavigate() performs programmatic navigation.

Tooling / Files

What does package.json do?

Defines a Node project: name/version, dependencies, scripts, and other metadata/config.

What does fetch do?

Makes HTTP requests and returns a Promise of a Response.

What does Node.js do?

Runs JavaScript on the server (V8 runtime) with system APIs (files, network, processes).

What does pm2 do?

A process manager for Node apps: keeps them alive, restarts on crash, clustering, logs, startup on boot.

What does Vite do?

A modern frontend toolchain: dev server + bundling (fast HMR in dev; builds optimized assets for production).

If you paste the specific Express middleware, fetch code, websocket code, and React/Router snippets from your practice sheet, I can give the exact outputs/choices for those items.
