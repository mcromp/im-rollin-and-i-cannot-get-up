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

service
