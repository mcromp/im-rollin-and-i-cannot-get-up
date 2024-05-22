(local levels {})

;; fnlfmt: skip
(set levels.data 
  {
    :camera [4 3 2 1 0.5] 
    :xp [8 10 85 123 164] 
    :kills [3 6 10 14 20]
    :food_amount [120 20 20 20 20]
    :player_size [8 12 16 32 64]
    :movement [
      {:speed 09 :move_force 200 :max_move_amount 100 :gravity 0.5}
      {:speed 08 :move_force 350 :max_move_amount 200 :gravity 8}
      {:speed 06 :move_force 500 :max_move_amount 300 :gravity 11}
      {:speed 05 :move_force 650 :max_move_amount 400 :gravity 14}
      {:speed 04 :move_force 800 :max_move_amount 500 :gravity 18}
    ]
  })

levels
