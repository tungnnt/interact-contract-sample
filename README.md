```git clone https://github.com/tungnnt/interact-contract-sample```

```npm install``` hoặc ```yarn```

Bật Ganache

```truffle compile```

```truffle migrate```

Sau khi deploy contract, thì lấy ``abi`` trong ```build/contract/Token.json```, dùng ```helpers/loadABI.js``` để lấy ```abi``` nhanh hơn, sau đó dán ```abi``` vào trong ```constants/TokenABI.json```

Xem cách tương tác với contract của Hải bằng cách sử dụng các hàm trong ```helpers/contract.js```

