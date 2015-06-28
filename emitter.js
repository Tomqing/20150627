var events = require('events');
var EventEmitter = events.EventEmitter;
var util = require('util');
function Person(name){
    this.name = name;
}
util.inherits(Person,EventEmitter);
/**
 * addListener(event,listener); 增加监听
 * on(event,listener)增加监听
 * once(event,listener) 只监听一次
 * removeListener 解除监听
 * removeAllListeners(event) 解除监听
 * emit(event) 发射事件
 * listeners('')
 * EventEmitter.listenerCount(me,'')
 */

var tom = new Person();
var i = 0,timer;
tom.addListener('我还想玩呢',function(){
    timer = setInterval(function(){
        i++;
        console.log('尽情玩吧');
        if(i>10){
            tom.emit('当我们25岁');
        }
    },1000);
});
tom.on('当我们25岁',function(){
    console.log('不能玩了');
    tom.removeListener('我还想玩呢',tom._events['我还想玩呢']);
    clearInterval(timer);
    timer=null;
    console.log('要结婚了');
    tom.emit('要结婚了');
});
tom.once('要结婚了',function(){
    console.log('准备彩礼吧');
    tom.emit('准备彩礼吧');
});
tom.on('准备彩礼吧',function(){
    tom.removeAllListeners();
});
tom.emit('我还想玩呢');