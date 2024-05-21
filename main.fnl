(require :globals.fnl)

(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local camera (require :camera.fnl))
(local utils (require :utils.fnl))

(local scenes {:game (require "scenes/game.fnl")
               :title (require "scenes/title.fnl")
               :credits :TODO})

(fn love.load []
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
  (when (and _G.map player) (camera.draw player))
  (when _G.scene (_G.scene.draw)))

(fn love.update [dt]
  (when _G.map (_G.map:update dt))
  (when _G.scene (_G.scene.update dt))
  (timer.update dt))

(fn love.keypressed [key]
  ;; debugging remove for production
  (when (= key :escape) (love.event.quit))
  (when (= key :i) (set camera.scale (+ camera.scale 1)))
  (when (= key :p) (set camera.scale 1))
  (when (= key :o) (set camera.scale (- camera.scale 1))))
