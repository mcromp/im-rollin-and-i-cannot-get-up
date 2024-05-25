(local scene {})
(local timer_handler {})

(var font {})
(fn scene.load []
  (love.audio.stop _G.sfx.music)
  (love.audio.play _G.sfx.fanfare))

(fn scene.draw []
  (love.graphics.print "you win! You've crashed enough buildings to stop rolling!"
                       100 100)
  (love.graphics.print "press esc to exit" 100 400))

(fn scene.update [])

(fn scene.keypressed [k]
  (when (= k :escape) (love.event.quit)))

scene
