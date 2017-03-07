import { createClient } from 'contentful-management'

let client = null
let space = null

export async function initClient (accessToken, spaceId, host, hostUpload) {
  try {
    client = createClient({
      accessToken,
      host,
      hostUpload
    })

    space = await client.getSpace(spaceId)
  } catch (err) {
    throw err
  }

  return true
}

export async function fetchAssets () {
  try {
    const assetsResponse = await space.getAssets({})
    const assets = assetsResponse.items.sort((a, b) => {
      return a.sys.createdAt === b.sys.createdAt
        ? 0
        : a.sys.createdAt > b.sys.createdAt ? -1 : 1
    })
    return assets
  } catch (err) {
    throw err
  }
}

export async function createAssetFromFile (file) {
  try {
    const contentType = file.type
    const fileName = file.name
    let asset = await space.createAssetFromFiles({
      fields: {
        title: {
          'en-US': fileName
        },
        file: {
          'en-US': {
            contentType,
            fileName,
            file
          }
        }
      }
    })
    asset = await asset.processForAllLocales()
    return asset
  } catch (err) {
    throw err
  }
}
