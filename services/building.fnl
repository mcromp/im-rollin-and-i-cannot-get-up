(local service {})

(fn service.hit [building]
  (when (= building.fade_out 0)
    (timer.after 0.5 (set building.state :dead))))

service
