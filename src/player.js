class Player {
  constructor(id, name, role, room) {
    this.id = id
    this.name = name
    this.role = role
    this.room = room
  }

  setName(name) {
    this.name = name
  }

  setRoom(room) {
    this.room = room
  }
}

export default Player