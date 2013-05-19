<%= site.title %>
=======================

<%= site.description %>

This project was created by <%= author.name %>. My website is
located at the url [<%= author.url %>].

## <%= header %>

Hey <%= user.name %>! This is a test template for the `markedejs` module. We
can use markdown and EJS together for some pretty awesome results. It works
pretty well, the only thing not working as far as I can tell is includes (which
will be awesome if <%= user.name %> figures out how to fix it).

### The Classic EJS Supplies List
<ul>
<% for (var i = 0; i < supplies.length; i++) { %>
  <li><%= supplies[i] %></li>
<% } %>
</ul>

### Your User Data

I like using markdown lists a whole lot better when I can.

 - **Username:** <%= user.username %>
 - **Name:** <%= user.name %>
 - **Stars:** <%= user.stars %>

We can do some conditionals as well. You will only see the footer below this
paragraph if you pass in `true` for the `showFooter` flag.

<% if (showFooter !== undefined && showFooter === true) { %>
  <%= footer %>
<% } %>