export type TokenSymbol = 'WETH' | 'ETH' | 'DAI' | 'USDT' | 'BNB';

import { BigNumber } from '@ethersproject/bignumber';

export interface Token {
    address: string;
    symbol: TokenSymbol;
    decimals: number;

    chainId?: number;
    balance?: BigNumber;
}

export interface TokensPerChainConfig {
    chainId: number;
    chainName: string;
    tokens: Token[];
}

export class TokensPerChainConfigManager {
    private chains: TokensPerChainConfig[];

    constructor(chains: TokensPerChainConfig[]) {
        this.chains = chains;
    }

    public getTokenForChain(chainId: number, tokenSymbol: TokenSymbol): Token | undefined {
        const chain = this.chains.find((chain) => chain.chainId === chainId);
        if (!chain) {
            // Not throwing Error anymore, too much redness in prod!
            // throw new Error(`Chain with ID '${chainId}' not found.`);
            console.log(`Chain with ID '${chainId}' not found.`);
            return undefined;
        }

        const token = chain.tokens.find((token) => token.symbol === tokenSymbol);
        if (!token) {
            // Not throwing Error anymore, too much redness in prod!
            // throw new Error(`Token '${tokenSymbol}' not found in chain with ID '${chainId}'.`);
            console.log(`Token '${tokenSymbol}' not found in chain with ID '${chainId}'.`);
            return undefined;
        }

        return token;
    }
}
