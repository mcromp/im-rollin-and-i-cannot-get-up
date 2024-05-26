(local levels {})

;; fnlfmt: skip
(set levels.data 
  {
    :camera [5 2 0.5] 
    :xp [8 32  63] 
    :kills [7 20 45]
    :shake [0.3 0.1 0.01]
    :player_size [25 45 64]
    :player_img [.4 .7 1]
    :movement [
      {:speed 08 :move_force 200 :max_move_amount 70 :gravity 0.5}
      {:speed 04 :move_force 500 :max_move_amount 150 :gravity 2}
      {:speed 01.7 :move_force 800 :max_move_amount 350 :gravity 4}
    ]
  })

levels
