(local service {})

(fn service.created [food] (set food.state :fade_in))
(fn service.fade_in [food]
  (if (= food.fade_in 0) (timer.tween 0.5 food {:fade_in 1} :in-cubic)
      (= food.fade_in 1) (set food.state :moving)
      (timer.tween 1 food {:move_tick 20} :out-cubic)))

service
