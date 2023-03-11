const gameList = [
  {
    title: '仁王2',
    platform: "Steam",
    type: "ACT"
  },
  {
    title: 'God of War',
    platform: "PlayStation4",
    type: "ARPG"
  },
  {
    title: 'The legend of Zelda',
    platform: "Nintendo Switch",
    type: "RPG"
  }
];
export default [
  {
    url: '/api/getResouceList',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          gameList
        }
      };
    }
  }
];