(local utils (require :utils.fnl))

(local e {})

(set e.state_enum {:moving :moving :dead :dead})

(fn e.from_map [obj]
  {:x obj.x
   :y obj.y
   :h 32
   :w 32
   :fade_out 0
   :move_tick 0
   :type :food
   :state e.state_enum.moving
   :id (utils.id_gen)})

e
