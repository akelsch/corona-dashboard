import Option from '../models/Option'

export function findOption (guid) {
  return Option.findByPk(guid)
}

export function createOption (option) {
  return Option.create(option)
}
