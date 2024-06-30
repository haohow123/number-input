"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function getDefaultRoomAllocation(guest, rooms) {
    var minCost = Infinity;
    var defaultRooms = [];
    function getCost(adults, children, curRoomIdx, curCost, curRooms) {
        // if no more adults or children, check if current cost is the minimum cost
        if (!adults && !children) {
            if (curCost < minCost) {
                minCost = curCost;
                defaultRooms = __spreadArray([], curRooms, true);
            }
            return;
        }
        //exceed room
        if (curRoomIdx >= rooms.length) {
            return;
        }
        var _a = rooms[curRoomIdx], roomPrice = _a.roomPrice, adultPrice = _a.adultPrice, childPrice = _a.childPrice, capacity = _a.capacity;
        //try all combination
        for (var i = 0; i <= Math.min(adults, capacity); i++) {
            for (var j = 0; j <= Math.min(children, capacity - i); j++) {
                //i: counts of adult, j: counts of children,
                if ((j && i) || (!j && i)) {
                    var totalPeople = i + j;
                    if (totalPeople <= capacity) {
                        var cost = roomPrice + i * adultPrice + j * childPrice;
                        curRooms.push({
                            adult: i,
                            child: j,
                            price: cost,
                        });
                        getCost(adults - i, children - j, curRoomIdx + 1, curCost + cost, curRooms);
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
exports.default = getDefaultRoomAllocation;
var guest = { adult: 7, child: 5 };
var rooms = [
    { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
    { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
];
console.log(getDefaultRoomAllocation(guest, rooms)); // Output the minimum cost
