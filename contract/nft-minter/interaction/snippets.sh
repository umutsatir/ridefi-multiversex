ALICE="~/Desktop/local-projects/blockchain/ridefi-multiversex/wallet/wallet-owner.pem" # PEM path
ADDRESS=$(mxpy data load --key=address-testnet)
DEPLOY_TRANSACTION=$(mxpy data load --key=deployTransaction-testnet)
PROXY=https://testnet-gateway.multiversx.com
CHAIN_ID=T
BYTECODE="~/Desktop/local-projects/blockchain/ridefi-multiversex/nft-minter/output/nft-minter.wasm"

deploy() {
    mxpy --verbose contract deploy --bytecode=/Users/umutsatir/Desktop/local-projects/blockchain/ridefi-multiversex/contract/nft-minter/output/nft-minter.wasm \
    --recall-nonce --pem=/Users/umutsatir/Desktop/local-projects/blockchain/ridefi-multiversex/wallet/wallet-owner.pem \
    --gas-limit=10000000 \
    --send --outfile="deploy-testnet.interaction.json" --wait-result \
    --proxy=https://testnet-gateway.multiversx.com --chain=T

    TRANSACTION=$(mxpy data parse --file="deploy-testnet.interaction.json" --expression="data['emittedTransactionHash']")
    ADDRESS=$(mxpy data parse --file="deploy-testnet.interaction.json" --expression="data['contractAddress']")

    mxpy data store --key=address-testnet --value=${ADDRESS}
    mxpy data store --key=deployTransaction-testnet --value=${TRANSACTION}

    echo ""
    echo "Smart contract address: ${ADDRESS}"
}

issueNft() {
    local TOKEN_DISPLAY_NAME=0x4d79546573744e667464  # "MyTestNft"
    local TOKEN_TICKER=0x544553544e4654  # "TESTNFT"

    mxpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${ALICE} \
    --gas-limit=100000000 --value=50000000000000000 --function="issueToken" \
    --arguments ${TOKEN_DISPLAY_NAME} ${TOKEN_TICKER} \
    --send --proxy=${PROXY} --chain=${CHAIN_ID}
}

setLocalRoles() {
    mxpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${ALICE} \
    --gas-limit=100000000 --function="setLocalRoles" \
    --send --proxy=${PROXY} --chain=${CHAIN_ID}
}

createNft() {
    local TOKEN_NAME=0x4e616d65 # "Name"
    local ROYALTIES=1000 # 10%
    local URI=0x72616e647572692e636f6d # randuri.com
    local SELLING_PRICE=0

    mxpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${ALICE} \
    --gas-limit=50000000 --function="createNft" \
    --arguments ${TOKEN_NAME} ${ROYALTIES} ${URI} ${SELLING_PRICE} \
    --send --proxy=${PROXY} --chain=${CHAIN_ID}
}

buyNft() {
    local NFT_NONCE=1

    mxpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${ALICE} \
    --gas-limit=10000000 --function="buyNft" \
    --arguments ${NFT_NONCE} \
    --send --proxy=${PROXY} --chain=${CHAIN_ID}
}
