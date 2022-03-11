class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._things = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get things() {
    return this._things
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  set things(value) {
    this._things = value;
  }

  /**
   * change room
   * 
   * @param {string} direction whith way 
   * @returns {object}  
   * @author Lana
   * @version 1.0
   */
  describe() {
    return "In the " + this._name + " you can see " + this._description;
  }

  
  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  /**
   * what in the room
   * 
   * @returns {array} way to move
   * @author Lana
   * @version 1.0
   */
  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }

  
  //method to move to a new room
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way",);
      alert(this._name)
      return this;
    }
  }
}

class Variant {
  constructor(name) {
    this._name = name,
      this._description = ""
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  
  describe() {
    return "The " + this._name + " is " + this._description;
  }


}

class Things {
  constructor(name) {
    this._name = name,
      this._description = ""
    this._conversation = ""
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }
  /**
   *  things in room description
   * 
   * @returns {string} description of the things
   * @author Lana
   * @version 1.0
   */
  describe() {
    return "You can see for " + this._name + ", " + this._name + " is " + this._description;
  }

  converse() {
    return  "'" ;
  }
}

class Box extends Things {
  constructor(name) {
    super(name);
    this._furnit = "";
  }

  set furnit(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._furnit = value;
  }


}

//What you see in room
const Kitchen = new Room("Kitchen");
Kitchen.description = "a big room";
const livingroom = new Room("livingroom");
livingroom.description = "nice comfortable room";
const BeedRoom = new Room("BeedRoom");
BeedRoom.description = "good place for sleep";
const Office = new Room("Office");
Office.description = "place for work with big table";

//link the diffren rooms 
Kitchen.linkRoom("south", livingroom);
Kitchen.linkRoom("east", Office);
livingroom.linkRoom("north", Kitchen);
livingroom.linkRoom("east", BeedRoom);
BeedRoom.linkRoom("west", livingroom);
BeedRoom.linkRoom("north", Office);
Office.linkRoom("south", BeedRoom);
Office.linkRoom("west", Kitchen);

//add describe things

//add things
const Bag = new Box("things");
Bag.conversation = "three things";
Bag.description = "hidden";

// add things to rooms
Kitchen.things = Bag;

/**
 * What we have in current room
 * 
 * @param {object} room show room
 * @author Lana
 * @version 1.0 
 */
function displayRoomInfo(room) {
  let occupantMsg = ""
  if (room.things === "") {
    occupantMsg = ""
  } else {
    occupantMsg = room.things.describe() + ". " + room.things.converse()
  }

  textContent = "<p>" + room.describe() + "</p>" + "<p>" +
    occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
  document.getElementById("usertext").focus();
}

/**
 * Start game
 * 
 * @author Lana
 * @version 1.0
 */
function startGame() {  
  currentRoom = Kitchen
  document.getElementById('shoud').style.display = 'block';
  document.getElementById('finishtbutton').style.display = 'block';
  document.getElementById('title').style.display = 'none';
  document.getElementById('gamearea').style.background = 'grey'; 
 
  displayRoomInfo(currentRoom);

  //

  //handle commands
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"]
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command)
        displayRoomInfo(currentRoom);
        
        if(document.getElementById("usertext").value = "south"){
          document.getElementById('background').style.backgroundImage = 'url(img/start.jpg)';
        }        
       
      } else {
        document.getElementById("usertext").value = ""
        alert("that is not a valid command please try again")
      }

    }
  });
}



