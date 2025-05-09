# Cookies

A way to remember data for users under a stateless HTTP environment.

client -> server

server checks the cookie and sends the data back to the user (if correct)

the cookie expires after the **maxAge** timeout

we can make as many requests as we want to the server as long as we have the cookie and it is still within its valid time.

## signed property
when **signed** is set to true, we will need to have a signature to use the cookie. 

we also need to use **signedCookies** instead.