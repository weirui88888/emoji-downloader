import puppeteer from 'puppeteer'

export default async function getEmojisByType() {
  // launch browser
  const browser = await puppeteer.launch({
    headless: true
  })

  // create new page
  const page = await browser.newPage()

  // navigate to target page
  await page.goto('https://tw.piliapp.com/emoji/in-blog')

  const typeEmojis = await page.evaluate(() => {
    // get all elements whose class name contains 'block'
    const all_blocks = document.querySelectorAll('.block')

    // get all elements containing the 'block' of the emoji that needs to be downloaded
    const emoji_blocks = Array.from(all_blocks).slice(-8)

    return emoji_blocks.reduce((acc, cur) => {
      const emoji_type = cur.querySelector('h2').getAttribute('id')
      // emoji_class_name_in_this_type
      const emoji_element_in_this_type = cur
        .querySelector('.emojis')
        .querySelectorAll('[class*="emoji1"], [class*="emoji2"], [class*="emoji3"]')
      const emoji_class_name_in_this_type = Array.from(emoji_element_in_this_type).map(
        emoji_element => emoji_element.classList[1]
      )

      return {
        ...acc,
        [emoji_type]: emoji_class_name_in_this_type
      }
    }, {})
  })
  // emoji1f468-200d-1f469-200d-1f467 => https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f468_200d_1f469_200d_1f467.png
  // emoji1f468-200d-1f469-200d-1f467-200d-1f466 => https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f468_200d_1f469_200d_1f467_200d_1f466.png
  // emoji1f600 => https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f600.png
  // emoji270c => https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u270c.png
  // emoji3299 => https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u3299.png
  // emoji1f482-200d-2640-fe0f => https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f482_200d_2640.png
  // emoji emoji1f1ff-1f1fc https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f1ff-1f1fc.png

  // close browser
  await browser.close()
  return typeEmojis
}
