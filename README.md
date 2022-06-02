# Snake

A basic Snake Clone made in Typescript and HTML5. 
Use **WASD** or directional arrows to move the snake. 

## Docker based installation
- Build: `docker build -t snake-game .`
- Start (attached): ``docker run -it --rm -d -p 8080:80 --name snake-game-nginx -v `pwd`:/usr/share/nginx/html snake-game``

- Compose Build: `docker-compose up --detach`
- Compose Start: `docker-compose start`

##
<p align="center">
<img src="https://user-images.githubusercontent.com/17745398/171750839-95aa0ef6-4d27-47aa-9b53-ff9ba1ad138f.gif" />
</p>
