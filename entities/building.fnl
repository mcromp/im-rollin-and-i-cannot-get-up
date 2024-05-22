(local e {})

(set e.state_enum {:ok :ok :hit :hit :dead :dead})

(fn e.from_map [obj]
  {:x obj.x
   :y obj.y
   :h obj.height
   :w obj.width
   :type :building
   :state e.state_enum.ok
   :fade_out 0})

e
