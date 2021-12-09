import web3 from "./web3";
import VoteContract from './build/vote.json'

const instance = new web3.eth.Contract(JSON.parse(VoteContract.interface), '0x25244FA0a8C91dAE09664dA43E8f0F1c2D4AAA30'); 
console.log(instance) 


export default instance;