(local ENUMS (require :enums.fnl))
(local camera (require :camera.fnl))
(local level_data (. (. (require :levels.fnl) :data) :movement))

(local service {})

(var ticker 0)
(fn apply_gravity [vx ?amt]
  (local _d (. level_data _Gstate.level))
  (local gravity (* _d.gravity (or ?amt 1)))
  (if (< (math.abs vx) 10) 1
      (< vx 1) (+ vx gravity)
      (> vx 1) (- vx gravity)))

(fn slower_speed [s] (/ s 5))
(fn fasten_speed [s] (* s 2))

(fn move_on_track [entity track dt]
  (local force (+ track.r entity.vx))
  (set entity.x (+ _center.x (* (/ (math.cos ticker) track.skew) force)))
  (set entity.y (+ _center.y (* (math.sin ticker) force))))

;; ###### MOVING 
(tset service ENUMS.p_state.moving
      (fn [entity track dt]
        (local _d (. level_data _Gstate.level))
        (when (not (= entity.speed _d.speed)) (set entity.speed _d.speed))
        (local max_move_amount _d.max_move_amount)
        (local move_force _d.move_force)
        (set ticker (+ ticker (/ dt entity.speed)))
        (move_on_track entity track dt)
        (if (and (love.keyboard.isDown :up) (< entity.vx max_move_amount)
                 (not entity.input_pause?))
            (set entity.vx (+ entity.vx (* dt move_force)))
            (and (love.keyboard.isDown :down) (> entity.vx (- max_move_amount))
                 (not entity.input_pause?))
            (set entity.vx (- entity.vx (* dt move_force)))
            (set entity.vx (apply_gravity entity.vx)))))

;; ###### BOUNCING 
(var can_bounce? true)
(fn bounce [entity]
  (local _d (. level_data _Gstate.level))
  (local normal_speed (. _d :speed))
  (set can_bounce? false)
  (set entity.input_pause? true)
  (let [slow_speed (/ normal_speed 3)]
    (set entity.speed slow_speed))
  (timer.after 1 (fn [] (set entity.input_pause? false)
                   (set entity.speed normal_speed)))
  (timer.after 0.4
               (fn []
                 (set can_bounce? true)
                 (set entity.state ENUMS.p_state.moving))))

(tset service ENUMS.p_state.bouncing
      (fn [entity track dt]
        (local _d (. level_data _Gstate.level))
        (let [speed (. _d :speed)]
          (set ticker (- ticker (/ dt entity.speed))))
        (when can_bounce? (bounce entity))
        (move_on_track entity track dt)
        (let [hit_dir (if (> entity.hit_dir_x 0) (* entity.max_move_amount 2)
                          (< entity.hit_dir_x 0) (- (* entity.max_move_amount 2)))]
          (set entity.vx (+ entity.vx (* dt hit_dir))))))

;; ###### CRASHING 
(var can_crash? true)
(fn crash [entity]
  (local _d (. level_data _Gstate.level))
  (local normal_speed _d.speed)
  (set can_crash? false)
  (camera.shake)
  (set entity.input_pause? true)
  (set entity.speed (fasten_speed normal_speed))
  (timer.after 0.4
               (fn [] (set entity.input_pause? false)
                 (set entity.speed (slower_speed normal_speed))))
  (timer.after 0.7
               (fn []
                 (set entity.speed normal_speed)
                 (set can_crash? true)
                 (set entity.state ENUMS.p_state.moving))))

(tset service ENUMS.p_state.crashing
      (fn [entity track dt]
        (set ticker (+ ticker (/ dt entity.speed)))
        (move_on_track entity track dt)
        (when can_crash? (crash entity))))

service
