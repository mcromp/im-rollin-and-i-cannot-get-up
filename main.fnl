(require :globals.fnl)
(local sti (require :lib.sti))
(local ENUMS (require :enums.fnl))
(local player_movement_service (require :player_movement.fnl))
(local camera (require :camera.fnl))
(local graphics (require :graphics.fnl))
(local utils (require :utils.fnl))
(local track {:r 2000 :skew 2})
(var player {:name :player
             :input_pause? false
             :h 64
             :w 64
             :vx 0
             :x _center.x
             :y _center.y
             :state ENUMS.p_state.moving
             :hit_dir_x 0
             :speed 3
             })

(set _G.map (sti :map/map.lua))

(var point {:x _center.x :y _center.y})
(var test_block {:x 1568 :y 2976 :w 800 :h 400 :state :ok})

(fn love.load []
  ;; start a thread listening on stdin
  (: (love.thread.newThread "require('love.event')
while 1 do love.event.push('stdin', io.read('*line')) end") :start))

(fn love.handlers.stdin [line]
  ;; evaluate lines read from stdin as fennel code
  (let [(ok val) (pcall fennel.eval line)]
    (print (if ok (fennel.view val) val))))

(fn love.draw []
  (when _G.map (camera.draw player))
  (when test_block
    (let [a test_block] (love.graphics.rectangle :fill a.x a.y a.w a.h)))
  (if (and test_block (_G.cols? player test_block))
      (love.graphics.setColor 0 1 1)
      (love.graphics.setColor 1 1 1))
  (graphics.player player)
  (love.graphics.setColor 1 1 1)
  (graphics.track track))

(fn love.update [dt]
  (when _G.map (_G.map:update dt))
  ;; enemy
  (when (and test_block (= test_block.state :to_dead))
    ((fn []
       (set test_block.state :dead)
       (timer.after 0.8 (fn []
                          (set test_block nil))))))
  ;; player movement 
  (let [f (. player_movement_service player.state)] (if f (f player track dt)))
  ;; collisions 
  (if (and test_block (= test_block.state :ok) (_G.cols? player test_block))
      (let [center {:x (+ test_block.x (/ test_block.w 2))
                    :y (+ test_block.y (/ test_block.h 2))}]
        (set player.hit_dir_x (utils.get_x_dir player center))
        (set test_block.state :to_dead)
        (set player.state ENUMS.p_state.crashing)))
  (timer.update dt))

(fn love.keypressed [key]
  (when (= key :escape) (love.event.quit))
  ;; debugging remove for production
  (when (= key :i) (set camera.scale (+ camera.scale 1)))
  (when (= key :p) (set camera.scale 1))
  (when (= key :o) (set camera.scale (- camera.scale 1))))
