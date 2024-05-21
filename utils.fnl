(local utils {})

(fn normalize_vec [vec]
  (let [dist (math.sqrt (+ (* vec.x vec.x) (* vec.y vec.y)))]
    (vector (* vec.x (/ 1.0 dist)) vec.y (* vec.y (/ 1.0 dist)))))

(set utils.get_x_dir (fn [a b]
                       (let [angle (math.atan2 (- a.y b.y) (- a.x b.x))]
                         (math.cos angle))))

(local random math.random)
(set utils.id_gen (fn []
                    (local s :xxxxxxxxxx)
                    (local id
                           (string.gsub s :x
                                        (fn [c]
                                          (local v (random 0 15))
                                          (string.format "%x" v))))
                    id))

utils
