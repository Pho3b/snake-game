# Snake

```sh
A basic Snake Clone made in Typescript and HTML5. 
Use WASD or directional arrows to move the snake. 
Hitting the border of the square will kill you. 
```

## Docker based installation
- Build: `docker build -t snake-game .`

- Start (attached): ``docker run -it --rm -d -p 8080:80 --name snake-game-nginx -v `pwd`:/usr/share/nginx/html snake-game``

