const battle = require('./battle')
const getCharacters = require('./getCharacters')

jest.mock('./getCharacters')

it('battle should return the hero if they have a higher score', () => {
  getCharacters.mockReturnValue({
    items: [
      {name: 'Winner', score: 9.0, type: 'hero'},
      {name: 'Loser', score: 8.0, type: 'villain'}
    ]
  })

  expect(battle('Winner', 'Loser')).toEqual({name: "Winner", score: 9.0, type: 'hero'})
})