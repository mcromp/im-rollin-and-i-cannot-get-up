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
  (graphics.load)
  (love.audio.play _G.sfx.music)
  (_G.sfx.music:setVolume 0.5)
  (set data (map_service.parse _G.map))
  (set buildings (map_service.get_buildings_from_scene_data data))
  (set foods (. (. data _Gstate.level) :food)))

(fn scene.update [dt]
  (local lvl_kill (. lvl_kills _Gstate.level))
  (local powered_up? (>= player.xp (. xps _Gstate.level)))
  (local player_size (. player_size _Gstate.level))
  (local p_center {:x (- player.x (/ player_size 2))
                   :y (- player.y (/ player_size 2))
                   :h player_size
                   :w player_size})
  ;; handle level up
  (when (and (and (= player.kills lvl_kill) (not player.level_up?))
             (not= _Gstate.level 5))
    (set player.level_up? true)
    (_G.sfx.music:pause)
    (love.audio.play _G.sfx.fanfare)
    (timer.after 2.7 (fn [] (_G.sfx.music:play)))
    (timer.after 2.5
                 (fn []
                   (local new_level (+ _Gstate.level 1))
                   (set player.level_up? false)
                   (set _Gstate.level new_level)
                   (set foods (. (. data new_level) :food))
                   (love.audio.play _G.sfx.grow)
                   (set camera.scale (. lvl_c _Gstate.level)))))
  ;; player movement 
  (let [f (. player_movement_service player.state)]
    (if (and f (not player.level_up?)) (f player track dt)))
  ;; food 
  (each [k food (pairs foods)]
    (let [f (. food_service food.state)] (if f (f food dt)))
    (when (>= player.xp (. xps _Gstate.level))
      (set foods {}))
    ;; food collision
    (when (and (= food.state :moving) (_G.cols? p_center food))
      (when (< player.xp (. xps _Gstate.level))
        (set player.xp (+ player.xp 1)))
      (when (_G.sfx.eat:isPlaying) (_G.sfx.eat:stop))
      (love.audio.play _G.sfx.eat)
      (set food.state :dead)
      (timer.after 5 (fn [] (set food.state :moving)))))
  ;; buildings 
  (each [k building (pairs buildings)]
    (let [f (. building_service building.state)] (if f (f building dt)))
    ;; building collision
    (when (and (_G.cols? p_center building) (= building.state :ok))
      (let [b_center {:x (+ building.x (/ building.w 2))
                      :y (+ building.y (/ building.h 2))}]
        (set player.hit_dir_x (utils.get_x_dir p_center b_center))
        (if (not powered_up?)
            (do
              (love.audio.play _G.sfx.bounce)
              (set player.state ENUMS.p_state.bouncing))
            (do
              (love.audio.play _G.sfx.hit)
              (set player.state ENUMS.p_state.crashing)
              (set player.kills (+ player.kills 1))
              (set building.state :hit))))))
  (graphics.update dt))

(fn scene.hud []
  (graphics.hud player))

(fn scene.draw []
  (graphics.track track)
  (graphics.test_buildings buildings)
  (graphics.player player)
  (graphics.test_foods foods))

(fn scene.keypressed [k]
  (when (= k :w)
    (set player.kills (+ player.kills 1))))

scene
