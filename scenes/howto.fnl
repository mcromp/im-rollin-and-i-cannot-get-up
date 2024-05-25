(local scene {})
(local game (require :scenes/game.fnl))
(local timer_handler {})

(var font {})
(fn scene.load []
  (set font (love.graphics.newFont 24))
  (_G.sfx.howto:setLooping true)
  (love.audio.play _G.sfx.howto))

(var v 0)
(fn scene.draw []
  (love.graphics.printf "The story:

  - You are stuck rolling in a circle, but you want to stop

  - So you must CRASH INTO THE BUILDINGS to stop

  - BUT you are TOO WEAK, so you must POWER UP

  - You must EAT ENOUGH THE STRAWBERRIES TO POWER UP and CRASH INTO BUILDINGS

  - Once you crash into enough buildings you will LEVEL UP

  - When you LEVEL UP you will LOSE POWER, so you'll need to EAT STRAWBERRIES to POWER UP again

  # CONTROLS #
  - UP/W   larger radius
  - DOWN/S smaller radius
  
  - PRESS ENTER TO PROCEED

  " font 0 0 _W.w))

(fn scene.update [])

(fn scene.keypressed [k]
  (when (= k :return)
    (set _G.scene game)
    (love.audio.stop _G.sfx.howto)
    (love.audio.play _G.sfx.eat)
    (_G.scene.load)))

scene
