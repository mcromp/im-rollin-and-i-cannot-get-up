(local scene {})
(local ENUMS (require :enums.fnl))
(local camera (require :services/camera.fnl))
(local utils (require :utils.fnl))
(local player_movement_service (require :services/player_movement.fnl))
(local map_service (require :services/map.fnl))
(local food_service (require :services/food.fnl))
(local building_service (require :services/building.fnl))
(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local graphics (require :ui/graphics.fnl))
(local sti (require :lib.sti))
(set scene.map :map/map.lua)
(local food_amounts (. (. (require :levels.fnl) :data) :food_amount))
(local player_size (. (. (require :levels.fnl) :data) :player_size))
(local lvl_kills (. (. (require :levels.fnl) :data) :kills))
(local xps (. (. (require :levels.fnl) :data) :xp))
(local lvl_c (. (. (require :levels.fnl) :data) :camera))

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
  (local lvl_kill (. lvl_kills _Gstate.level))
  (local powered_up? (>= player.xp (. xps _Gstate.level)))
  (local powered_up? true)
  (local player_size (. player_size _Gstate.level))
  (local p_center {:x (- player.x (/ player_size 2))
                   :y (- player.y (/ player_size 2))
                   :h player_size
                   :w player_size})
  ;; handle level up
  (when (and (and (= player.kills lvl_kill) (not player.level_up?))
             (not= _Gstate.level 5))
    (set player.level_up? true)
    (timer.after 2
                 (fn []
                   (set player.level_up? false)
                   (set _Gstate.level (+ _Gstate.level 1))
                   (set foods {})
                   (set camera.scale (. lvl_c _Gstate.level)))))
  ;; player movement 
  (let [f (. player_movement_service player.state)]
    (if f (f player track dt)))
  ;; food generation 
  (local current_level _Gstate.level)
  (let [desired_food_amount (. food_amounts current_level)]
    (food_service.handle_generation foods desired_food_amount data)) ; food collision  
  ;; food 
  (each [k food (pairs foods)]
    (let [f (. food_service food.state)] (if f (f food dt)))
    ;; food collision
    (when (and (= food.state :moving) (_G.cols? p_center food))
      (when (< player.xp (. xps _Gstate.level))
        (set player.xp (+ player.xp 1)))
      (love.audio.play _G.sfx.eat)
      (set food.state :dead)))
  ;; food kill
  (for [i (length foods) 1 -1]
    (let [food (. foods i)]
      (when (= food.state :dead) (table.remove foods i)))
    ;; buildings 
    (each [k building (pairs buildings)]
      (let [f (. building_service building.state)] (if f (f building dt)))
      ;; building collision
      (when (and (_G.cols? p_center building) (= building.state :ok))
        (let [b_center {:x (+ building.x (/ building.w 2))
                        :y (+ building.y (/ building.h 2))}]
          (set player.hit_dir_x (utils.get_x_dir p_center b_center))
          (if (not powered_up?) (set player.state ENUMS.p_state.bouncing)
              (do
                (set player.state ENUMS.p_state.crashing)
                (set player.kills (+ player.kills 1))
                (set building.state :hit))))))))

(fn scene.hud []
  (graphics.hud player))

(fn scene.draw []
  (graphics.track track)
  (graphics.test_buildings buildings)
  (graphics.player player)
  (graphics.test_foods foods))

(fn scene.keypressed [k]
  (when (= k :w)
    (print (tprint (. (. data 2) :food)))))

scene
