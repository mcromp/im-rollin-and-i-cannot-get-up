(local scene {})
(local player_movement_service (require :services/player_movement.fnl))
(local map_service (require :services/map.fnl))
(local food_service (require :services/food.fnl))
(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local graphics (require :ui/graphics.fnl))
(local sti (require :lib.sti))
(set scene.map :map/map.lua)
(local food_amounts (. (. (require :levels.fnl) :data) :food_amount))
(local xps (. (. (require :levels.fnl) :data) :xp))

;; data from map for levels
(var data {})
;; non-player entities on board
(var buildings {})
(var foods {})

(fn scene.load []
  (set _G.map (sti :map/map.lua))
  (set data (map_service.parse _G.map))
  (set buildings (map_service.get_buildings_from_scene_data data)))

(fn scene.update [dt]
  ;; player movement 
  (let [f (. player_movement_service player.state)]
    (if f (f player track dt))) ; (local collisions (get_player_cols player data))
  ;; food generation 
  (local current_level _Gstate.level)
  (let [desired_food_amount (. food_amounts current_level)]
    (food_service.handle_generation foods desired_food_amount data))
  ;; collisions  ; (if (and test_block (= test_block.state :ok) (_G.cols? player test_block))
  ;     (let [center {:x (+ test_block.x (/ test_block.w 2)) ;                   :y (+ test_block.y (/ test_block.h 2))}]
  ;       (set player.hit_dir_x (utils.get_x_dir player center)) ;       (set test_block.state :to_dead) ;       (set player.state ENUMS.p_state.crashing)))
  )

(fn scene.draw []
  (graphics.player player)
  (graphics.test_foods foods)
  (love.graphics.setColor 1 1 1)
  (graphics.track track))

(fn scene.keypressed [k]
  (when (= k :w) (print (tprint foods))))

scene
