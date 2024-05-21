(local service {})

(fn service.handle_generation [foods desired_amount data]
  (if (= (length foods) desired_amount)
      0
      (let [new_i (love.math.random (length foods))
            food_areas (. (. data _Gstate.level) :food)
            spawned_food_ids (accumulate [acc {} _ v (pairs foods)]
                               (do
                                 (tset acc v.id true)
                                 acc))
            new_food (. food_areas new_i)]
        (if (= spawned_food_ids new_food.id) 0
            (table.insert foods new_food)))))

(fn service.created [food] (set food.state :fade_in))
(fn service.fade_in [food]
  (if (= food.fade_in 0) (timer.tween 0.5 food {:fade_in 1} :in-cubic)
      (= food.fade_in 1) (set food.state :moving)
      (timer.tween 1 food {:move_tick 20} :out-cubic)))

service
