import fs from 'fs'
import path from 'path'

const emojiTypeInfos = {
  people: {
    en_name: 'smile_face_and_people',
    zh_name: '笑脸与人物',
    name: 'smile_face_and_people'
  },
  nature: {
    en_name: 'animal_and_nature',
    zh_name: '动物与自然',
    name: 'animal_and_nature'
  },
  food: {
    en_name: 'food_and_drink',
    zh_name: '食物与饮料',
    name: 'food_and_drink'
  },
  activity: {
    en_name: 'activity',
    zh_name: '活动',
    name: 'activity'
  },
  travel: {
    en_name: 'travel_and_landmarks',
    zh_name: '旅游与地标',
    name: 'travel_and_landmarks'
  },
  objects: {
    en_name: 'objects',
    zh_name: '物品',
    name: 'objects'
  },
  symbols: {
    en_name: 'symbols',
    zh_name: '符号',
    name: 'symbols'
  },
  flags: {
    en_name: 'flags',
    zh_name: '旗帜',
    name: 'flags'
  }
}

const combineData = ({ origin, targetDirectory, orderEmojiMap }) => {
  const downloadEmojiTypes = fs.readdirSync(path.join(targetDirectory))
  const data = {}
  downloadEmojiTypes.forEach(emojiTypeName => {
    const emojiTypePath = path.join(targetDirectory, emojiTypeName)
    const stat = fs.statSync(emojiTypePath)
    if (stat.isDirectory()) {
      const emojiNames = fs.readdirSync(emojiTypePath)
      const resources = emojiNames.map(emojiName => {
        return { name: emojiName, src: path.join(origin, path.basename(targetDirectory), emojiTypeName, emojiName) }
      })
      data[emojiTypeName] = {
        resources,
        ...orderEmojiMap.get(emojiTypeName)
      }
    }
  })
  return data
}

export default async function generateData({ origin, requiredTypes, targetDirectory }) {
  const orderEmojiMap = new Map()
  for (let i = 0; i < requiredTypes.length; i++) {
    const emojiType = requiredTypes[i]
    const order = i + 1
    const emojiTypeInfo = emojiTypeInfos[emojiType]
    orderEmojiMap.set(emojiType, {
      ...emojiTypeInfo,
      order
    })
  }
  const data = combineData({ origin, orderEmojiMap, targetDirectory })
  const generateDataPath = path.join(targetDirectory, 'data.js')
  const dataContent = `const data = ${JSON.stringify(data, null, 2)};\n\nexport default data;`
  fs.writeFileSync(generateDataPath, dataContent)
}
