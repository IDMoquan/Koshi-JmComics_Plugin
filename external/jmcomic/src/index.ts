import { get } from 'http';
import { Context, Schema, h, is } from 'koishi'

export const name = 'jmcomic'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

async function getComic(number, session){
  const {exec} = require('child_process');
  const fs = require('fs');
  await session.send(`${h('at', {id: session.userId})} 正在下载${number}，请稍等片刻...`);
  return new Promise((resolve) => {
    // 修正路径分隔符，确保脚本能被找到
    exec('python', ['external\\jmcomic\\src\\main.py', number], (error) => {
      if (error) {
        console.error('Python调用失败:', error);
        resolve(false);
        return;
      }
      // 脚本执行完再检查文件
      const filePath = `downloads/pdf/${number}.pdf`;
      resolve(fs.existsSync(filePath));
    });
  });
}

export function apply(ctx: Context) {
  ctx.command('jm <number>')
  .action(async(bot, number) => {
    const session = bot.session;
    const {exec} = require('child_process');
    const fs = require('fs');
    await session.send(`${h('at', {id: session.userId})} 正在下载#${number}，请稍等片刻...`);
    await exec('python', ['external/jmcomic/src/main.py', number], (error) => {
      if (error) {
        await session.send('python调用错误');
        return;
      }
      const filePath = `downloads/pdf/${number}.pdf`;
      if(fs.existsSync(filePath)){

      }
      else{

      }
    });
  })
}