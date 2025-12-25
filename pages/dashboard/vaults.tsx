import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faArrowUp, faArrowDown, faInfo } from '@fortawesome/free-solid-svg-icons'

const vaults = [
  {
    id: 1,
    name: 'USDU Core Vault',
    symbol: 'USDU-CORE',
    apy: '4.2%',
    tvl: '$8.7M',
    userBalance: '0',
    description: 'Core USDU staking vault with protocol rewards',
  },
  {
    id: 2,
    name: 'USDU-ETH LP',
    symbol: 'USDU-ETH',
    apy: '12.5%',
    tvl: '$2.8M',
    userBalance: '0',
    description: 'Liquidity provision for USDU/ETH trading pair',
  },
  {
    id: 3,
    name: 'USDU Savings',
    symbol: 'sUSDU',
    apy: '3.8%',
    tvl: '$1.2M',
    userBalance: '0',
    description: 'Low-risk savings vault for USDU holders',
  },
]

export default function VaultsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Vaults</h1>
        <p className="text-text-secondary">
          Discover yield opportunities and manage your USDU positions
        </p>
      </div>

      {/* Vault Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vaults.map((vault) => (
          <div
            key={vault.id}
            className="bg-dark-card p-6 rounded-xl border border-dark-surface hover:border-accent-orange/30 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faCoins} className="w-6 h-6 text-accent-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{vault.name}</h3>
                  <p className="text-sm text-text-muted">{vault.symbol}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-dark-surface rounded-lg transition-colors">
                <FontAwesomeIcon icon={faInfo} className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-6">{vault.description}</p>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-text-muted">APY</span>
                <span className="text-green-400 font-semibold">{vault.apy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">TVL</span>
                <span className="text-white">{vault.tvl}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Your Balance</span>
                <span className="text-white">{vault.userBalance} {vault.symbol}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-accent-orange text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium">
                <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3" />
                Deposit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-dark-surface text-text-primary border border-dark-surface hover:border-accent-orange/30 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                <FontAwesomeIcon icon={faArrowDown} className="w-3 h-3" />
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-dark-card p-8 rounded-xl border border-dark-surface text-center">
        <h3 className="text-xl font-semibold text-white mb-4">More Vaults Coming Soon</h3>
        <p className="text-text-secondary">
          We're working on additional yield strategies and vault options. Stay tuned for updates!
        </p>
      </div>
    </div>
  )
}