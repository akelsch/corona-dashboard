import { Option } from '../models'

export function findOption (guid) {
  return Option.findByPk(guid)
}

export function saveOption (option) {
  return Option.upsert(option)
}
