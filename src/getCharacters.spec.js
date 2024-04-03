const getCharacters = require('./getCharacters')


describe('getCharacters', () => {

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve({
        items: [
          {name: 'Winner', score: 9.0, type: 'hero'},
          {name: 'Loser', score: 8.0, type: 'villain'}
        ]
      }) })
    )

  it('should return the list fetched', async() => {
    const superHeroes = await getCharacters()
    expect(superHeroes.items.length).toEqual(2)
  })
  // TODO : increase coverage
})
