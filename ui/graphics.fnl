(local g {})
(local xp_lvl (. (. (require :levels.fnl) :data) :xp))
(local camera (require :services/camera.fnl))

(fn g.test_buildings [buildings]
  (each [_ b (pairs buildings)]
    (love.graphics.setColor 0.49 0.4 0.81)
    (love.graphics.rectangle :line b.x b.y b.w b.h))
  (love.graphics.setColor 1 1 1))

(fn g.test_foods [foods]
  (each [_ f (pairs foods)]
    (love.graphics.setColor 0.99 0.1 0.31 f.fade_in)
    (love.graphics.rectangle :fill f.x f.y f.w f.h))
  (love.graphics.setColor 1 1 1))

(fn g.player [p] 

(love.graphics.rectangle :fill p.x p.y p.w p.h))

(fn g.hud [p]
  (love.graphics.setColor 0 0 0)
  (local m "PWR XP ::  ")
  (local per " %")
  (local xp_p (tostring (* (/ p.xp (. xp_lvl _Gstate.level)) 100)))
  (love.graphics.print (.. (.. m xp_p) per) 11.5 10)
  (love.graphics.print (.. (.. m xp_p) per) 10 11.5)
  (love.graphics.print (.. (.. m xp_p) per) 10 8.5)
  (love.graphics.print (.. (.. m xp_p) per) 8.5 10)
  (love.graphics.setColor 0.44 1 0.78)
  (love.graphics.print (.. (.. m xp_p) per) 10 10)
  (love.graphics.setColor 1 1 1))

(fn g.track [t]
  (love.graphics.setColor 0.39 0.2 0.51)
  (let [x _center.x
        y _center.y
        rx (/ t.r t.skew)
        ry t.r]
    (love.graphics.ellipse :line x y rx ry 100))
  (love.graphics.setColor 1 1 1))

g
