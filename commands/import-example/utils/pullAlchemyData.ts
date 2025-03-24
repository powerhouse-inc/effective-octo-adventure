
export const pullAlchemyData = async (addresses: string[], apiKey: string) => {
    console.log("Pulling alchemy data for", addresses);
    const url = 'https://eth-mainnet.g.alchemy.com/v2/' + apiKey;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const body = (address: string) => JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
            {
                fromBlock: "0x0",
                toBlock: "latest",
                toAddress: address,
                withMetadata: false,
                excludeZeroValue: true,
                maxCount: "0x3e8",
                category: [
                    "external"
                ]
            }
        ]
    });

   return Promise.all(addresses.map(a => 
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: body(a)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
   ));
}
