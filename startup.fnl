(fn []
  ;; sfx
  (set _G.sfx
       {:music (love.audio.newSource :assets/sfx/music.ogg :stream)
        :title (love.audio.newSource :assets/sfx/title.mp3 :stream)
        :howto (love.audio.newSource :assets/sfx/howto.mp3 :stream)
        :hit (love.audio.newSource :assets/sfx/hit.ogg :static)
        :bounce (love.audio.newSource :assets/sfx/bounce.mp3 :static)
        :fanfare (love.audio.newSource :assets/sfx/fanfare.mp3 :static)
        :grow (love.audio.newSource :assets/sfx/grow.mp3 :static)
        :power_up (love.audio.newSource :assets/sfx/power_up.mp3 :static)
        :eat (love.audio.newSource :assets/sfx/eat.ogg :static)})
  (_G.sfx.power_up:setVolume 0.5)
  ;; img
  (set _G.img
       {:food (love.graphics.newImage :assets/img/food.png)
        :full_pwr (love.graphics.newImage :assets/img/full_pwr.png)
        :title (love.graphics.newImage :assets/img/title.png)
        :lvl_up (love.graphics.newImage :assets/img/lvl_up.png)
        :a (love.graphics.newImage :assets/img/buildings/a_3x3.png)
        :b (love.graphics.newImage :assets/img/buildings/b_3x3.png)
        :c (love.graphics.newImage :assets/img/buildings/c_4x3.png)
        :d (love.graphics.newImage :assets/img/buildings/d_5x3.png)
        :e (love.graphics.newImage :assets/img/buildings/e_3x5.png)
        :f (love.graphics.newImage :assets/img/buildings/f_6x3.png)})
  ;; font
  (let [font (love.graphics.newFont 32)]
    (love.graphics.setFont font)))
