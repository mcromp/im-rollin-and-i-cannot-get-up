(local scene {})
(local howto (require :scenes/howto.fnl))
(local timer_handler {})

(fn scene.load []
  (_G.sfx.title:setLooping true)
  (love.audio.play _G.sfx.title))

(var v 0)
(fn scene.draw []
  (love.graphics.draw _G.img.title 200 (+ v 100) 0 2 2)
  (love.graphics.print "featuring the music of Lisp LispKit" 250 (- _W.h 150))
  (love.graphics.print "press enter" 450 (- _W.h 75)))

(local speed 10)
(var switch true)
(fn scene.update [dt]
  (if switch (set v (+ v (* dt speed))) (set v (- v (* dt speed))))
  (when (> v 25) (set switch false))
  (when (< v -15) (set switch true)))

(fn scene.keypressed [k]
  (when (= k :return)
    (set _G.scene howto)
    (love.audio.stop _G.sfx.title)
    (love.audio.play _G.sfx.eat)
    (_G.scene.load)))

scene
