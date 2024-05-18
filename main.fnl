(local w_w 800)
(local w_h 600)
(local cen_w 400)
(local cen_h 300)
(var player {:name :player :h 64 :w 64 :vx 0 :vy 1 :x (/ w_w 2) :y (/ w_h 2)})

(var point {:x (/ w_w 2) :y (/ w_h 2)})

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
; ---- player 
  (local p_cx (+ player.x (/ player.w 2)))
  (local p_cy (+ player.y (/ player.h 2)))
  (love.graphics.points player.x player.y)
; ---- point
  (love.graphics.circle :fill player.x player.y 10 10) 
  (love.graphics.points point.x point.y))

(fn apply_g [vx]
  (if (< (math.abs vx) 10) 1
      (< vx 1) (+ vx 1)
      (> vx 1) (- vx 1)))

(var d_radius 100)
(var radius 100)
(var skew 2)
(fn love.update [dt]
  (local r_f (+ radius player.vx))
  (set ticker (+ ticker dt))
  (set player.x (+ point.x (* (/ (math.cos ticker) skew) r_f)))
  (set player.y (+ point.y (* (math.sin ticker) r_f)))
  (if (and (love.keyboard.isDown :left) (< player.vx 50))
      (set player.vx (+ player.vx (* dt 100)))
      (and (love.keyboard.isDown :right) (> player.vx -50))
      (set player.vx (- player.vx (* dt 40)))
      (set player.vx (apply_g player.vx))))

(fn love.keypressed [key]
  (when (= key :escape) (love.event.quit)))
