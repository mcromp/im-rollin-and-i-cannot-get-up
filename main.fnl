(require :globals.fnl)

(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local camera (require :services/camera.fnl))
(local utils (require :utils.fnl))
(local scenes {:game (require :scenes/game.fnl)
               :title (require :scenes/title.fnl)
               :credits :TODO})

(fn love.load []
  ;; load data
  (set _G.sfx
       {:music (love.audio.newSource :assets/sfx/music.ogg :stream)
        :hit (love.audio.newSource :assets/sfx/hit.ogg :static)
        :bounce (love.audio.newSource :assets/sfx/bounce.ogg :static)
        :fanfare (love.audio.newSource :assets/sfx/fanfare.mp3 :static)
        :grow (love.audio.newSource :assets/sfx/grow.mp3 :static)
        :eat (love.audio.newSource :assets/sfx/eat.ogg :static)})
  (let [font (love.graphics.newFont 32)]
    (love.graphics.setFont font))
  ;; load scene
  (set _G.scene scenes.game)
  (_G.scene.load)
  ;; start a thread listening on stdin
  (: (love.thread.newThread "require('love.event')
while 1 do love.event.push('stdin', io.read('*line')) end") :start))

(fn love.handlers.stdin [line]
  ;; evaluate lines read from stdin as fennel code
  (let [(ok val) (pcall fennel.eval line)]
    (print (if ok (fennel.view val) val))))

(fn love.draw []
  (love.graphics.push)
  (when (and _G.map player) (camera.draw player))
  (when _G.scene (_G.scene.draw))
  (love.graphics.pop)
  (when (and _G.scene _G.scene.hud) (_G.scene.hud)))

(fn love.update [dt]
  (when _G.map (_G.map:update dt))
  (when _G.scene (_G.scene.update dt))
  (timer.update dt))

(fn love.keypressed [k]
  ;; debugging remove for production
  (when _G.scene (_G.scene.keypressed k))
  (when (= k :escape) (love.event.quit))
  (when (= k :i) (set camera.scale (+ camera.scale 1)))
  (when (= k :p) (set camera.scale 1))
  (when (= k :o) (set camera.scale (/ camera.scale 1.5))))
