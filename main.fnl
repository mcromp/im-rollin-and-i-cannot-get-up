(require :globals.fnl)
(local sti (require :lib.sti))
(local ENUMS (require :enums.fnl))
(local player_movement_service (require :player_movement.fnl))
(local graphics (require :graphics.fnl))
(local utils (require :utils.fnl))

(local track {:r 2000 :skew 2})
(var player {:name :player
             :input_pause? false
             :h 64
             :w 64
             :vx 0
             :vy 1
             :x _center.x
             :y _center.y
             :move_force 600
             :state ENUMS.p_state.moving
             :dir (vector 0 0)
             :hit_dir_x 0
             :max_move_amount 300})

(var point {:x _center.x :y _center.y})
(var scale 1)
(var map (sti :assets/mymap.lua))
(var test_block {:x 1600 :y 700 :w 800 :h 200})

(fn handle_camera [target]
  (let [dx (- target.x (/ (/ _W.w 2) scale))
        dy (- target.y (/ (/ _W.h 2) scale))]
    (love.graphics.scale scale)
    (love.graphics.translate (- dx) (- dy))
    (map:draw (- dx) (- dy) scale scale)))

(fn love.load []
  ;; start a thread listening on stdin
  (: (love.thread.newThread "require('love.event')
while 1 do love.event.push('stdin', io.read('*line')) end") :start))

(fn love.handlers.stdin [line]
  ;; evaluate lines read from stdin as fennel code
  (let [(ok val) (pcall fennel.eval line)]
    (print (if ok (fennel.view val) val))))

(fn love.draw []
  (handle_camera player)
  (let [a test_block] (love.graphics.rectangle :fill a.x a.y a.w a.h))
  (if (_G.cols? player test_block)
      (love.graphics.setColor 0 1 1)
      (love.graphics.setColor 1 1 1))
  (graphics.player player)
  (love.graphics.setColor 1 1 1)
  (graphics.track track))

(fn love.update [dt]
  (map:update dt)
  ;; movement 
  (let [f (. player_movement_service player.state)] (if f (f player track dt)))
  ;; collisions 
  (if (_G.cols? player test_block)
      (let [center_x (+ test_block.x (/ test_block.w 2))
            center_y (+ test_block.y (/ test_block.h 2))]
        (set player.hit_dir_x
             (utils.get_x_dir player (vector center_x center_y)))
        (set player.state ENUMS.p_state.bouncing)))
  ;: camera
  (handle_camera player)
  (love.window.setTitle player.state)
  (timer.update dt))

(fn love.keypressed [key]
  (when (= key :escape) (love.event.quit))
  (when (= key :a) (set player.state ENUMS.p_state.moving)))
