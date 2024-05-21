(local service {})
(local utils (require :utils.fnl))

(local n_of_levels [1 2 3 4 5])
(local empty_data (accumulate [acc {} _ curr (pairs n_of_levels)]
                    (do
                      (tset acc curr {:food [] :building []})
                      acc)))

(local is_level_obj? (accumulate [acc {} _ curr (pairs n_of_levels)]
                       (do
                         (let [food (.. (.. :level_ curr) :_food)
                               building (.. (.. :level_ curr) :_building)]
                           (tset acc food true)
                           (tset acc building true))
                         acc)))

(local handle_building (fn [obj]
                         {:x obj.x
                          :y obj.y
                          :h obj.height
                          :w obj.width
                          :type :building}))

(local handle_food (fn [obj]
                     {:x obj.x
                      :y obj.y
                      :h 32
                      :w 32
                      :type :food
                      :fade_in 0
                      :id (utils.id_gen)}))

(set service.parse (fn [map]
                     (accumulate [acc empty_data k v (pairs map.layers)]
                       (do
                         (when (and (= v.type :objectgroup) (. is_level_obj? k))
                           (each [key value (pairs v.objects)]
                             (let [level (tonumber (string.sub v.name 7 7))
                                   type (string.sub v.name 9)]
                               (if (= type :food)
                                   (table.insert (. (. acc level) type)
                                                 (handle_food value))
                                   (= type :building)
                                   (table.insert (. (. acc level) type)
                                                 (handle_building value))))))
                         acc))))

(set service.get_buildings_from_scene_data
     (fn [data]
       (local buildings {})
       (each [level obj (pairs data)]
         (when (. obj.building 1)
           (each [_ b (pairs obj.building)]
             (table.insert buildings
                           {:x b.x :y b.y :w b.w :h b.h : level :name :todo}))))
       buildings))

service
