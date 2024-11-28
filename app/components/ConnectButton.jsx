import React from 'react'
import { client } from '../client'
import { ConnectButton } from 'thirdweb/react'
import { defineChain } from 'thirdweb'

const MyConnectButton = () => {
  return (
    <div className='m-1'>
    <ConnectButton client={client}
    accountAbstraction={{
        chain: defineChain(44787), // the chain where your smart accounts will be or is deployed
        sponsorGas: true, // enable or disable sponsored transactions
      }} 
      connectModal={{
        showThirdwebBranding: false,
      }}/>
    </div>
  )
}

export default MyConnectButton