(local service {})

(local n_of_levels [1 2 3 4 5])
(local is_level_obj? (accumulate [acc {} _ curr (pairs n_of_levels)]
                       (do
                         (let [food (.. (.. :level_ curr) :_food)
                               building (.. (.. :level_ curr) :_building)]
                           (tset acc food true)
                           (tset acc building true))
                         acc)))

(set service.parse (fn [map]
                     (accumulate [acc {} k v (pairs map.layers)]
                       (do
                         (when (and (= v.type :objectgroup) (. is_level_obj? k))
                           (tset acc k v))
                         acc))))

service
