import Web3Utils from './Web3Utils'

class SmartContract  {

    constructor(config) {
        this.config = config;
        this.web3Util = new Web3Utils();
    }

    async loadTopicModerators() {
        console.log("loadTopicModerators()")

        return new Promise((resolve, reject) => {

            var topics = {}

            var contractInstance = this.config.getContractInstance("TOPICS", this.config.getSmartContractAddresses().topics);

            var events = contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

            events.get(function(err, res) {
                if(err) {
                    reject(err);
                }

                for(var i = 0; i < res.length; i++) {
                    var e = res[i];

                    if(e.args) { // only parsed events

                        var topic = window.web3.toAscii(e.args.topic).replace(/\u0000/g, '');
                        var address = e.args.modAddress;
                        if(!topics[topic]) {
                            topics[topic] = [];
                        }

                        if(e.event === "ModeratorAdded") {
                            topics[topic].push(e.args.modAddress)

                        } else if(e.event === "ModeratorDeactivated") {
                            topics[topic].splice(topics[topic].indexOf(address), 1);
                        }
                    }

                };

                resolve(topics);
            });
        });
    }

    async addTopicModerator(topic, moderator) {
        console.log("addModerator("+topic+", "+moderator+" from "+this.web3Util.getAccount()+")")

        return new Promise((resolve, reject) => {

            var contractInstance = this.config.getContractInstance("TOPICS", this.config.getSmartContractAddresses().topics);
            contractInstance.addModerator(topic, moderator, {from: this.web3Util.getAccount()}, function(err, res) {
                if(err) reject(err);
                resolve(res)
            });
        });

    }

    async removeModerator(topic, moderator) {
        console.log("removeModerator("+topic+", "+moderator+" from "+this.web3Util.getAccount()+")")
        
        return new Promise((resolve, reject) => {

            var contractInstance = this.config.getContractInstance("TOPICS", this.config.getSmartContractAddresses().topics);
            contractInstance.deactivateModerator(topic, moderator, {from: this.web3Util.getAccount()}, function(err, res) {
                if(err) reject(err);
                resolve(res)
            });
        });
    }
}


export default SmartContract;