_W = { w = 1024, h = 768 }
_center = { x = _W.w / 2, y = _W.h / 2 }
function love.conf(t)
  t.window.width = _W.w
  t.window.height = _W.h
  t.window.resizable = false
  t.modules.joystick = false
  t.modules.physics = false
  t.window.vsync = false
  t.version = "11.5"
  t.window.title = "my beautiful fantasy game"
end
