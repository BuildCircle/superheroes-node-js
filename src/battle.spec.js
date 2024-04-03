const battle = require('./battle')

describe('battle results', () => {

  const heroes = {
    hero1: {name: 'hero1', score: 9.0, type: 'hero', weakness: 'villain1'},
    hero2: {name: 'hero2', score: 9.1, type: 'hero', weakness: 'villain2'},
    hero3: {name: 'hero3', score: 9.0, type: 'hero'},
  }

  const villains = {
    villain1: {name: 'villain1', score: 8.9, type: 'villain'},
    villain2: {name: 'villain2', score: 8.0, type: 'villain'},
    villain3: {name: 'villain3', score: 9.1, type: 'villain'},
  }


  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => {
      return {
        items: [
          ...Object.values(heroes),
          ...Object.values(villains),
        ]
      }
    }
  })


  describe('Battle results without nemesis', () => {
    it('battle should return the hero if hero have a higher score', async () => {
      expect(await battle('hero3', 'villain2')).toEqual(heroes.hero3)
    })

    it('should return the villain if villain has higher score', async () => {
      expect(await battle('hero3', 'villain3')).toEqual(villains.villain3)
    })
  })

  describe('Battle results with nemesis', () => {
    it('should return the hero if hero wins despites nemesis', async () => {
      expect(await battle('hero2', 'villain2')).toEqual(heroes.hero2)
    })

    it('should return the hero if both have same score', async () => {
      expect(await battle('hero2', 'villain3')).toEqual(heroes.hero2)
    })

  })

})

