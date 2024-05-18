fennel = require("lib.fennel")
vector = require("lib.hump.vector")
timer = require("lib.hump.timer")

debug.traceback = fennel.traceback
table.insert(package.loaders, function(filename)
  if love.filesystem.getInfo(filename) then
    return function(...)
      return fennel.eval(love.filesystem.read(filename), { env = _G, filename = filename }, ...), filename
    end
  end
end)
-- jump into Fennel
require("main.fnl")
