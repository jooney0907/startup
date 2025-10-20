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

The <link> tag goes inside the <head> of an HTML page. It connects your page to outside files like stylesheets using attributes such as rel and href.

A <div> is a simple container used to group other elements, often for layout or styling.

#title selects the element with the id “title”.
.grid selects all elements with the class “grid”.

Padding is the space inside an element (between its content and its border).
Margin is the space outside the element (between it and others).

When you set display: flex on a container, its child elements line up in a row by default and can wrap or resize depending on your flex settings.

padding: 10px 20px; means: 10 px space on top and bottom, and 20 px on the left and right.

<span> elements are inline by default, while <div> elements are block-level.

div { background-color: red; } colors every <div> red.

To make an image a clickable link:

<a href="https://example.com">
  <img src="pic.jpg" alt="description">
</a>


The CSS box model goes like this: content → padding → border → margin.

To style only the word “trouble”:

<span class="trouble">trouble</span>

.trouble { color: green; }


Declare HTML5 at the top of your page with:
<!DOCTYPE html>

Common HTML tags:
<p> for paragraphs,
<ol> for ordered lists,
<ul> for unordered lists,
<h1>, <h2>, <h3> for headings (biggest to smaller).

JavaScript Basics

Arrow functions are short ways to write functions.
Example:

const f = () => expression;


It keeps the same this context as the code around it.

[1, 2, 3].map(n => n * 2) returns a new array [2, 4, 6] without changing the original.

document.getElementById('btn').addEventListener('click', () => console.log('clicked'));
→ Logs “clicked” each time you click the element with id btn.

document.querySelector('#something') finds the first element with id something.

The DOM (Document Object Model) represents your HTML as a tree of nodes.
You can use scripts to read or change these nodes, and any changes update what you see in the browser.

To change text color:

document.getElementById('byu').style.color = 'green';


To change just one piece of text:

document.getElementById('animal').textContent = 'crow';


Loops:

for (let i = 0; i < 3; i++) {
  console.log(i);
}


→ Prints 0, then 1, then 2.

Control flow examples:

if (...) { ... } else { ... }

for (...) { ... }

while (...) { ... }

switch (value) { case ...: break; default: ... }

Create an object:

const obj = {
  key: 'value',
  method() { return 1; }
};


JavaScript objects can grow:

obj.newProp = 42;


Add JavaScript to HTML using:

<script src="file.js"></script>


or inline:

<script> ... </script>


Promises:

Promise.resolve('done').then(v => console.log(v));


→ Prints “done”.

JSON

JSON (JavaScript Object Notation) is a text format that uses key/value pairs and arrays.
It always uses double quotes for strings and works across programming languages.
