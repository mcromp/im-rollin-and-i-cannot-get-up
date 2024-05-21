(local ENUMS (require :enums.fnl))
(local level_camera (. (. (require :levels.fnl) :data) :camera))

(var shake {:x 0 :y 0})
(local service {})
(set service.scale 0.02)

(var scale_temp 1)

(set service.shake
     (fn []
       (local a1 (+ (/ (love.math.random 4) 100) 0.3))
       (local a2 (+ (/ (love.math.random 5) 100) 0.5))
       (timer.tween 0.1 shake {:x a1 :y (- a2)} :out-in-elastic)
       (timer.after 0.1
                    (fn []
                      (timer.tween 0.05 shake {:x (- a2) :y a1} :linear)
                      (timer.after 0.1 (fn [] (set shake {:x 0 :y 0})))))))

(set service.draw
     (fn [target]
       (local scale service.scale)
       (let [dx (- target.x (/ (/ _W.w 2) (+ scale shake.x)))
             dy (- target.y (/ (/ _W.h 2) (- scale shake.y)))]
         (love.graphics.scale scale)
         (love.graphics.translate (- dx) (- dy))
         (when (not (= service.scale scale_temp))
           (set scale_temp service.scale)
           (let [w _W.w
                 h _W.h]
             (_G.map:resize (+ w w) (+ h h))))
         (_G.map:draw (- dx) (- dy) scale scale))))

(var player_state ENUMS.p_state.moving)

(set service.update (fn []
                      (local scale (. level_camera _Gstate.level))
                      (when (not (= service.scale scale))
                        (set service.scale scale))))

service
