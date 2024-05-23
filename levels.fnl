(local levels {})

;; fnlfmt: skip
(set levels.data 
  {
    :camera [5 3 2 1 0.5] 
    :xp [8 10 85 123 164] 
    :kills [3 6 10 14 20]
    :shake [0.3 0.2 0.1 0.05 0.01]
    :food_amount [120 1 1 1 1]
    :player_size [8 12 16 32 64]
    :movement [
      {:speed 08 :move_force 200 :max_move_amount 100 :gravity 0.5}
      {:speed 06 :move_force 350 :max_move_amount 150 :gravity 2}
      {:speed 05 :move_force 500 :max_move_amount 300 :gravity 4}
      {:speed 03 :move_force 650 :max_move_amount 400 :gravity 5}
      {:speed 02 :move_force 800 :max_move_amount 600 :gravity 10}
    ]
  })

levels
