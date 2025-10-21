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
