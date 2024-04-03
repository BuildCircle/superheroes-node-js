const battle = require('./battle')
const getCharacters = require('./getCharacters')

jest.mock('./getCharacters')

it('battle should return the hero if they have a higher score', async() => {
  getCharacters.mockResolvedValue({
    items: [
      {name: 'Winner', score: 9.0, type: 'hero'},
      {name: 'Loser', score: 8.0, type: 'villain'}
    ]
  })

  const battleResult  = await battle('Winner', 'Loser')
  expect(battleResult).toEqual({name: "Winner", score: 9.0, type: 'hero'})
})

// TODO :
// - Loser not part of list
// -
