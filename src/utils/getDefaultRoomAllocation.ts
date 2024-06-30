type Guest = {
  adult: number;
  child: number;
};
type Room = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
};
type DefaultRoom = {
  adult: number;
  child: number;
  price: number;
};
function getDefaultRoomAllocation(
  guest: Guest,
  rooms: Array<Room>
): Array<DefaultRoom> {
  let minCost = Infinity;
  let defaultRooms: Array<DefaultRoom> = [];

  function getCost(
    adults: number,
    children: number,
    curRoomIdx: number,
    curCost: number,
    curRooms: Array<DefaultRoom>
  ) {
    // if no more adults or children, check if current cost is the minimum cost
    if (!adults && !children) {
      if (curCost < minCost) {
        minCost = curCost;
        defaultRooms = [...curRooms];
      }
      return;
    }

    //exceed room
    if (curRoomIdx >= rooms.length) {
      return;
    }

    const { roomPrice, adultPrice, childPrice, capacity } = rooms[curRoomIdx];

    //try all combination
    for (let i = 0; i <= Math.min(adults, capacity); i++) {
      for (let j = 0; j <= Math.min(children, capacity - i); j++) {
        //i: counts of adult, j: counts of children,
        if ((j && i) || (!j && i)) {
          const totalPeople = i + j;
          if (totalPeople <= capacity) {
            const cost = roomPrice + i * adultPrice + j * childPrice;
            curRooms.push({
              adult: i,
              child: j,
              price: cost,
            });
            getCost(
              adults - i,
              children - j,
              curRoomIdx + 1,
              curCost + cost,
              curRooms
            );
            curRooms.pop();
          }
        }
      }

      // Skip the current room
      getCost(guest.adult, guest.child, curRoomIdx + 1, curCost, curRooms);
    }
  }

  getCost(guest.adult, guest.child, 0, 0, []);
  return defaultRooms;
}

export default getDefaultRoomAllocation;
