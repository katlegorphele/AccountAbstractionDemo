'use client';

import React, { useState, useEffect } from 'react';
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "../client";
import { defineChain, prepareContractCall, sendTransaction, getContract, readContract } from 'thirdweb';

const contract = getContract({
    client: client,
    address: "0x07Ae34602Ea55dC4540307454904118d001bE390",
    chain: defineChain(44787),
});


const ActionButtons = () => {
    const account = useActiveAccount();
    const [count, setCount] = useState(0);

    const { data: balance, isLoading } = useWalletBalance({
        client: client,
        chain: defineChain(44787),
        address: account?.address,
    });



    const fetchCount = async () => {
        try {
            const result = await readContract({
                contract,
                method: "function count() view returns (uint256)",
            });
            setCount(Number(result));
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    useEffect(() => {
        fetchCount();
    }, []);


    const increment = async () => {
        try {
            if (!account) {
                console.error('No active account');
                return;
            }

            const transaction = await prepareContractCall({
                contract,
                method: "function increment()",
                params: [],
            });
            const { transactionHash } = await sendTransaction({
                transaction,
                account,
            });
            await fetchCount();
            alert('Sponsored transaction sent.');
            console.log('Transaction sent:', transactionHash);
        } catch (error) {
            console.error('Error executing increment transaction:', error);
        }
    };

    const decrease = async () => {
        try {
            if (!account) {
                console.error('No active account');
                return;
            }

            const transaction = await prepareContractCall({
                contract,
                method: "function decrement()",
            });
            const { transactionHash } = await sendTransaction({
                transaction,
                account,
            });

            await fetchCount();
            alert('Sponsored transaction sent.');
            console.log('Transaction sent:', transactionHash);
        } catch (error) {
            console.error('Error executing decrease transaction:', error);
        }
    }

    if (!account) {
        return <p className="text-center p-4">Please connect your wallet.</p>;
    }

    return (
        <div className="flex flex-col gap-4 p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-gray-50 max-w-md mx-auto">
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
                <button
                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={increment}
                >
                    Increment
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={decrease}
                >
                    Decrement
                </button>
            </div>
            <div className="text-center text-2xl font-bold text-black ">
                Current Count: {count}
            </div>

            {/* Wallet Info */}
            <div className="mt-4 text-center text-black">
                <p className="text-sm break-all">Wallet address: {account.address}</p>
                <p className="text-sm">
                    {isLoading ? (
                        "Loading balance..."
                    ) : (
                        <>
                            Wallet balance: {balance?.displayValue} {balance?.symbol}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ActionButtons;