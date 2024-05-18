_W = { w = 1024, h = 768 }
function love.conf(t)
  t.window.width = _W.w
  t.window.height = _W.h
  t.modules.physics = false
  t.window.resizable = false
  t.window.title = "game"
end
