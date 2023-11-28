#! /usr/bin/env node

import { Command } from 'commander'
import path from 'path'
import c from 'ansi-colors'
import { rimrafSync } from 'rimraf'
import getEmojisByType from '../src/get-emojis-by-type.js'
import downloadAllEmojisByType from '../src/download-all-emojis-by-type.js'
import generateData from '../src/generate-data.js'
import pkg from '../package.json' assert { type: 'json' }
const program = new Command()

const validRemoteEmojiTypes = ['people', 'nature', 'food', 'activity', 'travel', 'objects', 'symbols', 'flags']

program.name(pkg.name).description(pkg.description).version(pkg.version)

const printDownloadTypeEmojiLog = async emojiType =>
  console.log(c.cyan(`------------------------------start download ${emojiType} emojis------------------------------`))
const printGenerateDataLog = async dataPath =>
  console.log(
    c.cyan.bold.underline(`------------------------------generate ${dataPath} successful------------------------------`)
  )

program
  .command('download')
  .argument('[type...]', 'The types of emoji you want to download', validRemoteEmojiTypes)
  .option('--target [download directory]', 'Specify the directory in which to download emojis', 'emojis')
  .option(
    '--origin [custom origin]',
    'If a custom origin is provided, an integrated configuration file will be generated for your convenience.'
  )
  .action((requiredTypes, { target, origin }) => {
    const targetDirectory = path.isAbsolute(target) ? target : path.join(process.cwd(), target)
    for (const inputType of requiredTypes) {
      if (!validRemoteEmojiTypes.includes(inputType)) {
        console.log(
          c.red(
            `The emoji type parameters you provide '${inputType}' is not supported.\nThe emoji types currently supported for download include ${c.blue(
              validRemoteEmojiTypes.toString()
            )}.\nPlease retry again.`
          )
        )
        process.exit(1)
      }
    }
    rimrafSync(targetDirectory)
    getEmojisByType().then(async typeEmojis => {
      try {
        for (const [emojiType, emojiNames] of Object.entries(typeEmojis)) {
          if (requiredTypes.includes(emojiType)) {
            await printDownloadTypeEmojiLog(emojiType)
            await downloadAllEmojisByType({ emojiType, emojiNames, targetDirectory })
          }
        }
        if (origin) {
          await generateData({
            origin,
            targetDirectory,
            requiredTypes
          })
          await printGenerateDataLog(path.join(targetDirectory, 'data.js'))
        }
      } catch (e) {
        console.log(e)
        console.log(
          c.red(
            'Some errors occurred,sorry!You can go directly to https://tw.piliapp.com/emoji/in-blog to download emoji manually.'
          )
        )
      }
    })
  })

program.parse()
