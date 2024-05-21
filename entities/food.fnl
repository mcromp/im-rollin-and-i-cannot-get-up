(local utils (require :utils.fnl))

(local e {})
(fn e.from_map [obj]
  {:x obj.x :y obj.y :h 32 :w 32 :type :food :fade_in 0 :id (utils.id_gen)})

e
