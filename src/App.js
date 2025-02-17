import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram, Keypair, clusterApiUrl, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import BN from 'bn.js';
import { Buffer } from 'buffer';
import * as anchor from "@coral-xyz/anchor";
import * as ed25519 from "@noble/ed25519";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from '@noble/hashes/sha512';

// import idl from "./my_solana_dapp.json"; // 你的 JSON IDL 文件路径
// import idl from "./assets/meme_stake.json";
// import idl from "./assets/idl.json";
import idl from "./assets/meme_stake";
// const programID = new anchor.web3.PublicKey("8gEHTuuzFYxJaCzsCvJGrcGbH46pqhBzT9FcJRLcfdNZ");
// const programID = new anchor.web3.PublicKey("Ctso6k6oDhWzaJYyDmpYjzdBCVw4tgQEB4F35FXQekRW");
const programID = new anchor.web3.PublicKey("BRhQLiCJkEZfc4B74FgqycG9XboJbUpmsJn8ACrqxrNk");
const network = clusterApiUrl("devnet"); // 连接到 Solana devnet 网络
const opts = { preflightCommitment: "processed" }; // 交易确认级别设置

window.Buffer = Buffer;

// 在使用之前设置 sha512 函数
ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));

const App = () => {
  // 获取钱包和连接状态
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const [greetingAccountPublicKey, setGreetingAccountPublicKey] = useState(null);
  const [error, setError] = useState("");

  // 创建 Provider 实例，用于与区块链交互
  const getProvider = () => {
    if (!wallet) return null;
    const connection = new Connection(network, opts.preflightCommitment);
    return new AnchorProvider(connection, wallet, opts.preflightCommitment);
  };
  // const tokenMint = new anchor.web3.PublicKey("6rUcjXoCRHj9gt5gjXZHK3vY5Mr96YKR3wSf66yVVzDL");
  const tokenMint = new anchor.web3.PublicKey("DftqXLL6owAC99HUBWVjPxZk95zdMQ9rENgTmvY9EmPZ");

  function computeSignHash(
    action,
    programId,
    payerKey,
    tokenMintKey,
    amount,
    timeout,
    fromUid,
    toUid,
  ) {
    const buffers = [
      Buffer.from(action),
      programId.toBuffer(),
      payerKey.toBuffer(),
      tokenMintKey.toBuffer(),
      Buffer.alloc(8, amount.toArrayLike(Buffer, 'le', 8)),
      Buffer.alloc(8, timeout.toArrayLike(Buffer, 'le', 8)),
      Buffer.alloc(8, fromUid.toArrayLike(Buffer, 'le', 8)),
      Buffer.alloc(8, toUid.toArrayLike(Buffer, 'le', 8))
    ];

    const hashes = buffers.map(buffer => sha256(buffer));
    const uint8Array = sha256(new Uint8Array(hashes.flatMap(h => Array.from(h))));
    return Buffer.from(uint8Array);
  }

  const createGreeting = async () => {
    setError("");
    if (!connected) {
      setError("钱包未连接。");
      return;
    }
    const provider = getProvider();
    if (!provider) {
      setError("提供程序不可用。");
      return;
    }
    const idl1 = await Program.fetchIdl(programID, provider);
    console.log('idl...', idl);
    const program = new Program(idl, programID, provider);
    try {
      const greetingAccount = Keypair.generate();
      // await program.rpc.createGreeting({
      //   accounts: {
      //     greetingAccount: greetingAccount.publicKey,
      //     user: provider.wallet.publicKey,
      //     systemProgram: SystemProgram.programId,
      //   },
      //   signers: [greetingAccount],
      // });

      // 生成各种程序所需的账户地址

  const associatedTokenProgram = new anchor.web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

  

  // token 2022
      const tokenProgram = new anchor.web3.PublicKey(TOKEN_2022_PROGRAM_ID);
      // const [config,] = PublicKey.findProgramAddressSync([Buffer.from("configure"),], programID);
      let [config,] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("configure"),], programID);
      console.log("config = ", config.toBase58());


      // const [tokenConfig,] = PublicKey.findProgramAddressSync([Buffer.from("token_config"), tokenMint.toBuffer(),], programID);

      let [tokenConfig,] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("token_config"), tokenMint.toBuffer(),], programID);
      console.log("tokenConfig = ", tokenConfig.toBase58());

      const rent = new anchor.web3.PublicKey("SysvarRent111111111111111111111111111111111"); // 租金账户
      const payer = provider.wallet.publicKey; // 支付者（用户）的公钥
      const ixSysvar = new anchor.web3.PublicKey("Sysvar1nstructions1111111111111111111111111");
      console.log('payer>>', payer.toBase58());
      const systemProgram = new anchor.web3.PublicKey("11111111111111111111111111111111");
      
      // 用户质押账户地址
      let [userStake,] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("user_stake"), tokenMint.toBuffer(), payer.toBuffer(),], programID);
      console.log("userStake = ", userStake.toBase58());
      // 金库账户地址
      let [vault,] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("vault"),], programID);
      console.log("vault = ", vault.toBase58());
      
      // 相关代币账户地址

      let vaultAta = getAssociatedTokenAddressSync(tokenMint, vault, true, TOKEN_2022_PROGRAM_ID);
      console.log("vaultAta = ", vaultAta.toBase58());
    
      let userAta = getAssociatedTokenAddressSync(tokenMint, payer, true, TOKEN_2022_PROGRAM_ID);
      console.log("userAta = ", userAta.toBase58());
      // const vaultAta = getAssociatedTokenAddressSync(vault, payer); // 金库的关联代币账户
      // const userAta = getAssociatedTokenAddressSync(payer, tokenMint); // 用户的关联代币账户
      // const associatedTokenProgram = getAssociatedTokenAddressSync(tokenMint, payer);
      // const tokenProgram = new anchor.web3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"); // SPL代币程序ID
      console.log('config', config.toBase58());
      console.log('tokenConfig', tokenConfig.toBase58());
      console.log('publicKey', provider.wallet.publicKey.toBase58()); // DgsNAAjrCJEBeFm7ibNmCfzoA8Y5fr1KW6H5xrg7RiFY

      const fromUid = new BN(7785873458);
      const toUid = new BN(6814414966);
      const amount = new BN(100e9);
      const timeout = new BN(Date.now() / 1000 + 300);
      const prikey = "2d3cbad1498e771602e13a46bc563e3c5e5d661028ceed68e73b36eed1949549";
      const pubkey = Buffer.from(ed25519.getPublicKey(prikey));

      console.log('amount', amount.toBuffer);
      // const pubkey = await ed25519.getPublicKeyAsync(prikey);
      // const pubkey = 'HqVv6tNG1FbNJqg4DLi63scJqvGGJ28jDbMvmqgCCq5k'
      // console.log("Public  Key:", Buffer.from(pubkey).toString("hex"));
  
      // 配置全局参数 初始化执行一次
      // const tx = await program.methods.configure({
      //   isEnable: true, // 启用程序
      //   authority: payer, // 设置权限账户
      // })
      //   .accounts({
      //     config,
      //     payer,
      //     systemProgram: SystemProgram.programId,
      //     rent
      //   }).rpc();
      // console.log("Your transaction signature", tx);
  
      // let globalConfigData = await program.account.globalConfig.fetch(config);
      // console.log("globalConfigData : ", globalConfigData);


      // 设置代币相关配置
      // const tokenTx = await program.methods.setToken({
      //   isEnable: true, // 启用代币
      //   minAmount: new BN(1e9), // 最小质押数量：1个代币
      //   lockTimestamp: new BN(5 * 60), // 锁定时间：5分钟
      // })
      // .accounts({
      //   config,
      //   tokenConfig,
      //   tokenMint,
      //   payer: provider.wallet.publicKey,
      //   systemProgram: SystemProgram.programId,
      //   rent,
      // }).rpc();
      // console.log("tokenTx transaction signature", tokenTx);
      // let tokenTxConfigData = await program.account.tokenConfig.fetch(tokenConfig);
      // console.log("tokenTxConfigData : ", tokenTxConfigData);


    let payerTemp = new anchor.web3.PublicKey("HqVv6tNG1FbNJqg4DLi63scJqvGGJ28jDbMvmqgCCq5k");
    console.log("payerTemp = ", payerTemp.toBase58());
    const send_message = computeSignHash("stake", programID, payerTemp, tokenMint, amount, timeout, fromUid, toUid);
    console.log("send_message = ", send_message.toString('hex'));

    // 方案1：继续使用同步方法（推荐）
    const signature = ed25519.sign(send_message.toString('hex'), prikey);

    // 或者方案2：使用异步方法
    // const signature = await ed25519.signAsync(send_message, prikey);

    console.log("signature = ", signature);
    const send_signature = Buffer.from(signature);
    console.log("send_signature = ", send_signature.toString('hex'));

    const ed25519_ix = anchor.web3.Ed25519Program.createInstructionWithPublicKey({
      publicKey: Uint8Array.from(pubkey),
      message: Uint8Array.from(send_message),
      signature: Uint8Array.from(send_signature),
    });

    console.log("ed25519_ix = ", ed25519_ix);

      // 为了调试，可以添加以下代码
      console.log('Signature array:', Array.from(send_signature));
      console.log('Stake params:', {
        fromUid: fromUid.toString(),
        toUid: toUid.toString(),
        amount: amount.toString(),
        timeout: timeout.toString(),
        signature: Array.from(send_signature)
      });
    

    const tx = await program.methods.stake({
      fromUid: fromUid,
      toUid: toUid,
      amount: amount,
      timeout: timeout,
      signature: send_signature,
    })
    .accounts({
      config,
      tokenConfig,
      tokenMint,
      userStake,
      vault,
      vaultAta,
      userAta,
      payer,
      associatedTokenProgram,
      tokenProgram,
      systemProgram,
      rent,
      ixSysvar,
    })
    .preInstructions([ed25519_ix])
    .rpc();
    console.log("Your transaction signature", tx);


      // 质押代币
      // const stakeTx = await program.methods.stake({
      //   amount: new BN(100e9), // 质押数量：100个代币
      // })
      //   .accounts({
      //     tokenConfig,
      //     tokenMint,
      //     userStake,
      //     vault,
      //     vaultAta,
      //     userAta,
      //     payer,
      //     associatedTokenProgram,
      //     tokenProgram,
      //     systemProgram: SystemProgram.programId,
      //     rent,
      //   }).rpc();
      // console.log("Your transaction signature", stakeTx);
  
      // // 获取并打印账户数据
      // let tokenConfigData = await program.account.tokenConfig.fetch(tokenConfig);
      // console.log("tokenConfigData : ", tokenConfigData);
  
      // let userStakeData = await program.account.userStake.fetch(userStake);
      // console.log("userStakeData : ", userStakeData);


      // 解质押代币
      // const unstakeTx = await program.methods.unstake({
      //   amount: new BN(50e9),
      // })
      // .accounts({
      //     tokenConfig,
      //     tokenMint,
      //     userStake,
      //     vault,
      //     vaultAta,
      //     userAta,
      //     payer,
      //     associatedTokenProgram,
      //     tokenProgram,
      //     systemProgram: SystemProgram.programId,
      //     rent,
      //   }).rpc();
      // console.log("unstake transaction signature", unstakeTx);
  
      // let unstakeTokenConfigData = await program.account.tokenConfig.fetch(tokenConfig);
      // console.log("unstakeTokenConfigData : ", unstakeTokenConfigData);
  
      // let unstakeUserStakeData = await program.account.userStake.fetch(userStake);
      // console.log("unstakeUserStakeData : ", unstakeUserStakeData);

      // setGreetingAccountPublicKey(greetingAccount.publicKey.toString());
    } catch (err) {
      console.error("创建问候账户时出错：", err);
      setError("无法创建问候账户。请重试。");
    }
  };

  const incrementGreeting = async () => {
    setError("");
    if (!connected) {
      setError("钱包未连接。");
      return;
    }
    if (!greetingAccountPublicKey) {
      setError("问候账户未创建或公钥未设置。");
      return;
    }
    const provider = getProvider();
    if (!provider) {
      setError("提供程序不可用。");
      return;
    }
    // const idl = await Program.fetchIdl(programID, provider);
    const idl1 = await Program.fetchIdl(programID, provider);
    const program = new Program(idl1, programID, provider);
    try {
      await program.rpc.incrementGreeting({
        accounts: {
          greetingAccount: new anchor.web3.PublicKey(greetingAccountPublicKey),
          user: provider.wallet.publicKey,
        },
        signers: [],
      });
      console.log("问候已增加！");
    } catch (err) {
      console.error("增加问候时出错：", err);
      setError("无法增加问候。请重试。");
    }
  };

  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />
      <button onClick={createGreeting}>创建问候</button>
      {greetingAccountPublicKey && (
        <button onClick={incrementGreeting}>增加问候</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;