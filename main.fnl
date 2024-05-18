(local center {:x (/ _W.w 2) :y (/ _W.h 2)})
(var player {:name :player :h 64 :w 64 :vx 0 :vy 1 :x center.x :y center.y})
(var point {:x center.x :y center.y})
(var track {:r 1000 :skew 2})

(fn draw_player []
  (local p_cx (+ player.x (/ player.w 2)))
  (local p_cy (+ player.y (/ player.h 2)))
  (love.graphics.points player.x player.y))

(fn draw_track []
  (love.graphics.setColor .39 .20 .51)
  (love.graphics.ellipse :line center.x center.y (/ track.r track.skew) track.r
                         20)
  (love.graphics.setColor 1 1 1))

(fn draw_point []
  (love.graphics.circle :fill player.x player.y 10 10)
  (love.graphics.points point.x point.y))

(fn love.load []
  ;; start a thread listening on stdin
  (: (love.thread.newThread "require('love.event')
while 1 do love.event.push('stdin', io.read('*line')) end") :start))

(fn love.handlers.stdin [line]
  ;; evaluate lines read from stdin as fennel code
  (let [(ok val) (pcall fennel.eval line)]
    (print (if ok (fennel.view val) val))))

(var ticker 0)
(fn love.draw []
  (love.graphics.setColor 1 1 1)
  (draw_track [])
  (draw_player [])
  (draw_point []))

(fn apply_g [vx]
  (if (< (math.abs vx) 10) 1
      (< vx 1) (+ vx 1)
      (> vx 1) (- vx 1)))

(var d_radius 100)

(fn love.update [dt]
  (local force (+ track.r player.vx))
  (set ticker (+ ticker dt))
  (set player.x (+ point.x (* (/ (math.cos ticker) track.skew) force)))
  (set player.y (+ point.y (* (math.sin ticker) force)))
  (if (and (love.keyboard.isDown :left) (< player.vx 50))
      (set player.vx (+ player.vx (* dt 100)))
      (and (love.keyboard.isDown :right) (> player.vx -50))
      (set player.vx (- player.vx (* dt 40)))
      (set player.vx (apply_g player.vx))))

(fn love.keypressed [key]
  (when (= key :escape) (love.event.quit)))
