# Simple Chat with COMET
_Much more in terms of working with Servers via Node.js will be covered during the studies 
of Node.js itself, this article is the conceptual overview with more emphasis on the frontend_ :)

When we do a chat, each time a user sends a message we are going to send a request. That is pretty
straightforward. But how do all the other users on our server get notified about that? Their pages could
be making a request to our server and asking whether a new message appeared. Their pages could do that every
10 seconds for example. But that is a very big pressure for our server, instead we can do something else.

Each time when a new user goes to the server, their page is going to send a `subscribe` request. But the server
isn't going to answer it at once, instead it is going to leave it pending. And the same will happen for all users
coming to our page (thus for 4 users we will have, on the server, 4 pending `subscribe` requests). Then whenever
any of the users sends a message, a `publish` request is going to be sent to the server. The server in turn, when
processing a `publish` request from any of the users, will in fact answer it but it doesn't matter what the answer
to this `publish` request is, the server will only remember the message that came to it. And here is why: when
the `publish` request arrives the server will also answer _all_ the pending `subscribe` requests that it remembers
and as a body for each `subscribe` _response_ the server will provide the contents of the message, which it got 
when that `publish` request came from one of the users. As a result all users get a notification of the message
whenever any of them writes one to the server. On the frontend we would want to send the 1st `subscribe` request
and after that keep sending a new `subscribe` request to the server as soon as the last one was answered with
a message, in order that there will always be, on the server, one pending `subscribe` request from our page.
And each time the `subscribe` request is answered we would want to display a message on the page (and
most importantly as was already mentioned don't forget to send a new `subscribe` request again like recursion).

As you can see this approach utilizes _long_ requests to the server. When those requests are answered we do 
something with the answer data and send another _long_ request to be pending on the server. Because the 
requests keep pending we manage to maintain a constant connection. Such an approach is called COMET :)
It is primarily used when messages arrive rarely. If the flow of messages is severe we should use something else. Check out the chat [here](./simple-chat-code)