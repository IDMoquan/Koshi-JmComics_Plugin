import { Context, Schema, h } from 'koishi'
import { pathToFileURL } from 'url'
import { resolve } from 'path'

export const name = 'jmcomic'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('jm <number>')
  .action(async(bot, number) => {
    var path = require("path");
    const session = bot.session;
    const {exec} = require('child_process');
    const fs = require('fs');
    await session.send(path.resolve(__dirname));
    await session.send(`${h('at', {id: session.userId})} 正在下载#${number}，请稍等片刻...`);
    await exec(`python ${path.resolve(__dirname)}/../src/main.py ${number}`, (error,stdout) => {
      session.send("python end");
      if (error) {
        session.send('下载失败');
        session.send(stdout);
        return;
      }
      const filePath = `downloads/pdf/${number}.pdf`;
      const pdf_dir = 'downloads/pdf';
      const img_dir = 'downloads/cover';
      if(fs.existsSync(filePath)){
        session.send(`${h('at', {id: session.userId})} #jm-${number}\n下载完成，正在发送...\n Cover:${h.image(`${img_dir}/${number}.jpg`)}`);
        session.send(h.file(`${pdf_dir}/${number}.pdf`));
        return 'success';
      }
      else{
        return (`${h('at', {id: session.userId})} 下载失败`);
      }
    });
  })
}