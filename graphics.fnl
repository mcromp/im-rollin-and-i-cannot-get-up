(local g {})

(set g.player (fn [p] (love.graphics.circle :fill p.x p.y 8 12)))

(set g.track (fn [t] (love.graphics.setColor 0.39 0.2 0.51)
     (let [x _center.x
           y _center.y
           rx (/ t.r t.skew)
           ry t.r]
       (love.graphics.ellipse :line x y rx ry 100))
     (love.graphics.setColor 1 1 1)))

g
