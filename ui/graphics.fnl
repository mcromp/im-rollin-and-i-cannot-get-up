(local g {})

(set g.test_buildings (fn [buildings]
                        (each [_ b (pairs buildings)]
                          (love.graphics.setColor 0.49 0.4 0.81)
                          (love.graphics.rectangle :line b.x b.y b.w b.h))
                        (love.graphics.setColor 1 1 1)))

(set g.test_foods (fn [foods]
                    (each [_ f (pairs foods)]
                      (love.graphics.setColor 0.99 0.1 0.31)
                      (love.graphics.rectangle :line f.x f.y f.w f.h))
                    (love.graphics.setColor 1 1 1)))

(set g.player (fn [p] (love.graphics.circle :fill p.x p.y 8 12)))

(set g.track (fn [t]
               (love.graphics.setColor 0.39 0.2 0.51)
               (let [x _center.x
                     y _center.y
                     rx (/ t.r t.skew)
                     ry t.r]
                 (love.graphics.ellipse :line x y rx ry 100))
               (love.graphics.setColor 1 1 1)))

g
