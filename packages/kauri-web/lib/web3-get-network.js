import { Observable } from "rxjs/Observable";
import { showNotificationAction } from "./Module";

const networkNames = {
  1: "Main",
  2: "Morden",
  3: "Ropsten",
  4: "Rinkeby",
  42: "Kovan",
  224895: "Kauri Dev",
};

const getNetwork = () =>
  new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, netId) => {
      const networkId = parseInt(netId, 10);
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // console.log(netId);
        if (networkNames[networkId] === "Rinkeby") {
          resolve(true);
        } else {
          reject(new Error("Wrong network"));
        }
      }
    });
  });

const web3GetNetwork = () =>
  window.web3 && window.web3.version
    ? Observable.fromPromise(getNetwork()).catch(err => {
      console.error(err);
      if (err.message.includes("Metamask locked!")) {
        return Observable.throw(new Error("Metamask locked!"));
      } else if (err.message.includes("Wrong network")) {
        return Observable.throw(new Error("Wrong network"));
      }
      return Observable.throw(new Error("Submission error"));
    })
    : Observable.of(
      showNotificationAction({
        notificationType: "error",
        message: "Wrong network",
        description:
            "Please switch to the Rinkeby network to checkpoint articles!",
      })
    );

export default web3GetNetwork;
export { web3GetNetwork };
