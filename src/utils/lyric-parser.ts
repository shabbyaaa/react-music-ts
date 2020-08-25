/*
 * @Author: Shabby申
 * @Date: 2020-08-25 20:06:18
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-25 22:21:31
 * 歌词解析方法
 */

// 解析 [00:01.997] 这一类时间戳的正则表达式
const timeExp: RegExp = /\[(\d{2,}):(\d{2})(?:[.:](\d{2,3}))?]/g;
const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

const tagRegMap: any = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
}


/**
 * @params {string} lrc
 * @params {function} handler
*/


export default class Lyric {

  lrc: any;
  tags: any;
  lines: any;
  handler: any;
  state: number;
  curLineIndex: number;
  speed: number;
  offset: number;
  timer: any;
  startStamp: any;
  //  构造器接收两个参数 一个是待解析的字符串 一个是歌曲播放抵达某个时间戳的时候，执行相应的回调
  // eslint-disable-next-line
  constructor(lrc: any, hanlder = ({ }: any) => { }, speed = 1) {
    this.lrc = lrc
    this.tags = {}
    this.lines = []
    this.handler = hanlder
    this.state = STATE_PAUSE
    this.curLineIndex = 0
    this.speed = speed
    this.offset = 0

    this._init()
  }

  _init() {
    this._initTag()

    this._initLines()
  }

  _initTag() {
    for (let tag in tagRegMap) {
      const matches = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i'))
      this.tags[tag] = matches && (matches[1] || '')
    }
  }

  _initLines() {
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let result: any = timeExp.exec(line)
      if (result) {
        const txt = line.replace(timeExp, '').trim();
        if (txt) {
          if (result[3].length === 3) {
            result[3] = result[3] / 10;
          }
          this.lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
            txt
          })
        }
      }
    }

    this.lines.sort((a: any, b: any) => {
      return a.time - b.time
    })

  }

  _findcurLineIndex(time: any) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  _callHandler(i: any) {
    if (i < 0) {
      return
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i
    })
  }

  _playRest(isSeek = false) {
    let line = this.lines[this.curLineIndex]
    let delay;
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      //拿到上一行的歌词开始时间，算间隔
      let preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++)
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest()
      }
    }, (delay / this.speed))
  }

  changeSpeed(speed: number) {
    this.speed = speed;
  }

  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return
    }
    this.state = STATE_PLAYING

    this.curLineIndex = this._findcurLineIndex(offset)
    //现在正处于第this.curLineIndex-1行
    this._callHandler(this.curLineIndex - 1)
    this.offset = offset
    this.startStamp = +new Date() - offset

    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer)
      this._playRest(isSeek)
    }
  }

  togglePlay(offset: number) {
    if (this.state === STATE_PLAYING) {
      this.stop()
      this.offset = offset
    } else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }

  stop() {
    this.state = STATE_PAUSE
    this.offset = 0
    clearTimeout(this.timer)
  }

  seek(offset: number) {
    this.play(offset, true)
  }
}
