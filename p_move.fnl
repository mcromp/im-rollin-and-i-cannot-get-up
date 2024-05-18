(local ENUMS (require :enums.fnl))
(local service {})

(var ticker 0)
(var speed 6)

(fn apply_gravity [vx]
  (if (< (math.abs vx) 10) 1
      (< vx 10) (+ vx 5)
      (> vx 10) (- vx 5)))

(tset service ENUMS.p_state.moving
      (fn [player track dt]
        (set ticker (+ ticker (/ dt  speed)))
        (local force (+ track.r player.vx))
        (set player.x (+ _center.x (* (/ (math.cos ticker) track.skew) force)))
        (set player.y (+ _center.y (* (math.sin ticker) force)))
        (if (and (love.keyboard.isDown :up)
                 (< player.vx player.max_move_amount))
            (set player.vx (+ player.vx (* dt player.move_force)))
            (and (love.keyboard.isDown :down)
                 (> player.vx (- player.max_move_amount)))
            (set player.vx (- player.vx (* dt player.move_force)))
            (set player.vx (apply_gravity player.vx)))))

service
