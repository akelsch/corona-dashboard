import Option from '../models/Option'

export function findOption (guid) {
  return Option.findByPk(guid)
}

export function saveOption (option) {
  return Option.upsert(option)
}
