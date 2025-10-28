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
    exec('python', ['externa\\jmcomic\\src\\main.py', number], (error) => {
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
    const {exec} = require('child_process');
    try{
      getComic(number, bot.session);
    }
    catch(err){
      bot.session.send('error');
    }
    const session = bot.session;
    session.send('seccess');
    // const isSuccess = await getComic(number, session);
    // session.send(isSuccess.toString());
    //   if(isSuccess){
    //     session.send(`${h('at', {id: session.userId})} 下载完成！${number}`);
    //     return h.file('downloads\\pdf\\' + number + '.pdf');
    //   }
    //   else{
    //     return `${h('at', {id: session.userId})} 下载失败，请检查编号是否正确：${number}`;
    //   }
    })
}