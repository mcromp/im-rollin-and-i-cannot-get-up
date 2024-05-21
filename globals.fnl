(set _G.cols? (fn [a b]
                (and (< a.x (+ b.x b.w)) (> (+ a.x a.w) b.x)
                     (< a.y (+ b.y b.h)) (> (+ a.y a.h) b.y))))

(set _G.map nil)
(set _G.scene nil)
