(local service {})
(set service.scale 2.5)

(set service.draw (fn [target]
                    (local scale service.scale)
                    (let [dx (- target.x (/ (/ _W.w 2) scale))
                          dy (- target.y (/ (/ _W.h 2) scale))]
                      (love.graphics.scale scale)
                      (love.graphics.translate (- dx) (- dy))
                      (_G.map:draw (- dx) (- dy) scale scale))))

service
