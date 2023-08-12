# OneOPIdentity
desc
## Run OpSTACK
Follow these instructions: [https://stack.optimism.io/docs/build/getting-started/#]
Instead of op-geth directory use OneOPIndetity-op-geth directory.
## Run Hyperlane Validators and Relayer

### Copy files
```bash
cp relayer.env.example /hyperlane-monorepo/rust/relayer.env
cp validator.env.example /hyperlane-monorepo/rust/validator.env
cp validatoropgoerli.env.example /hyperlane-monorepo/rust/validatoropgoerli.env
cp agent_config.js /hyperlane-monorepo/rust/agent_config.json

```
### Compile and Run

- install `rustup`
      - [link here](https://rustup.rs/)
Note: You should be running >= version `1.71.1` of the rustc compiler, you can see that version with this command and
should see similar output:

```
$ rustup --version
rustup 1.26.0 (5af9b9484 2023-04-05)
info: This is the version for the rustup toolchain manager, not the rustc compiler.
info: The currently active `rustc` version is `rustc 1.71.1 (eb26296b5 2023-08-03)`
```

Build the validator and then run the binary directly:

```bash
cargo build --release --bin validator
```

```bash
env $(cat validator.env | grep -v "#" | xargs) ./target/release/validator --checkpointSyncer.type localStorage --checkpointSyncer.path='/tmp/hyperlane-validator-signatures-ethereum' --originChainName anvil1 --chains.anvil1.connection.url http://127.0.0.1:8545/ --validator.key PRIVATE_KEY --chains.anvil1.signer.key PRIVATE_KEY
```

```bash
env $(cat validator.env | grep -v "#" | xargs) ./target/release/validator --checkpointSyncer.type localStorage --checkpointSyncer.path='/tmp/a-hyperlane-validator-signatures-ethereum' --originChainName optimismgoerli --chains.optimismgoerli.connection.url ALCHEMY_OPGOERLI_URL --validator.key PRIVATE_KEY --chains.optimismgoerli.signer.key PRIVATE_KEY --metrics 9091
```

Build the relayer and then run the binary directly:

```bash
cargo build --release --bin relayer
```

```bash
env $(cat relayer.env | grep -v "#" | xargs) ./target/release/relayer --relayChains anvil1,optimismgoerli --chains.anvil1.connection.url http://127.0.0.1:8545/ --defaultSigner.key PRIVATE_KEY --allowLocalCheckpointSyncers true --metrics 9092
```