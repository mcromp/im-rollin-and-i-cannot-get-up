(local g {})
(local anim8 (require :lib/anim8))
(local xp_lvl (. (. (require :levels.fnl) :data) :xp))
(local kill_lvl (. (. (require :levels.fnl) :data) :kills))
(local player_size (. (. (require :levels.fnl) :data) :player_size))
(local player_scale (. (. (require :levels.fnl) :data) :player_img))
(local camera (require :services/camera.fnl))
(var food_anim {})
(var player_anim {})

(fn g.load []
  (love.graphics.setLineWidth 20)
  (local f _G.img.food)
  (local f_g (anim8.newGrid 32 32 (f:getWidth) (f:getHeight)))
  (set food_anim (anim8.newAnimation (f_g :1-2 1) 0.4))
  (local p _G.img.player)
  (local p_g (anim8.newGrid 64 64 (p:getWidth) (p:getHeight)))
  (set player_anim (anim8.newAnimation (p_g :1-2 1) 0.5)))

(fn g.update [dt]
  (when food_anim (food_anim:update dt)
    (when player_anim (player_anim:update dt))))

(fn g.test_buildings [buildings]
  (each [_ b (pairs buildings)]
    (when (not= b.state :dead)
      (love.graphics.draw (. _G.img b.name) b.x b.y)
      (love.graphics.setColor 1 1 1))))

(fn g.test_foods [foods]
  (love.graphics.setColor 1 1 1)
  (each [_ f (pairs foods)]
    (when (= f.state :moving)
      (food_anim:draw _G.img.food f.x f.y))))

(fn g.player [p]
  (local size (. player_size _Gstate.level))
  (local scale (. player_scale _Gstate.level))
  (local px (- p.x (/ size 2)))
  (local py (- p.y (/ size 2)))
  (love.graphics.setColor 1 1 1)
  (player_anim:draw _G.img.player px py 0 scale scale) ;  
  )

(fn make_shadow_text [x y m]
  (love.graphics.print m (+ x 1.5) y)
  (love.graphics.print m x (+ y 1.5))
  (love.graphics.print m x (- y 1.5))
  (love.graphics.print m (- x 1.5) y))

(var pwr_switch false)
(var show_pwr false)
(var lvl_up_switch false)
(var show_lvl_up false)
(fn g.hud [p]
  (love.graphics.setColor 0 0 0)
  (local xp "PWR XP ")
  (local per " % :: EAT THE STRAWBERRIES")
  (local xp_p (tostring (math.floor (* (/ p.xp (. xp_lvl _Gstate.level)) 100))))
  (local full_pwr? (= xp_p :100))
  (local lk (tostring (. kill_lvl _Gstate.level)))
  (local food_count (.. (.. xp xp_p) per))
  ;; level up splash
  (when (and lvl_up_switch (not p.level_up?))
    (set lvl_up_switch false)
    (set show_lvl_up false))
  (when (and (not lvl_up_switch) p.level_up?)
    (set lvl_up_switch true)
    (set show_lvl_up true)
    (timer.after 1.5 (fn [] (set show_lvl_up false))))
  (when show_lvl_up
    (love.graphics.setColor 1 1 1)
    (love.graphics.draw _G.img.lvl_up 100 200 0 2.5 2.5))
  ;; power up info 
  (local powered_up_m "FULL PWR :: DESTROY THE BUILDINGS")
  (when (and pwr_switch (not full_pwr?))
    (set pwr_switch false)
    (set show_pwr false))
  (when show_pwr
    (love.graphics.setColor 1 1 1)
    (love.graphics.draw _G.img.full_pwr 100 200 0 2.5 2.5))
  (when (and (not pwr_switch) full_pwr?)
    (set pwr_switch true)
    (set show_pwr true)
    (timer.after 1 (fn [] (set show_pwr false))))
  (let [m (if (= xp_p :100) powered_up_m food_count)]
    (love.graphics.setColor 0 0 0)
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
  (love.graphics.setColor 0.25 0.25 0.25)
  (let [x _center.x
        y _center.y
        rx (/ t.r t.skew)
        ry t.r]
    (love.graphics.ellipse :line x y rx ry 100))
  (love.graphics.setColor 1 1 1))

g
