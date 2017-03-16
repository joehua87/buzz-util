// @flow

export default function createMongoUri({
  auth,
  host,
  name,
  user,
  pass,
}: {
  auth: boolean,
  host: string,
  name: string,
  user?: string,
  pass?: string,
}): string {
  if (!auth) return `mongodb://${host}/${name}`
  if (!user || !pass) {
    throw new Error('When auth=true, require user & pass')
  }
  return `mongodb://${user}:${pass}@${host}/${name}?authSource=${name}`
}
