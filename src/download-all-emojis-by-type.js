import axios from 'axios'
import path from 'path'
import fs from 'fs'
import c from 'ansi-colors'

async function downloadEmojisByType({ emojiType, emojiOriginClassName, targetDirectory }) {
  let handledEmojiClassName = emojiOriginClassName.replace(/emoji/g, 'emoji_u').replace(/-/g, '_').replace(/_fe0f/g, '')
  let emojiRemoteUrl = `https://pic.sopili.net/pub/emoji/noto-emoji/png/128/${handledEmojiClassName}.png`
  if (emojiType === 'flags') {
    handledEmojiClassName = emojiOriginClassName.replace('emoji', '')
    emojiRemoteUrl = `https://pic.sopili.net/pub/emoji/twitter/2/72x72/${handledEmojiClassName}.png`
  }
  const targetTypeDirectory = path.join(targetDirectory, emojiType)
  const targetEmojiPath = path.join(targetTypeDirectory, `${handledEmojiClassName}.png`)
  try {
    if (!fs.existsSync(targetTypeDirectory)) {
      fs.mkdirSync(targetTypeDirectory, { recursive: true })
    }
    const response = await axios.get(emojiRemoteUrl, { responseType: 'arraybuffer' })
    fs.writeFileSync(targetEmojiPath, response.data)
    console.log(`Download emoji ${c.green(emojiRemoteUrl)} successful`)
  } catch (e) {
    console.log(`Download emoji ${c.red(emojiRemoteUrl)} failed`)
  }
}

export default async function downloadAllEmojisByType({ emojiType, emojiNames, targetDirectory }) {
  let downloadPromises = emojiNames.map(
    async emojiOriginClassName => await downloadEmojisByType({ emojiType, emojiOriginClassName, targetDirectory })
  )
  await Promise.all(downloadPromises)
}
