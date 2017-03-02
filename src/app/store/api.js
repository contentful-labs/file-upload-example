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
    const assetsResponse = await space.getAssets()
    return assetsResponse.items
  } catch (err) {
    throw err
  }
}
