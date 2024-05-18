(local utils {})

(fn normalize_vec [vec]
  (let [dist (math.sqrt (+ (* vec.x vec.x) (* vec.y vec.y)))]
    (vector (* vec.x (/ 1.0 dist)) vec.y (* vec.y (/ 1.0 dist)))))

(set utils.get_x_dir (fn [a b]
                       (let [angle (math.atan2 (- a.y b.y) (- a.x b.x))]
                         (math.cos angle))))

utils
