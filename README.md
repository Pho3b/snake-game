## Project

A Snake game clone developed using Typescript and HTML5.    
As in the original you can use **WASD** keys or directional arrows to move the snake and collect food pieces.

<p align="center">
    <img src="https://user-images.githubusercontent.com/17745398/171750839-95aa0ef6-4d27-47aa-9b53-ff9ba1ad138f.gif" alt="snake-game" width="220" height="300"/>
</p>

## Docker based installation 
- <b>Using docker:</b>
  - Build: `docker build -t snake-game .`
  - Start (attached): ``docker run -it --rm -d -p 8080:80 --name snake-game-nginx -v `pwd`:/usr/share/nginx/html snake-game``       
<br>
- <b>Using docker-compose:</b>
  - Compose Build: `docker-compose up --detach`
  - Compose Start: `docker-compose start`

