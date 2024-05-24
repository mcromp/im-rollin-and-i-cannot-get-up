(fn []
  (set _G.sfx
       {:music (love.audio.newSource :assets/sfx/music.ogg :stream)
        :hit (love.audio.newSource :assets/sfx/hit.ogg :static)
        :bounce (love.audio.newSource :assets/sfx/bounce.ogg :static)
        :fanfare (love.audio.newSource :assets/sfx/fanfare.mp3 :static)
        :grow (love.audio.newSource :assets/sfx/grow.mp3 :static)
        :eat (love.audio.newSource :assets/sfx/eat.ogg :static)})
  (set _G.img {:food (love.graphics.newImage :assets/img/food.png)}))
