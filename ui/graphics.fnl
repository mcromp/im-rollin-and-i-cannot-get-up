(local g {})
(local xp_lvl (. (. (require :levels.fnl) :data) :xp))
(local kill_lvl (. (. (require :levels.fnl) :data) :kills))
(local player_size (. (. (require :levels.fnl) :data) :player_size))
(local camera (require :services/camera.fnl))

(fn g.test_buildings [buildings]
  (each [_ b (pairs buildings)]
    (if (= b.state :dead)
        (do
          (love.graphics.setColor 0 0 0)
          (love.graphics.rectangle :fill b.x b.y b.w b.h))
        (do
          (love.graphics.setColor 0.49 0.4 0.81)
          (love.graphics.rectangle :fill b.x b.y b.w b.h))))
  (love.graphics.setColor 1 1 1))

(fn g.test_foods [foods]
  (each [_ f (pairs foods)]
    (when (= f.state :moving)
      (love.graphics.setColor 0.99 0.1 0.31 f.fade_in)
      (love.graphics.rectangle :fill f.x f.y f.w f.h)))
  (love.graphics.setColor 1 1 1))

(fn g.player [p]
  (local size (. player_size _Gstate.level))
  (local px (- p.x (/ size 2)))
  (local py (- p.y (/ size 2)))
  (love.graphics.setColor 0 0 0)
  (love.graphics.rectangle :fill px py size size)
  )

(fn make_shadow_text [x y m]
  (love.graphics.print m (+ x 1.5) y)
  (love.graphics.print m x (+ y 1.5))
  (love.graphics.print m x (- y 1.5))
  (love.graphics.print m (- x 1.5) y))

(var lvl_up_switch true)
(var lvl_up_fade {:v 0})
(fn g.hud [p]
  (love.graphics.setColor 0 0 0)
  (local xp "PWR XP ::  ")
  (local per " %")
  (local xp_p (tostring (math.floor (* (/ p.xp (. xp_lvl _Gstate.level)) 100))))
  (local lk (tostring (. kill_lvl _Gstate.level)))
  (local food_count (.. (.. xp xp_p) per))
  (local powered_up_m "FULL PWR :: DESTROY BUILDINGS")
  (let [m (if (= xp_p :100) powered_up_m food_count)]
    (make_shadow_text 10 10 m)
    (love.graphics.setColor 1 1 1)
    (love.graphics.print m 10 10))
  (local buildings_to_kill (.. (.. (.. p.kills) " / ") lk))
  (love.graphics.setColor 1 1 1)
  (let [x (- _W.w 140)
        y 10]
    (love.graphics.setColor 0 0 0)
    (make_shadow_text x y buildings_to_kill)
    (love.graphics.setColor 1 1 1)
    (love.graphics.print buildings_to_kill x y))
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
