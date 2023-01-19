const indexController = (req, res) => {
  console.log();
  console.log();
  console.log();
  console.log();
  console.log(req.body);
  console.log();
  console.log();
  console.log();
  console.log();

  const { roomSize, insects } = req.body;
  if (!roomSize || !insects) {
    return res.status(400).json({ error: true, message: "Invalid Input" });
  }
  const { roomX, roomY } = roomSize.split(" ");
  const result = [];

  for (const key in insects) {
    const insect = insects[key];
    result.push(moveInsect(insect.position, insect.path));
  }

  res.status(200).json({ result: result });
};

// coding here
const moveInsect = (pos, path) => {
  const directions = ["N", "E", "S", "W"];

  let [x, y, di] = pos.split(" ");
  x = parseInt(x);
  y = parseInt(y);

  for (let i = 0; i < path.length; i++) {
    if (path[i] == "F") {
      if (di == "N") {
        y += 1;
      } else if (di == "S") {
        y -= 1;
      } else if (di == "E") {
        x += 1;
      } else if (di == "W") {
        x -= 1;
      }
    } else if (path[i] == "L") {
      di = directions[(directions.indexOf(di) - 1 + 4) % 4];
    } else if (path[i] == "R") {
      di = directions[(directions.indexOf(di) + 1 + 4) % 4];
    }
  }

  return `${x} ${y} ${di}`;
};

export default indexController;
