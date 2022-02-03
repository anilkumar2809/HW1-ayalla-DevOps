/* const child=require('child_process');
const chalk = require('chalk');
const pathUtil = require("path");

const VBoxProvider = require('../lib/provider/vbox');
const VirtualizationFrameworkProvider = require('../lib/provider/vf');

exports.command = 'up <image_dir>';
exports.desc = 'ssh to vm';
exports.builder = yargs => {
    yargs.options({
        force: {
            alias: 'f',
            describe: 'Force the old VM to be deleted when provisioning',
            default: false,
            type: 'boolean'
        }
    });
};


exports.handler = async argv => {
    const { force, image_dir, processor } = argv;

    let provider = new VBoxProvider()
    let config=provider.sshConfig()
    
    

    try {
        await provider.up(name, image_dir, force);  
       // let sshCmd='ssh -q -i "${sshConfig.privateKey}" -p ${sshConfig.port} -o StrictHostKeyChecking=no ${sshconfig.sshUser}@${sshConfig.hostname}';
       let sshCmd=`ssh -i "${config.identifyFile}" -p ${config.port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${config.user}@${config.host}`;
       console.log('connecting with ${sshCmd}');
        return child.execSync(sshCmd, {stdio: ['inherit','inherit', 'inherit']});

    } catch (err) {
        console.log( chalk.red( err.message ) );
    }
    
}; */
const chalk = require('chalk');
const path  = require('path');
const spawn = require('child_process').spawn;
// const exec = require('child_process').exec;
const VBoxManage = require('../lib/exec/VBoxManage');
const VBoxProvider = require('../lib/provider/vbox');

const execSync = require('child_process').execSync;
exports.command = 'ssh';
exports.desc = 'ssh into the vm';
exports.builder = yargs => {
    yargs.options({
        force: {
            alias: 'f',
            describe: 'SSH into the vm created',
            default: false,
            type: 'boolean'
        }
    });
};


exports.handler = async argv => {
    const { force } = argv;
    let provider = new VBoxProvider()
    let config = provider.sshConfig
    try{
        let ssh_command = `ssh -i "${config.identifyFile}" -p ${config.port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${config.user}@${config.host}`;
        return execSync(ssh_command, {stdio:['inherit', 'inherit', 'inherit']})
    }
    catch(err){
        console.log(chalk.magenta(err.message))
    }
}