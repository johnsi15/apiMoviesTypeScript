import { buildMessage } from '../utils/buildMessage'

describe('utils - buildMessage', function () {
  describe('when receives na entity and an action', function () {
    test('should return the respective message', function () {
      const result = buildMessage('movie', 'create')
      const expected = 'movie created'
      expect(result).toBe(expected)
    })
  })

  describe('when receives an entity and an action and is a list', function () {
    test('should return the respective message with the entity in plural', function () {
      const result = buildMessage('movie', 'list')
      const expected = 'movies listed'
      // assert.strictEqual(result, expected)
      expect(result).toBe(expected)
    })
  })
})
