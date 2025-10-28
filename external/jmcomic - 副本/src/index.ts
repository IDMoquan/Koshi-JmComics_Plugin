import { Context, Schema, h, is } from 'koishi'
import { Session } from 'node:inspector/promises';

export const name = 'jmcomic'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

async function getComic(number, session){
  const {exec} = require('child_process');
  const fs = require('fs');
  session.send(`${h('at', {id: session.userId})} 正在下载${number}，请稍等片刻...`);
  
  exec('python', ['external\\jmcomic\\src\\main.py', number]);
  const filePath = 'downloads\\pdf\\' + number + '.pdf';
  if(fs.existsSync(filePath)){
    return true;
  }
  else{
    return false;
  }
}

export function apply(ctx: Context) {
  ctx.command('jm <number>')
    .action(async(bot, number) => {
      const isSuccess = await getComic(number, bot.session);
      if(isSuccess){
        bot.session.send(`${h('at', {id: bot.session.userId})} 下载完成！${number}`);
        return h.file('downloads\\pdf\\' + number + '.pdf');
      }
      else{
        return `${h('at', {id: bot.session.userId})} 下载失败，请检查编号是否正确：${number}`;
      }
    })
}