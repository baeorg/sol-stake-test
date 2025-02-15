import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram, Keypair, clusterApiUrl, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import BN from 'bn.js';
import { Buffer } from 'buffer';

// import idl from "./my_solana_dapp.json"; // 你的 JSON IDL 文件路径
import idl from "./assets/meme_stake.json";
// import idl from "./assets/idl.json";
// const programID = new PublicKey("8gEHTuuzFYxJaCzsCvJGrcGbH46pqhBzT9FcJRLcfdNZ");
const programID = new PublicKey("Ctso6k6oDhWzaJYyDmpYjzdBCVw4tgQEB4F35FXQekRW");
const network = clusterApiUrl("devnet"); // 连接到 Solana devnet 网络
const opts = { preflightCommitment: "processed" }; // 交易确认级别设置

window.Buffer = Buffer;

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
  // const tokenMint = new PublicKey("6rUcjXoCRHj9gt5gjXZHK3vY5Mr96YKR3wSf66yVVzDL");
  const tokenMint = new PublicKey("DftqXLL6owAC99HUBWVjPxZk95zdMQ9rENgTmvY9EmPZ");

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
    console.log('idl...', idl1);
    console.log('idl2...', idl);
    const program = new Program(idl1, programID, provider);
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
      const [config, configBump] = PublicKey.findProgramAddressSync([Buffer.from("configure"),], program.programId);
      const [tokenConfig, tokenConfigBump] = PublicKey.findProgramAddressSync([Buffer.from("token_config"), tokenMint.toBuffer(),], program.programId);
      const rent = new PublicKey("SysvarRent111111111111111111111111111111111"); // 租金账户
      const payer = provider.wallet.publicKey; // 支付者（用户）的公钥
      
      // 用户质押账户地址
      const [userStake, userStakeBump] = PublicKey.findProgramAddressSync([Buffer.from("user_stake"), tokenMint.toBuffer(), payer.toBuffer(),], program.programId);
      // 金库账户地址
      const [vault, vaultBump] = PublicKey.findProgramAddressSync([Buffer.from("vault"), tokenMint.toBuffer(),], program.programId);
      
      // 相关代币账户地址
      const vaultAta = getAssociatedTokenAddressSync(vault, payer); // 金库的关联代币账户
      const userAta = getAssociatedTokenAddressSync(payer, tokenMint); // 用户的关联代币账户
      const associatedTokenProgram = getAssociatedTokenAddressSync(tokenMint, payer);
      const tokenProgram = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"); // SPL代币程序ID
      console.log('config', config.toBase58());
      console.log('tokenConfig', tokenConfig.toBase58());
      console.log('publicKey', provider.wallet.publicKey.toBase58()); // DgsNAAjrCJEBeFm7ibNmCfzoA8Y5fr1KW6H5xrg7RiFY
  
      // 配置全局参数
      const tx = await program.methods.configure({
        isEnable: true, // 启用程序
        authority: payer, // 设置权限账户
      })
        .accounts({
          config,
          payer,
          systemProgram: SystemProgram.programId,
          rent
        }).rpc();
      console.log("Your transaction signature", tx);
  
      let globalConfigData = await program.account.globalConfig.fetch(config);
      console.log("globalConfigData : ", globalConfigData);


      // 设置代币相关配置
      const tokenTx = await program.methods.setToken({
        isEnable: true, // 启用代币
        minAmount: new BN(1e9), // 最小质押数量：1个代币
        lockTimestamp: new BN(5 * 60), // 锁定时间：5分钟
      })
      .accounts({
        config,
        tokenConfig,
        tokenMint,
        payer: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
        rent,
      }).rpc();
      console.log("tokenTx transaction signature", tokenTx);
      let tokenTxConfigData = await program.account.tokenConfig.fetch(tokenConfig);
      console.log("tokenTxConfigData : ", tokenTxConfigData);


      // 质押代币
      const stakeTx = await program.methods.stake({
        amount: new BN(100e9), // 质押数量：100个代币
      })
        .accounts({
          tokenConfig,
          tokenMint,
          userStake,
          vault,
          vaultAta,
          userAta,
          payer,
          associatedTokenProgram,
          tokenProgram,
          systemProgram: SystemProgram.programId,
          rent,
        }).rpc();
      console.log("Your transaction signature", stakeTx);
  
      // 获取并打印账户数据
      let tokenConfigData = await program.account.tokenConfig.fetch(tokenConfig);
      console.log("tokenConfigData : ", tokenConfigData);
  
      let userStakeData = await program.account.userStake.fetch(userStake);
      console.log("userStakeData : ", userStakeData);


      // 解质押代币
      const unstakeTx = await program.methods.unstake({
        amount: new BN(50e9),
      })
      .accounts({
          tokenConfig,
          tokenMint,
          userStake,
          vault,
          vaultAta,
          userAta,
          payer,
          associatedTokenProgram,
          tokenProgram,
          systemProgram: SystemProgram.programId,
          rent,
        }).rpc();
      console.log("unstake transaction signature", unstakeTx);
  
      let unstakeTokenConfigData = await program.account.tokenConfig.fetch(tokenConfig);
      console.log("unstakeTokenConfigData : ", unstakeTokenConfigData);
  
      let unstakeUserStakeData = await program.account.userStake.fetch(userStake);
      console.log("unstakeUserStakeData : ", unstakeUserStakeData);

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
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.incrementGreeting({
        accounts: {
          greetingAccount: new PublicKey(greetingAccountPublicKey),
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