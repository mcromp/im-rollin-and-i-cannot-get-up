(require :globals.fnl)
(local sti (require :lib.sti))
(local ENUMS (require :enums.fnl))
(local player_movement_service (require :p_move.fnl))

(local track {:r 2000 :skew 2})
(var player {:name :player
             :h 64
             :w 64
             :vx 0
             :vy 1
             :x _center.x
             :y _center.y
             :move_force 600
             :state ENUMS.p_state.moving
             :max_move_amount 300})

(var point {:x _center.x :y _center.y})
(var scale 2.5)
(var map (sti :assets/mymap.lua))
(var test_block {:x 600 :y 700 :w 800 :h 200})

(fn draw_player []
  (local p_cx (+ player.x (/ player.w 2)))
  (local p_cy (+ player.y (/ player.h 2)))
  (love.graphics.points player.x player.y))

(fn draw_track []
  (love.graphics.setColor 0.39 0.2 0.51)
  (let [x _center.x
        y _center.y
        rx (/ track.r track.skew)
        ry track.r]
    (love.graphics.ellipse :line x y rx ry 100))
  (love.graphics.setColor 1 1 1))

(fn draw_point []
  (love.graphics.circle :fill player.x player.y 10 10)
  (love.graphics.points point.x point.y))

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
  (love.graphics.setColor 1 1 1)
  (draw_track)
  (draw_player)
  (draw_point))

(fn love.update [dt]
  (map:update dt)
  (let [f (. player_movement_service player.state)] (if f (f player track dt)))
  (handle_camera player))

(fn love.keypressed [key]
  (when (= key :escape) (love.event.quit)))
