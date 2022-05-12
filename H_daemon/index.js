const { getLastestTransactions } = require('./utils/main');
const { Transactions, sequelize } = require('./models');

/**
 *
 * sequelize-cli로 다음 명령어를 순서대로 실행
 *
 * 1. npx sequelize-cli db:create
 * 2. npx sequelize-cli model:generate --name Transactions --attributes hash:string,nonce:integer,blockHash:string,blockNumber:integer,transactionIndex:integer,from:string,to:string,value:string,gas:integer,gasPrice:string,input:text,v:string,r:string,s:string
 * 3. npx sequelize-cli db:migrate
 *
 * Transaction data types
 * {
      hash: string,
      nonce: integer,
      blockHash: string,
      blockNumber: integer,
      transactionIndex: integer,
      from: string,
      to: string,
      value: string,
      gas: integer,
      gasPrice: string,
      input: text,
      v: string,
      r: string,
      s: string
   }
 */

// 한 개의 트랜잭션을 DB에 기록
const storeData = async (data) => await Transactions.create(data);

const startTask = async () => {
	let arr = [];
	getLastestTransactions().then((result) => {
		for (let data of result) {
			arr.push(storeData(data));
		}
		if (arr.length > 0) {
			Promise.all(arr)
				.then(async () => {
					console.log('Done.');
					await sequelize.close();
				})
				.then(() => {
					arr = [];
				})
				.catch(async (err) => {
					console.log(err);
					await sequelize.close();
				});
		} else {
			console.log('No transactions');
		}
	});
};

startTask();
