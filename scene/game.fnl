(local scene {})
(local player_movement_service (require :player_movement.fnl))
(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local graphics (require :ui/graphics.fnl))
(local sti (require :lib.sti))
(set scene.map :map/map.lua)

(set scene.load (fn []
                  (set _G.map (sti :map/map.lua))))

(set scene.update (fn [dt]
                    ;; enemy ; (when (and test_block (= test_block.state :to_dead)) ;   ((fn [] ;      (set test_block.state :dead) ;      (timer.after 0.8 (fn [] ;                         (set test_block nil))))))
                    ;; player movement 
                    (let [f (. player_movement_service player.state)]
                      (if f (f player track dt)))
                    ;; collisions  ; (if (and test_block (= test_block.state :ok) (_G.cols? player test_block))
                    ;     (let [center {:x (+ test_block.x (/ test_block.w 2)) ;                   :y (+ test_block.y (/ test_block.h 2))}]
                    ;       (set player.hit_dir_x (utils.get_x_dir player center))
                    ;       (set test_block.state :to_dead) ;       (set player.state ENUMS.p_state.crashing)))
                    ))

(set scene.draw (fn []
                  (graphics.player player)
                  (love.graphics.setColor 1 1 1)
                  (graphics.track track)))

scene
