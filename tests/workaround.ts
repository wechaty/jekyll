const NOT_WEBP_TO_BE_FIXED_FILE_LIST = [] as string[]

/**
 * Huan(202107): we forgot to check the limit of gif files before... -_-b
 */
const BIG_SIZE_TO_BE_FIXED_FILE_LIST = [
  /**
   * Images
   */
  'jekyll/assets/2018/birthday-cake-chickens.webp',
  'jekyll/assets/2018/techiefestival-24.webp',
  'jekyll/assets/2020/wechaty-log-monitor/archy-demo.webp',
  'jekyll/assets/2020/your-wechat-bot/demo.webp',
  'jekyll/assets/2021/06-summer-2021-open-source/002.webp',
  'jekyll/assets/2021/07-wechaty-with-paddlepaddle/botbay.webp',
  'jekyll/assets/2021/07-wechaty-with-paddlepaddle/panda_emoji.webp',
  'jekyll/assets/2021/07-wechaty-with-paddlepaddle/pic_mask.webp',
  'jekyll/assets/2021/07-wechaty-with-paddlepaddle/wanderer.webp',
  /**
   * PDFs
   */
  'jekyll/assets/2019/bot5-seminar-2/chatbot-experience-limingth.pdf',
  'jekyll/assets/2020/11-summer-2020-wechaty/wechaty-summer-2020-introduction.pdf',
  'jekyll/assets/2020/11-summer-2020-wechaty-en/wechaty-summer-2020-introduction.pdf',
  'jekyll/assets/2020/qijibot/final.pdf',
  'jekyll/assets/2020/qijibot/talk2.pdf',
  'jekyll/assets/2020/wechaty-plugin-milestone/gcaufy.pdf',
  'jekyll/assets/2020/wechaty-plugin-milestone/yuan.pdf',
  'jekyll/assets/2020/wechaty-words-per-day-plugin-final/presentation.pdf',
  'jekyll/assets/2021/02-summer-wechaty-nanjing-summit-journey/slides.pdf',
  'jekyll/assets/2021/07-gdg-shanghai-wechaty/wechaty-community-talk-live-demo.pdf',
  'jekyll/assets/2021/08-ospp-mid-term-wechaty-itchat-puppet/itchat.pdf',
  'jekyll/assets/2021/08-ospp-mid-term-wechaty-puppet-oa/wechaty-puppet-oa-midterm-ppt.pdf',
]

/**
 * Huan(202107):
 *
 *  Enforce all images in wechaty website to use .webp format #1035
 *    https://github.com/wechaty/wechaty.js.org/issues/1035
 *
 */
const inList = (whitelist: string[]) => (fileName: string) => whitelist.some(
  partial => fileName.includes(partial),
)

export {
  BIG_SIZE_TO_BE_FIXED_FILE_LIST,
  NOT_WEBP_TO_BE_FIXED_FILE_LIST,
  inList,
}
