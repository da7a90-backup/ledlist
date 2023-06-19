
    const fetchData = async ()=>{
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/fetchData');

        const body = await result.json();

        const alteredData = body.data.map((object)=>{
            console.log(object)
            return {...object, cost: object.cost.discountedPrice, 
                    shipping: {
                        shippingUsa: object.cost.shippingUsa, shippingIntl: object.cost.shippingIntl
                    },
                    value: {discountedPerLed: object.cost.discountedPerLed, discountedPerOutput: object.cost.discountedPerOutput},
                    info: {...object.info, warehouse: object.info.warehouse !== "" && object.info.warehouse !== undefined ? object.info.warehouse.split("\n") : []}
                }
        })
        console.log(alteredData)

        return alteredData;

        }
    const insertProduct = async (product) => {
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/insertRecord', {
            method: 'POST',
            body: JSON.stringify(product)
        })

        const body = await result.json();
        const status = result.status

        return {body, status};
    }
    const updateRecord = async (product, _id) => {
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/updateRecord?recordId='+_id, {
            method: 'POST',
            body: JSON.stringify(product)
        })

        const body = await result.json();
        const status = result.status

        return {body, status};
    }

    const deleteRecord = async (_id) => {
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/deleteRecord?recordId='+_id, {
            method: 'POST'
        })

        const body = await result.json();
        const status = result.status

        return {body, status};
    }
    



        export {fetchData, insertProduct, updateRecord, deleteRecord}