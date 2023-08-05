import { useMemo, useState } from 'react';
import network from '../components/KitPlans/network.json';

const useWalletProvider = () => {
  const [walletProvider, setWalletProvider] = useState<string>();
  const [transactionNetwork, setTransactionNetwork] = useState<string>('');

  const wallets = useMemo(() => {
    const aux = Object.keys(network).map((key) => {
      return { name: key, code: key };
    });
    return aux;
  }, []);

  const address = useMemo(() => {
    const crtNetwork = network[walletProvider as keyof typeof network]?.find((item) => item.address === transactionNetwork);
    return crtNetwork?.address;
  }, [walletProvider, transactionNetwork]);

  const networksOptions = useMemo(() => {
    return network[walletProvider as keyof typeof network]?.map((item) => {
      return { name: `${item.coin} (${item.coin}, ${item.network})`, code: item.address };
    });
  }, [walletProvider]);

  return { wallets, address, networksOptions, setTransactionNetwork, setWalletProvider };
};

const changeWalletCode = (e: 'Binance' | 'KuCoin' | 'Coinbase') => {
  const response = network[e].map((item) => ({
    name: `${item.coin} (${item.coin}, ${item.network})`,
    code: item.address,
    network: item.network,
  }));
  return response;
};

export { useWalletProvider, changeWalletCode };
