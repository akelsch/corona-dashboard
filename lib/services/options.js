import Option from '../models/Option'

export function findOption (guid) {
  return Option.findByPk(guid)
}

export function createOption (option) {
  if ( option.guid && findOption(option.guid)) {
    return Option.update(option, {
      where: { guid: option.guid }
    })
  }
  else {
    return Option.create(option)
  }
}
