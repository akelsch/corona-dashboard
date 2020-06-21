import Option from '../models/Option'

export async function findOption (guid) {
  return await Option.findByPk(guid)
}

export async function createOption (option) {
  return await Option.create(option)
}
