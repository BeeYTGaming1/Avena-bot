const discord = require('discord.js');
const config= require('../../config.json');
const ee = require("../../config.json")
const {
  databasing,
  escapeRegex
} = require("../../functions")
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");

module.exports = {
name: 'unlockvc',
aliases: ['unlock-voice', "unlockvoice"],
usage: 'unlock',
description: 'Unlocks the Voice Channel \(makes it public\)!',
run: async (client, message, args) => {
    let {
        channel
      } = message.member.voice;
      if (!channel) return message.reply(new Discord.MessageEmbed()
        .setColor(config.wrongcolor)
        .setTitle(":x: You have to be in a VoiceChannel, for this Command")
        .setFooter(config.footertext, config.footericon)
      )
      client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
      client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
      if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
        var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
        let perms = vc.permissionOverwrites.map(c => c)
        let owner = false;
        for (let i = 0; i < perms.length; i++) {
          if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
        }
        if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
        if (!owner)
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.wrongcolor)
            .setTitle(":x: You have to be the Owner of the **temp.** VoiceChannel!")
            .setFooter(config.footertext)
          )
        vc.updateOverwrite(message.guild.id, {
          VIEW_CHANNEL: true,
          CONNECT: true
        }).then(lol => {
          vc.updateOverwrite(message.author.id, {
            MANAGE_CHANNELS: true,
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true,
            CONNECT: true
          })
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle("✅ UNLOCKED your Channel!")
            .setDescription(`Everyone can join now!`)
            .setFooter(config.footertext)
          )
        })
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setColor(config.wrongcolor)
          .setTitle(":x: You have to be in a **temp.** VoiceChannel, for this Command!")
          .setFooter(config.footertext)
        )
      }
},
};