#### 0.4: New note diagram

```sequence
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server->>browser: a server response with a hppt status code 302 call this a redirect to this location /exampleapp/notes and makes the browser redirect

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    
    server-->>browser: HTML document
    

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  
    server-->>browser: the css file
  

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
   
    server-->>browser: the JavaScript file

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    Note right of browser: The browser executes the callback function that renders the notes


```

#### 0.5: Single page app diagram

```sequence
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
server->>browser: HTML code

browser->>sever: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server->>browser: main.css
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server->>browser: spa.js
 Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
 browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
 server->>browser: [{content: "this note is from spa", date: "2023-08-12T06:09:36.326Z"}, ...]
     Note right of browser: The browser executes the callback function that renders the notes

```

#### 0.6: New note in Single page app diagram

```sequence

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server->>browser: {"message":"note created"}
Note right of browser: browser this time do not redirect rather it rerender the new note which was added to the server and timestamps

```

