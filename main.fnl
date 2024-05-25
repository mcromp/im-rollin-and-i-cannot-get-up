(require :globals.fnl)

(local startup (require :startup.fnl))
(local player (require :entities/player.fnl))
(local track (require :entities/track.fnl))
(local camera (require :services/camera.fnl))
(local utils (require :utils.fnl))
(local scenes {:game (require :scenes/game.fnl)
               :title (require :scenes/title.fnl)
               :ending :TODO})

(fn love.load []
  (startup)
  ;; load scene
  (set _G.scene scenes.title)
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
  (when _G.scene (_G.scene.keypressed k)))