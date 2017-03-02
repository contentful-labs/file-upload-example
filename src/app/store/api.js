import { createClient } from 'contentful-management'

let client = null
let space = null

export async function initClient (accessToken, spaceId) {
  try {
    client = createClient({
      accessToken
    })

    space = await client.getSpace(spaceId)
  } catch (err) {
    throw err
  }

  return true
}

export async function fetchAssets () {
  try {
    return await space.getAssets()
  } catch (err) {
    throw err
  }
}
