# MAM Reattacher

A tool to reattach the IOTA MAM bundle.

## Getting Started

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/)
2. Install the dependencies
```
npm install
```

### Usage and Examples

#### Issuer

```
$ node Issuer.js
```

#### Receiver

```
$ node Receiver.js [MAM Root]
```
example : 
```
$ node Receiver.js MYOMCSAXMQVRCOCLDAKVKLGYCHLIFDMFBSNIGXCXCLN9KDWZPAHZSYERTUNVWOACBQAHB9ZWJQXLYOECG
```

#### Reattacher

```
$ node Reattacher.js [MAM Root]
```
example : 
```
$ node Reattacher.js MYOMCSAXMQVRCOCLDAKVKLGYCHLIFDMFBSNIGXCXCLN9KDWZPAHZSYERTUNVWOACBQAHB9ZWJQXLYOECG
```

### Coding style 
MAMReattacher defers to [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript),
also contains an ESLint configuration which you can use to validate your JavaScript code style.

#### Lint JavaScript with ESLint.
```
npm run lint
```