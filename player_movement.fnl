(local ENUMS (require :enums.fnl))
(local service {})

(var ticker 0)
(var speed 6)
(var can_move true)

(fn apply_gravity [vx]
  (if (< (math.abs vx) 10) 1
      (< vx 1) (+ vx 5)
      (> vx 1) (- vx 5)))

(fn apply_super_gravity [vx]
  (if (< vx 1) (+ vx 20)
      (> vx 1) (- vx 20)))

(fn move [player track dt]
  (local force (+ track.r player.vx)) ; (print force) 
  (if (not (= player.vx 1)) (print player.vx))
  (set player.x (+ _center.x (* (/ (math.cos ticker) track.skew) force)))
  (set player.y (+ _center.y (* (math.sin ticker) force))))

(tset service ENUMS.p_state.moving
      (fn [player track dt]
        (set ticker (+ ticker (/ dt speed)))
        (move player track dt)
        (if (and (love.keyboard.isDown :up)
                 (< player.vx player.max_move_amount) (not player.input_pause?))
            (set player.vx (+ player.vx (* dt player.move_force)))
            (and (love.keyboard.isDown :down)
                 (> player.vx (- player.max_move_amount))
                 (not player.input_pause?))
            (set player.vx (- player.vx (* dt player.move_force)))
            (set player.vx (apply_gravity player.vx)))))

(var switch true)

(fn bounce [player]
  (set switch false)
  (set player.input_pause? true)
  (set speed 2)
  (timer.after 1 (fn [] (set player.input_pause? false)
                   (set speed 6)))
  (timer.after 0.4
               (fn []
                 (set switch true)
                 (set player.state ENUMS.p_state.moving))))

(tset service ENUMS.p_state.bouncing
      (fn [player track dt]
        (set ticker (- ticker (/ dt speed)))
        (when switch (bounce player))
        (move player track dt)
        (let [hit_dir (if (> player.hit_dir_x 0) (* player.max_move_amount 2)
                          (< player.hit_dir_x 0) (- (* player.max_move_amount 2)))]
          (set player.vx (+ player.vx (* dt hit_dir))))))

service
