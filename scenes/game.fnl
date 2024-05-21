(local scene {})
(local player_movement_service (require :services/player_movement.fnl))
(local map_service (require :services/map.fnl))
(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local graphics (require :ui/graphics.fnl))
(local sti (require :lib.sti))
(set scene.map :map/map.lua)

;; cointains food spawn areas and building areas
(var data {})
(var buildings {})
(var foods {})

(set scene.load
     (fn []
       (set _G.map (sti :map/map.lua))
       (set data (map_service.parse _G.map))
       (set buildings (map_service.get_buildings_from_scene_data data))))

(set scene.update (fn [dt]
                    ;; player movement 
                    (let [f (. player_movement_service player.state)]
                      (if f (f player track dt))) ; (local collisions (get_player_cols player data))
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
